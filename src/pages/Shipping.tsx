import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Shipping = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
              Service Delivery Policy
            </span>
          </h1>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Service Nature</h2>
              <p className="text-muted-foreground">
                CloudByte Cloud provides digital cloud hosting and web hosting services. Unlike physical 
                products, our services are delivered electronically and do not require physical shipping.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Instant Activation</h2>
              <p className="text-muted-foreground">
                Upon successful payment verification, your hosting service will be activated instantly:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Account credentials sent via email within minutes</li>
                <li>Immediate access to your hosting dashboard</li>
                <li>Server resources allocated automatically</li>
                <li>No waiting period for service activation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Service Delivery Timeline</h2>
              <p className="text-muted-foreground">
                Our standard service delivery timeline:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Standard plans: Instant activation (0-5 minutes)</li>
                <li>Custom configurations: 1-24 hours</li>
                <li>Domain setup: 24-48 hours for DNS propagation</li>
                <li>Migration services: 3-7 business days depending on data size</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Access Credentials</h2>
              <p className="text-muted-foreground">
                After payment confirmation, you will receive:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Welcome email with login credentials</li>
                <li>Dashboard access instructions</li>
                <li>Server details and configuration information</li>
                <li>Support resources and documentation links</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Service Availability</h2>
              <p className="text-muted-foreground">
                Our hosting services are available 24/7 with a 99.9% uptime guarantee. Once activated, 
                you can access your hosting environment at any time through our secure dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Delays and Issues</h2>
              <p className="text-muted-foreground">
                In rare cases of activation delays:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>We will notify you via email</li>
                <li>Our support team will provide regular updates</li>
                <li>Expected resolution time will be communicated</li>
                <li>Compensation may be offered for significant delays</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Geographic Availability</h2>
              <p className="text-muted-foreground">
                Our services are available globally. Server locations may vary based on your selected 
                plan and configuration requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Support During Setup</h2>
              <p className="text-muted-foreground">
                Our support team is available to assist you during the setup process:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Email support: support@cloudbyte.cloud</li>
                <li>Response time: Within 24 hours for standard queries</li>
                <li>Priority support available for Pro and Ultra plans</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about service delivery, please contact us at: support@cloudbyte.cloud
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

export default Shipping;
