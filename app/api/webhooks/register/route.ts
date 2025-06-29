import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import {
  createUser,
  deleteUser,
  updateUser,
} from '@/action/clerk-user-action';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env',
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  const {
    id,
  } = evt.data;
  const eventType = evt.type;

  console.log({
    id,
    eventType,
  });

  // Type guard to ensure we're working with user data
  if (eventType === 'user.deleted') {
    await deleteUser(id as string);
    return new Response('OK', { status: 200 });
  }

  if (eventType !== 'user.created' && eventType !== 'user.updated') {
    return new Response('OK', { status: 200 });
  }

  // Now we know it's a user event, so we can safely access user properties
  const userData = evt.data as { 
    first_name?: string; 
    last_name?: string; 
    primary_email_address_id?: string; 
    email_addresses?: Array<{ email_address: string }> 
  };
  const {
    first_name,
    last_name,
    primary_email_address_id,
    email_addresses,
  } = userData;

  console.log('first_name', first_name);
  const email = email_addresses?.[0]?.email_address || '';
  const firstName = first_name || '';
  const lastName = last_name || '';
  const primeId = primary_email_address_id ?? 'unknown';
  const fullName = `${firstName} ${lastName}`.trim();

  const userPayload = {
    email,
    fullName,
    primeId,
    userId: id,
  };

  console.log(userPayload);

  try {
    if (eventType === 'user.created') {
      await createUser(userPayload);
    }

    if (eventType === 'user.updated') {
      const response = await updateUser({ email, fullName, primeId });
      if (response.status !== 200) {
        throw new Error(response.message);
      }
    }
  } catch (error) {
    console.error('Error: Could not process webhook:', error);
    return new Response('Error: Processing error', {
      status: 500,
    });
  }

  return new Response('OK', { status: 200 });
}
