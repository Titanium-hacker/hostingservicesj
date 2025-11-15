import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Calendar, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface Purchase {
  id: string;
  plan_name: string;
  price_paid: number;
  purchased_at: string;
  expires_at: string;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Fetch user's active purchase
      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .order("purchased_at", { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setPurchase(data);
        
        // Calculate days left
        const expiresAt = new Date(data.expires_at);
        const now = new Date();
        const diff = expiresAt.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        setDaysLeft(days);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground">Manage your hosting and services</p>
          </div>

          {purchase ? (
            <div className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{purchase.plan_name}</h2>
                    <p className="text-muted-foreground">Active Plan</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">₹{purchase.price_paid}</div>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>{daysLeft} days remaining in current billing cycle</span>
                </div>

                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-neon-purple transition-all"
                    style={{ width: `${(daysLeft / 30) * 100}%` }}
                  />
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                
                <Button
                  onClick={() => navigate("/terminal")}
                  className="w-full justify-start gap-3 h-auto py-4"
                  variant="outline"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Open Terminal</div>
                    <div className="text-sm text-muted-foreground">Access your development environment</div>
                  </div>
                </Button>
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border/50">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Active Plan</h2>
              <p className="text-muted-foreground mb-6">Choose a hosting plan to get started</p>
              <Button onClick={() => navigate("/pricing")}>
                View Plans
              </Button>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
