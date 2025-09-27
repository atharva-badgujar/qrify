import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/ui/hero-button";
import { Check, Star, Zap, Crown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PaymentButton } from "@/components/PaymentButton";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const navigate = useNavigate()

  const handleSelectPlan = (planName: string) => {
    if (planName === "Free") {
      navigate("/auth?mode=signup")
    } else {
      toast.info(`${planName} plan selected! Payment integration coming soon with Razorpay/PayPal.`)
    }
  }

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started with QR codes",
      features: [
        "5 static QR codes per month",
        "Basic customization (colors, size)",
        "PNG downloads",
        "Email support",
        "Standard QR types (URL, text, email, phone)"
      ],
      limitations: [
        "No analytics",
        "No dynamic QR codes",
        "QRify Pro branding"
      ],
      buttonText: "Get Started Free",
      popular: false,
      icon: Star
    },
    {
      name: "Pro",
      price: { monthly: 9.99, yearly: 99.99 },
      description: "For professionals and small businesses",
      features: [
        "Unlimited static QR codes",
        "50 dynamic QR codes per month",
        "Advanced customization (logos, gradients)",
        "Basic analytics (scan count, dates)",
        "SVG & PNG downloads",
        "Priority email support",
        "Custom branding removal",
        "Bulk QR generation (up to 100)"
      ],
      limitations: [
        "Limited analytics depth",
        "Basic design templates"
      ],
      buttonText: "Start Pro Trial",
      popular: true,
      savings: billingCycle === "yearly" ? "Save $20/year" : null,
      icon: Zap
    },
    {
      name: "Premium",
      price: { monthly: 29.99, yearly: 299.99 },
      description: "For agencies and enterprises",
      features: [
        "Everything in Pro",
        "Unlimited dynamic QR codes",
        "Advanced analytics (location, device, time)",
        "Custom domains for QR redirects",
        "API access (1000 requests/month)",
        "White-label solution",
        "Advanced design templates",
        "Bulk generation (unlimited)",
        "Team collaboration (up to 10 users)",
        "Phone & chat support"
      ],
      limitations: [],
      buttonText: "Start Premium Trial",
      popular: false,
      savings: billingCycle === "yearly" ? "Save $60/year" : null,
      icon: Crown
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            From individuals to enterprises, we have the right plan to power your QR code needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={billingCycle === "monthly" ? "text-foreground font-medium" : "text-muted-foreground"}>
              Monthly
            </span>
            <Button
              variant="outline"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative h-6 w-11 rounded-full p-0"
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-primary transition-transform ${
                  billingCycle === "yearly" ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </Button>
            <span className={billingCycle === "yearly" ? "text-foreground font-medium" : "text-muted-foreground"}>
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <Badge variant="secondary" className="ml-2">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = plan.price[billingCycle]
            
            return (
              <Card
                key={plan.name}
                className={`relative transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "border-primary shadow-elegant ring-2 ring-primary/20"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={`p-2 rounded-lg ${plan.popular ? "bg-gradient-primary" : "bg-muted"}`}>
                      <Icon className={`h-5 w-5 ${plan.popular ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-bold">
                        ${price}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                    {plan.savings && (
                      <Badge variant="outline" className="text-xs">
                        {plan.savings}
                      </Badge>
                    )}
                  </div>
                  
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                      <div className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  {plan.name === "Free" ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSelectPlan(plan.name)}
                    >
                      {plan.buttonText}
                    </Button>
                  ) : plan.popular ? (
                    <PaymentButton
                      planName="pro"
                      amount={billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                      currency="INR"
                      buttonText={plan.buttonText}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    />
                  ) : (
                    <PaymentButton
                      planName="premium"
                      amount={billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                      currency="INR"
                      buttonText={plan.buttonText}
                      className="w-full"
                    />
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major payment methods through Razorpay and PayPal, including credit cards, 
                  debit cards, UPI, net banking, and digital wallets.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change my plan anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate the billing accordingly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens to my QR codes if I downgrade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your existing QR codes will continue to work. However, you may lose access to premium 
                  features like analytics and dynamic QR capabilities based on your new plan limits.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, 
                  contact our support team for a full refund.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing