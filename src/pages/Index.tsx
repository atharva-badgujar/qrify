import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero" 
import { QRGenerator } from "@/components/QRGenerator"
import { Features } from "@/components/Features"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* QR Generator Section */}
        <section id="qr-generator" className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Create Your QR Code
              </h2>
              <p className="text-lg text-muted-foreground">
                Generate professional QR codes instantly with custom styling options
              </p>
            </div>
            <QRGenerator />
          </div>
        </section>

        <Features />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-lg font-bold">QRify Pro</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Professional QR code generation made simple and beautiful.
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 QRify Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
