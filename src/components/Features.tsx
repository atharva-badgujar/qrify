import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  QrCode, 
  Palette, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Download, 
  Users,
  Crown,
  Star,
  Mail
} from "lucide-react"

const features = [
  {
    icon: QrCode,
    title: "Multiple QR Types",
    description: "URL, Email, Phone, SMS, WiFi, and custom text QR codes with instant generation.",
    badge: "Free"
  },
  {
    icon: Palette,
    title: "Custom Styling",
    description: "Personalize colors, add logos, change shapes, and apply gradients to match your brand.",
    badge: "Free"
  },
  {
    icon: Mail,
    title: "Professional Email QRs",
    description: "Easy email builder with separate fields for subject, recipient, and message body formatting.",
    badge: "Premium",
    premium: true
  },
  {
    icon: Users,
    title: "WhatsApp Integration",
    description: "Generate WhatsApp QR codes with pre-filled messages and contact numbers.",
    badge: "Premium",
    premium: true
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track scans, monitor performance, and get insights with detailed analytics.",
    badge: "Premium",
    premium: true
  },
  {
    icon: Shield,
    title: "Dynamic QR Codes",
    description: "Update QR content anytime without reprinting. Perfect for campaigns and events.",
    badge: "Premium",
    premium: true
  },
  {
    icon: Zap,
    title: "Bulk Generation",
    description: "Generate hundreds of QR codes at once with CSV import and export functionality.",
    badge: "Premium",
    premium: true
  },
  {
    icon: Globe,
    title: "API Access",
    description: "Integrate QR generation into your apps with our powerful REST API.",
    badge: "Premium",
    premium: true
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Download in PNG, SVG, PDF, and EPS formats for any use case.",
    badge: "Free"
  }
]

export const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Star className="h-3 w-3 mr-1 text-primary" />
            Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Professional QR Codes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From basic QR generation to advanced analytics and team collaboration, 
            QRify Pro has all the tools you need to create and manage QR codes like a pro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`glass-card relative group hover:shadow-glow transition-all duration-300 animate-fade-in ${
                feature.premium ? 'border-primary/20' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {feature.premium && (
                <div className="absolute -top-2 -right-2">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${
                    feature.premium 
                      ? 'bg-gradient-primary text-white' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <Badge 
                    variant={feature.premium ? "default" : "secondary"}
                    className={feature.premium ? "bg-gradient-primary" : ""}
                  >
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Create Professional QR Codes?
            </h3>
            <p className="text-muted-foreground mb-6">
              Start with our free tier and upgrade anytime to unlock premium features like analytics, dynamic QR codes, and API access.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}