import { Button } from "@/components/ui/button"
import { HeroButton } from "@/components/ui/hero-button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Zap, Palette, BarChart3, Star, ArrowRight, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"

export const Hero = () => {
  const { user } = useAuth()
  const handleGetStarted = () => {
    // Smooth scroll to QR generator section
    const qrSection = document.getElementById('qr-generator')
    if (qrSection) {
      qrSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      toast.info("Start generating QR codes below!")
    }
  }

  const handleLearnMore = () => {
    toast.info("Premium features coming soon!")
  }

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm animate-fade-in">
            <Star className="h-3 w-3 mr-1 text-primary" />
            #1 Professional QR Generator
          </Badge>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Create Stunning{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              QR Codes
            </span>
            <br />
            in Seconds
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Generate professional QR codes with custom styles, track analytics, and manage everything from one powerful dashboard. Perfect for businesses and creators.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-slide-up">
            <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Instant Generation</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
              <Palette className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Custom Styling</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Analytics Tracking</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <HeroButton 
              size="xl" 
              onClick={handleGetStarted}
              className="group"
            >
              <QrCode className="h-5 w-5" />
              Start Creating QR Codes
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </HeroButton>
            
            <HeroButton 
              variant="hero-outline" 
              size="xl"
              className="group"
              onClick={() => {
                const featuresSection = document.getElementById('features')
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: 'smooth' })
                } else {
                  window.location.href = '/#features'
                }
              }}
            >
              <Sparkles className="h-4 w-4 mr-2 group-hover:text-primary" />
              {user ? "Explore All Features" : "View Premium Features"}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </HeroButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">500K+</div>
              <div className="text-sm text-muted-foreground">QR Codes Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}