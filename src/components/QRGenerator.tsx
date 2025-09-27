import { useState, useRef, useEffect } from "react"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { HeroButton } from "@/components/ui/hero-button"
import { Download, Palette, Link, Mail, Phone, MessageSquare, Share2 } from "lucide-react"
import { toast } from "sonner"

interface QRStyle {
  size: number
  foreground: string
  background: string
  margin: number
}

export const QRGenerator = () => {
  const [inputText, setInputText] = useState("https://qrify-pro.com")
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [activeTab, setActiveTab] = useState("url")
  const [style, setStyle] = useState<QRStyle>({
    size: 256,
    foreground: "#1e40af",
    background: "#ffffff",
    margin: 4
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate QR code
  const generateQR = async (text: string) => {
    try {
      const qrOptions = {
        width: style.size,
        margin: style.margin,
        color: {
          dark: style.foreground,
          light: style.background,
        },
        errorCorrectionLevel: 'M' as const,
      }
      
      const dataUrl = await QRCode.toDataURL(text, qrOptions)
      setQrDataUrl(dataUrl)
      toast.success("QR code generated successfully!")
    } catch (error) {
      console.error("Error generating QR code:", error)
      toast.error("Failed to generate QR code")
    }
  }

  // Auto-generate QR when input changes
  useEffect(() => {
    if (inputText.trim()) {
      generateQR(inputText)
    }
  }, [inputText, style])

  // Download QR code
  const downloadQR = () => {
    if (!qrDataUrl) return
    
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = qrDataUrl
    link.click()
    toast.success("QR code downloaded!")
  }

  // Handle tab content change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    
    // Set example content based on tab
    const examples = {
      url: "https://qrify-pro.com",
      email: "mailto:hello@qrify-pro.com?subject=Hello&body=Hi there!",
      phone: "tel:+1234567890",
      sms: "sms:+1234567890?body=Hello from QR code!",
      text: "Hello World! This is a custom text QR code."
    }
    
    setInputText(examples[value as keyof typeof examples] || "")
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* QR Generator Form */}
      <Card className="glass-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Share2 className="h-5 w-5 text-primary" />
            Generate QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Type Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="url" className="flex items-center gap-1">
                <Link className="h-3 w-3" />
                URL
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Phone
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                SMS
              </TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div>
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="mt-1"
                />
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <div>
                <Label htmlFor="email">Email Content</Label>
                <Input
                  id="email"
                  placeholder="mailto:email@example.com?subject=Subject&body=Message"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="mt-1"
                />
              </div>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="tel:+1234567890"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="mt-1"
                />
              </div>
            </TabsContent>

            <TabsContent value="sms" className="space-y-4">
              <div>
                <Label htmlFor="sms">SMS Content</Label>
                <Input
                  id="sms"
                  placeholder="sms:+1234567890?body=Your message here"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="mt-1"
                />
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div>
                <Label htmlFor="text">Custom Text</Label>
                <Input
                  id="text"
                  placeholder="Enter any text here"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="mt-1"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Style Customization */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-4 w-4 text-primary" />
              <Label className="text-sm font-semibold">Customize Style</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="foreground" className="text-xs">Foreground Color</Label>
                <Input
                  id="foreground"
                  type="color"
                  value={style.foreground}
                  onChange={(e) => setStyle(prev => ({ ...prev, foreground: e.target.value }))}
                  className="h-10 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="background" className="text-xs">Background Color</Label>
                <Input
                  id="background"
                  type="color"
                  value={style.background}
                  onChange={(e) => setStyle(prev => ({ ...prev, background: e.target.value }))}
                  className="h-10 mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs">Size: {style.size}px</Label>
              <Slider
                value={[style.size]}
                onValueChange={(value) => setStyle(prev => ({ ...prev, size: value[0] }))}
                max={512}
                min={128}
                step={32}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-xs">Margin: {style.margin}</Label>
              <Slider
                value={[style.margin]}
                onValueChange={(value) => setStyle(prev => ({ ...prev, margin: value[0] }))}
                max={8}
                min={0}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Preview & Download */}
      <Card className="glass-card animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center">QR Code Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="p-6 bg-white rounded-2xl shadow-card">
              {qrDataUrl ? (
                <img 
                  src={qrDataUrl} 
                  alt="Generated QR Code" 
                  className="max-w-full h-auto rounded-lg"
                  style={{ width: style.size, height: style.size }}
                />
              ) : (
                <div 
                  className="flex items-center justify-center bg-muted rounded-lg text-muted-foreground"
                  style={{ width: style.size, height: style.size }}
                >
                  Enter text to generate QR
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <HeroButton
              onClick={downloadQR}
              disabled={!qrDataUrl}
              size="lg"
              className="w-full"
            >
              <Download className="h-4 w-4" />
              Download QR Code
            </HeroButton>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => toast.info("Premium feature: Save to account - Sign up to unlock!")}
            >
              Save to Account
            </Button>
          </div>

          {/* QR Info */}
          {inputText && (
            <div className="text-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <strong>Content:</strong> {inputText.length > 50 ? `${inputText.substring(0, 50)}...` : inputText}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}