import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HeroButton } from "@/components/ui/hero-button"
import { QrCode, Menu, X, User, LogIn } from "lucide-react"
import { toast } from "sonner"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleAuthClick = () => {
    toast.info("Authentication feature coming soon!")
  }

  return (
    <header className="border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-xl shadow-elegant">
              <QrCode className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                QRify Pro
              </h1>
              <p className="text-xs text-muted-foreground">Professional QR Generator</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleAuthClick}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
            <HeroButton 
              size="sm"
              onClick={handleAuthClick}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Sign Up Free
            </HeroButton>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50">
            <nav className="flex flex-col gap-3 mt-4">
              <a href="#features" className="text-sm hover:text-primary transition-colors py-2">
                Features
              </a>
              <a href="#pricing" className="text-sm hover:text-primary transition-colors py-2">
                Pricing
              </a>
              <a href="#about" className="text-sm hover:text-primary transition-colors py-2">
                About
              </a>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={handleAuthClick}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <HeroButton 
                  className="justify-start"
                  onClick={handleAuthClick}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign Up Free
                </HeroButton>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}