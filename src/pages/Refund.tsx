import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Refund = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
              Refund & Return Policy
            </span>
          </h1>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Refund Eligibility</h2>
              <p className="text-muted-foreground">
                CloudByte Cloud offers a 7-day money-back guarantee for new customers. If you are not 
                satisfied with our service within the first 7 days of your initial purchase, you may 
                request a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Non-Refundable Items</h2>
              <p className="text-muted-foreground">
                The following are not eligible for refunds:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Renewal payments (after the initial 7-day period)</li>
                <li>Setup fees for custom configurations</li>
                <li>Domain name registrations</li>
                <li>Services used for more than 7 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Refund Process</h2>
              <p className="text-muted-foreground">
                To request a refund, please contact our support team at support@cloudbyte.cloud with 
                your account details and reason for the refund request. Refunds will be processed within 
                7-10 business days to the original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Service Cancellation</h2>
              <p className="text-muted-foreground">
                You may cancel your service at any time. However, cancellations made after the 7-day 
                money-back guarantee period will not receive a refund for the current billing cycle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Abuse Prevention</h2>
              <p className="text-muted-foreground">
                We reserve the right to refuse refunds in cases of suspected abuse, violation of our 
                terms of service, or if excessive bandwidth or storage has been used.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Partial Refunds</h2>
              <p className="text-muted-foreground">
                Partial refunds may be issued at our discretion for specific circumstances, such as 
                extended service downtime not covered by our SLA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
              <p className="text-muted-foreground">
                For refund requests or questions about this policy, please contact us at: 
                support@cloudbyte.cloud
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

export default Refund;
