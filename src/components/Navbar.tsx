import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cloud, Terminal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

const Navbar = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Cloud className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-xl bg-primary/20 -z-10 group-hover:bg-primary/40 transition-colors" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
              Quillcloud
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="text-foreground/80 hover:text-primary transition-colors">
              Pricing
            </Link>
            {session && (
              <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
                <Button onClick={() => navigate("/dashboard")} className="gap-2">
                  <Terminal className="w-4 h-4" />
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate("/auth")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/auth")} className="gap-2">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
