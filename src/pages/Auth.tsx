import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Cloud } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState(""); // <-- message shown after signup

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setInfoMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            // Make sure this matches your redirect settings in Supabase
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) throw error;

        // Don't navigate to dashboard yet — user must confirm their email.
        const userEmail = data?.user?.email || email;
        const msg = `A confirmation email has been sent to ${userEmail}. Please check your inbox and click the confirmation link to activate your account and then login.`;
        setInfoMessage(msg);
        toast.success("Account created — check your email to confirm.");
        // Optionally clear sensitive fields
        setPassword("");
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <Card className="w-full max-w-md p-8 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Cloud className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">
              {isLogin ? "Welcome Back" : "Get Started"}
            </h1>
            <p className="text-muted-foreground text-center">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </p>
          </div>

          {/* Inline info message after signup */}
          {infoMessage && (
            <div className="mb-4 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
              {infoMessage}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required={!isLogin}
                  className="bg-background"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-background"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-background"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setInfoMessage(""); // clear message when toggling mode
              }}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;