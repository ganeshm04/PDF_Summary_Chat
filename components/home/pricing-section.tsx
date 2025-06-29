import { PriceCard } from './price-card';

export interface Plan {
  id: 'basic' | 'pro';
  name: 'Basic' | 'Pro';
  price: number;
  priceId: string;
  features: string[];
  unavailable: string[];
  paymentLink: string;
}
const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    priceId:
      process.env.NODE_ENV === 'production'
        ? 'price_live_basic'
        : 'price_test_basic',
    paymentLink:
      process.env.NODE_ENV === 'production'
        ? 'https://buy.stripe.com/live_basic'
        : 'https://buy.stripe.com/test_basic',
    features: [
      'Upload up to 10 PDFs per month',
      'Basic AI Summary',
      'Email Support',
    ],
    unavailable: [
      'Priority Processing',
      'Advanced AI Insights',
      'Team Collaboration',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 0, // Temporarily free
    priceId:
      process.env.NODE_ENV === 'production'
        ? 'price_live_pro'
        : 'price_test_pro',
    paymentLink:
      process.env.NODE_ENV === 'production'
        ? 'https://buy.stripe.com/live_pro'
        : 'https://buy.stripe.com/test_pro',
    features: [
      'Unlimited PDF Uploads',
      'Advanced AI Summary & Insights',
      'Priority Processing',
      'Team Collaboration',
      'Premium Support',
    ],
    unavailable: [],
  },
];

export const PricingSection = () => {
  return (
    <section className="py-16 px-6 bg-white text-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-rose-600 font-semibold uppercase">
          Pricing
        </h2>
        <h2 className="font-bold text-4xl mt-4">
          All features available for free! 🎉
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          SumChat helps you summarize PDFs quickly and efficiently with
          AI-powered insights. Currently, all features are available at no cost.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
        {plans.map((plan: Plan) => (
          <PriceCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
};
