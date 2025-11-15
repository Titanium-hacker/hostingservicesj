import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const plan = location.state?.plan;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      if (!plan) {
        navigate("/pricing");
      }
    };

    checkAuth();
  }, [navigate, plan]);

  const handleCheckout = async () => {
    setProcessing(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Not authenticated");
      }

      // Calculate expiry date (30 days from now)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      // Create purchase record
      const { error } = await supabase.from("purchases").insert({
        user_id: session.user.id,
        plan_id: plan.id,
        plan_name: plan.name,
        price_paid: plan.price_inr,
        expires_at: expiresAt.toISOString(),
        status: "active",
      });

      if (error) throw error;

      toast.success("Plan activated successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  if (!plan) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
                Checkout
              </span>
            </h1>
            <p className="text-muted-foreground">Complete your purchase</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <ul className="space-y-2">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{plan.price_inr}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>Billing Cycle</span>
                    <span>Monthly (30 days)</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t border-border/50">
                    <span>Total</span>
                    <span className="text-primary">₹{plan.price_inr}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 h-fit">
              <h2 className="text-2xl font-bold mb-6">Payment</h2>
              
              <div className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    This is a demo checkout. Click below to activate your plan immediately.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Note: Payment gateway integration will be added in production.
                  </p>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={processing}
                  className="w-full"
                  size="lg"
                >
                  {processing ? "Processing..." : "Complete Purchase"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing this purchase, you agree to our{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
