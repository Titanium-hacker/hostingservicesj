import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Terminal as TerminalIcon, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Terminal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const commands = [
    "ssh user@server.cloudbyte.cloud",
    "cd /var/www/your-project",
    "git pull origin main",
    "npm install",
    "npm run build",
    "pm2 restart all",
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <TerminalIcon className="w-10 h-10 text-primary" />
              <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
                Terminal Access
              </span>
            </h1>
            <p className="text-muted-foreground">Access your hosting environment</p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 mb-6">
            <div className="space-y-6">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h3 className="font-semibold text-destructive mb-2">⚠️ Developer Access Required</h3>
                <p className="text-sm text-muted-foreground">
                  Terminal access requires developer credentials. Please contact your system administrator or development team to obtain access.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Common Commands</h3>
                <div className="bg-background/50 rounded-lg p-6 font-mono text-sm space-y-3">
                  {commands.map((cmd, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-primary">$</span>
                        <span className="text-foreground/80">{cmd}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(cmd)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold">Setup Instructions</h4>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Contact your developer or system administrator for SSH credentials</li>
                  <li>Use the provided SSH key to connect to your server</li>
                  <li>Navigate to your project directory</li>
                  <li>Execute deployment or management commands as needed</li>
                  <li>For assistance, contact support at support@cloudbyte.cloud</li>
                </ol>
              </div>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terminal;
