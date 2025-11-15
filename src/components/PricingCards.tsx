import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Plan {
  id: string;
  name: string;
  price_inr: number;
  features: string[];
}

const PricingCards = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from("hosting_plans")
        .select("*")
        .order("price_inr", { ascending: true });

      if (data && !error) {
        setPlans(data as Plan[]);
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = async (plan: Plan) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth", { state: { selectedPlan: plan } });
    } else {
      navigate("/checkout", { state: { plan } });
    }
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] relative overflow-hidden ${
                index === 1 ? "md:scale-105 border-primary/50" : ""
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-neon-purple" />
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary">₹{plan.price_inr}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                  onClick={() => handleSelectPlan(plan)}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
