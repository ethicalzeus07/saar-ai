import { ArrowRight } from "lucide-react";

// Define the plan structure
type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  buttonColor: string;
  border: string;
  popular?: boolean;
};

// Plans data
const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for occasional use",
    price: 9,
    features: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    buttonColor: "from-primary to-yellow-400",
    border: "border border-gray-200",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and teams",
    price: 19,
    features: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    buttonColor: "from-primary to-yellow-400",
    border: "border-2 border-primary",
    popular: true,
  },
];

// PricingCard component - clean and reusable with simple hover transition
function PricingCard({ name, description, price, features, buttonColor, border, popular }: Plan) {
  return (
    <div className={`
      flex-1 bg-white rounded-3xl shadow-xl ${border} flex flex-col p-8 relative
      hover:scale-105 hover:shadow-2xl transition-all duration-200
    `}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-primary to-yellow-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="mb-2 text-xl font-bold">{name}</div>
      <div className="mb-6 text-gray-500">{description}</div>
      
      <div className="mb-6 flex items-end">
        <span className="text-4xl font-extrabold text-gray-900">${price}</span>
        <span className="ml-1 text-xs text-gray-500 font-bold uppercase">USD</span>
        <span className="ml-1 text-base text-gray-500">/month</span>
      </div>
      
      <ul className="mb-8 flex-1 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <span className="mr-2 text-primary">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      
      <button
        className={`
          mt-auto w-full rounded-full py-3 font-bold text-white flex items-center justify-center
          bg-gradient-to-r ${buttonColor} shadow-md 
          hover:scale-105 transition-all duration-200
        `}
      >
        Buy Now <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </div>
  );
}

// Main component - clean and focused
export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h3 className="text-lg font-bold text-primary mb-2 tracking-wider uppercase text-center">
          Pricing
        </h3>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12">
          Choose the perfect plan for your needs
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-4xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}