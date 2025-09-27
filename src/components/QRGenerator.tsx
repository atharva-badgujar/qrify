import { useState, useRef, useEffect } from "react"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { HeroButton } from "@/components/ui/hero-button"
import { Download, Palette, Link, Mail, Phone, MessageSquare, Share2, Save, Crown } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/integrations/supabase/client"

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
  const [isSaving, setIsSaving] = useState(false)
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: ""
  })
  const [whatsappData, setWhatsappData] = useState({
    number: "",
    message: ""
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { user } = useAuth()

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

  // Save QR code to account
  const saveToAccount = async () => {
    if (!user) {
      toast.error("Please sign in to save QR codes")
      return
    }

    if (!inputText.trim() || !qrDataUrl) {
      toast.error("Please generate a QR code first")
      return
    }

    setIsSaving(true)
    
    try {
      const { error } = await supabase
        .from('qr_codes')
        .insert([{
          user_id: user.id,
          qr_type: activeTab,
          content: inputText,  
          title: `${activeTab.toUpperCase()} QR Code`,
          style_config: style as any,
          is_dynamic: false,
          is_active: true
        }])

      if (error) throw error

      toast.success("QR code saved to your account!")
    } catch (error) {
      console.error("Error saving QR code:", error)
      toast.error("Failed to save QR code. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Generate email mailto URL
  const generateEmailURL = () => {
    const params = new URLSearchParams()
    if (emailData.subject) params.append('subject', emailData.subject)
    if (emailData.body) params.append('body', emailData.body)
    const paramString = params.toString()
    return `mailto:${emailData.to}${paramString ? '?' + paramString : ''}`
  }

  // Generate WhatsApp URL
  const generateWhatsAppURL = () => {
    const cleanNumber = whatsappData.number.replace(/[^\d+]/g, '')
    const params = new URLSearchParams()
    if (whatsappData.message) params.append('text', whatsappData.message)
    const paramString = params.toString()
    return `https://wa.me/${cleanNumber}${paramString ? '?' + paramString : ''}`
  }

  // Handle tab content change
  const handleTabChange = (value: string) => {
    // Check if premium feature and user is not authenticated
    if ((value === 'email-pro' || value === 'whatsapp') && !user) {
      toast.error("Premium feature - Please sign in to access")
      return
    }

    setActiveTab(value)
    
    // Set example content based on tab
    const examples = {
      url: "https://qrify-pro.com",
      email: "mailto:hello@qrify-pro.com?subject=Hello&body=Hi there!",
      phone: "tel:+1234567890",
      sms: "sms:+1234567890?body=Hello from QR code!",
      text: "Hello World! This is a custom text QR code.",
      "email-pro": "",
      whatsapp: ""
    }
    
    if (value === "email-pro") {
      setEmailData({ to: "hello@qrify-pro.com", subject: "Hello", body: "Hi there! I found your contact through a QR code." })
    } else if (value === "whatsapp") {
      setWhatsappData({ number: "+1234567890", message: "Hello! I found your contact through a QR code." })
    } else {
      setInputText(examples[value as keyof typeof examples] || "")
    }
  }

  // Update inputText when email or whatsapp data changes
  useEffect(() => {
    if (activeTab === 'email-pro') {
      setInputText(generateEmailURL())
    } else if (activeTab === 'whatsapp') {
      setInputText(generateWhatsAppURL())
    }
  }, [emailData, whatsappData, activeTab])

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
            <TabsList className="grid w-full grid-cols-7 text-xs">
              <TabsTrigger value="url" className="flex items-center gap-1">
                <Link className="h-3 w-3" />
                URL
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                Email
              </TabsTrigger>
              <TabsTrigger value="email-pro" className="flex items-center gap-1 relative">
                <Mail className="h-3 w-3" />
                Pro Email
                <Crown className="h-2 w-2 text-primary" />
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="flex items-center gap-1 relative">
                <MessageSquare className="h-3 w-3" />
                WhatsApp
                <Crown className="h-2 w-2 text-primary" />
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
                <p className="text-xs text-muted-foreground mt-1">
                  Basic email format. Try <strong>Pro Email</strong> for easier formatting!
                </p>
              </div>
            </TabsContent>

            <TabsContent value="email-pro" className="space-y-4">
              <div className="space-y-3 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-semibold text-primary">Premium Email Builder</Label>
                </div>
                
                <div>
                  <Label htmlFor="email-to" className="text-xs">Recipient Email</Label>
                  <Input
                    id="email-to"
                    type="email"
                    placeholder="recipient@example.com"
                    value={emailData.to}
                    onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email-subject" className="text-xs">Subject Line</Label>
                  <Input
                    id="email-subject"
                    placeholder="Enter email subject"
                    value={emailData.subject}
                    onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email-body" className="text-xs">Message Body</Label>
                  <textarea
                    id="email-body"
                    placeholder="Enter your email message here..."
                    value={emailData.body}
                    onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
                    className="mt-1 w-full p-2 border rounded-md resize-none h-20 text-sm"
                  />
                </div>
                
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <strong>Preview:</strong> {generateEmailURL()}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="whatsapp" className="space-y-4">
              <div className="space-y-3 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-semibold text-primary">Premium WhatsApp Builder</Label>
                </div>
                
                <div>
                  <Label htmlFor="whatsapp-number" className="text-xs">Phone Number (with country code)</Label>
                  <Input
                    id="whatsapp-number"
                    placeholder="+1234567890"
                    value={whatsappData.number}
                    onChange={(e) => setWhatsappData(prev => ({ ...prev, number: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="whatsapp-message" className="text-xs">Pre-filled Message</Label>
                  <textarea
                    id="whatsapp-message"
                    placeholder="Hello! I found your contact through a QR code."
                    value={whatsappData.message}
                    onChange={(e) => setWhatsappData(prev => ({ ...prev, message: e.target.value }))}
                    className="mt-1 w-full p-2 border rounded-md resize-none h-20 text-sm"
                  />
                </div>
                
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <strong>Preview:</strong> {generateWhatsAppURL()}
                </div>
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
              onClick={user ? saveToAccount : () => toast.info("Please sign in to save QR codes to your account")}
              disabled={isSaving || !qrDataUrl}
            >
              <Save className="h-4 w-4" />
              {user ? (isSaving ? "Saving..." : "Save to Account") : "Sign In to Save"}
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