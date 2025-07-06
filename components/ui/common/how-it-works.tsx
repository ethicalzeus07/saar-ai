import { FileText, Bot, Shredder } from "lucide-react";
import { ReactNode } from "react";

// Define the step structure
type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

// Define your steps data
const steps: Step[] = [
  {
    icon: <FileText className="h-14 w-14 text-primary" />,
    label: 'Upload File',
    description: 'Simply drag and drop your File or click to upload'
  },
  {
    icon: <Bot className="h-14 w-14 text-primary" />,
    label: 'AI Analysis ✨',
    description: 'Our advanced AI processes and analyzes your document instantly'
  },
  {
    icon: <Shredder className="h-14 w-14 text-primary" />,
    label: 'Get Summary',
    description: 'Receive a clear, concise summary of your document'
  }
];

// StepItem component - similar to your image
function StepItem({ icon, label, description }: Step) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-2xl bg-gradient-to-br from-lime-100 via-yellow-100 to-primary/10 p-6 mb-4">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-1">{label}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 flex flex-col items-center">
        <h3 className="text-xl font-bold text-primary mb-2 tracking-wider uppercase">How it works</h3>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-12">
          Transform any File into easy-to-read summary reel in 3 simple steps
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-6xl mx-auto lg:items-start">
          {steps.map((step, index) => (
            <div key={index} className="flex-1">
              <StepItem {...step} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}