import { Check, CreditCard, Smartphone, Building, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  const features = [
    "Unlimited video generation",
    "4K Ultra HD quality",
    "5 seconds to 50 minutes duration",
    "AI voice synthesis (50+ voices)",
    "Background music generation",
    "All video categories",
    "Commercial usage rights",
    "Priority support"
  ];

  const paymentMethods = [
    { icon: CreditCard, label: "Credit Cards", color: "text-blue-500" },
    { icon: CreditCard, label: "Debit Cards", color: "text-red-500" },
    { icon: Building, label: "Net Banking", color: "text-gray-400" },
    { icon: Smartphone, label: "UPI", color: "text-purple-500" },
    { icon: Globe, label: "PayPal", color: "text-blue-400" },
    { icon: Smartphone, label: "Google Pay", color: "text-green-500" }
  ];

  return (
    <section id="pricing" className="py-24 bg-dark-secondary" data-testid="pricing-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-pricing-title">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="text-pricing-description">
            Unlimited video generation for one affordable price. No hidden fees, no per-video charges.
          </p>
        </div>
        
        {/* Main Pricing Card */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="glass-effect p-8 rounded-3xl btn-3d border-2 border-neon-blue relative overflow-hidden" data-testid="pricing-card">
            {/* Popular Badge */}
            <div className="absolute top-0 right-8 bg-gradient-to-r from-neon-green to-neon-blue px-4 py-2 rounded-b-lg text-sm font-bold">
              POPULAR
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4" data-testid="text-plan-name">Unlimited Plan</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold gradient-text" data-testid="text-price">₹149</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-300" data-testid="text-plan-description">
                Everything you need to create unlimited 4K videos
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3" data-testid={`feature-${index}`}>
                  <Check className="text-neon-green flex-shrink-0" size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <Button className="w-full btn-3d bg-gradient-to-r from-neon-blue to-neon-purple py-4 rounded-lg font-semibold text-lg animate-glow" data-testid="button-subscribe">
              Start Creating Videos
            </Button>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="text-center">
          <p className="text-gray-400 mb-6" data-testid="text-payment-methods">All payment methods accepted</p>
          <div className="flex justify-center items-center flex-wrap gap-8 text-3xl mb-4">
            {paymentMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="flex flex-col items-center space-y-2" data-testid={`payment-method-${index}`}>
                  <IconComponent className={method.color} />
                  <span className="text-xs text-gray-500">{method.label}</span>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-500" data-testid="text-payment-security">
            Secure payments • Cancel anytime • No hidden fees
          </p>
        </div>
      </div>
    </section>
  );
}
