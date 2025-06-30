import NavLink from './nav-link';
import { FileText } from 'lucide-react';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

export default function Header() {

    return (
        <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
            <div className="flex lg:flex-1">
                <NavLink href="/" className="flex item-center gap-1 lg:gap-2 shrink-0">
                    <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
                    <span className="font-extrabold lg:text-xl text-gray-900">SummChat</span>
                </NavLink>
            </div>
            <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
                <NavLink href="/#pricing">Pricing</NavLink>
                <SignedIn>

                    <NavLink href="/upload">
                        <Button>Upload a PDF</Button>
                    </NavLink>
                </SignedIn>

            </div>

            <div className="flex lg:justify-end lg:flex-1">
                <SignedIn>

                    <div className="flex gap-5 items-center">

                        <SignedIn>
                            <NavLink href="/dashboard" className='text-xl border-2 border-gray-500 p-2 rounded-full font-bold'>Your summaries</NavLink>
                            <UserButton />
                        </SignedIn>
                    </div>
                </SignedIn>


                <SignedOut>
                    <NavLink href="/sign-in">Sign In</NavLink>
                </SignedOut>
            </div>
        </nav>
    );
}