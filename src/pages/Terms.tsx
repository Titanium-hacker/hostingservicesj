import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
              Terms & Conditions
            </span>
          </h1>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing CloudByte Cloud services, you agree to be bound by these Terms and Conditions. 
                If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
              <p className="text-muted-foreground">
                CloudByte Cloud provides web hosting and cloud hosting services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>SSD-based web hosting</li>
                <li>Cloud infrastructure services</li>
                <li>Technical support</li>
                <li>Email support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Account Responsibilities</h2>
              <p className="text-muted-foreground">
                You are responsible for maintaining the security of your account credentials and for all 
                activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
              <p className="text-muted-foreground">
                All hosting plans are billed in Indian Rupees (INR) on a monthly basis. Payment is due at 
                the start of each billing cycle. Failure to pay may result in service suspension.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Service Level Agreement</h2>
              <p className="text-muted-foreground">
                We guarantee 99.9% uptime for our hosting services. In case of extended downtime, you may 
                be eligible for service credits as outlined in our SLA policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Acceptable Use</h2>
              <p className="text-muted-foreground">
                You agree not to use our services for any unlawful purposes or in violation of any 
                applicable laws or regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your account for violations of these terms 
                or for any other reason at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these terms, please contact us at: support@cloudbyte.cloud
              </p>
            </section>

            <p className="text-sm text-muted-foreground pt-6 border-t border-border/50">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
