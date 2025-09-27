import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Plus, BarChart3, Settings, Crown, Download, Eye, Trash2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface QRCodeData {
  id: string
  title: string
  content: string
  qr_type: string
  scan_count: number
  is_dynamic: boolean
  created_at: string
}

interface Profile {
  subscription_tier: string
  full_name: string
}

const Dashboard = () => {
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth")
      return
    }

    if (user) {
      fetchUserData()
    }
  }, [user, loading, navigate])

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('subscription_tier, full_name')
        .eq('user_id', user?.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      }

      // Fetch user's QR codes
      const { data: qrData, error } = await supabase
        .from('qr_codes')
        .select('id, title, content, qr_type, scan_count, is_dynamic, created_at')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) {
        toast.error("Failed to load your QR codes")
      } else {
        setQrCodes(qrData || [])
      }
    } catch (error) {
      toast.error("Failed to load dashboard data")
    } finally {
      setLoadingData(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate("/")
    toast.success("Signed out successfully")
  }

  const deleteQRCode = async (id: string) => {
    const { error } = await supabase
      .from('qr_codes')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error("Failed to delete QR code")
    } else {
      setQrCodes(prev => prev.filter(qr => qr.id !== id))
      toast.success("QR code deleted successfully")
    }
  }

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const tierColors = {
    free: "bg-gray-100 text-gray-800",
    pro: "bg-blue-100 text-blue-800",
    premium: "bg-purple-100 text-purple-800"
  }

  const totalScans = qrCodes.reduce((sum, qr) => sum + qr.scan_count, 0)

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-xl shadow-elegant">
                  <QrCode className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    QRify Pro
                  </h1>
                  <p className="text-xs text-muted-foreground">Dashboard</p>
                </div>
              </div>
              
              {profile && (
                <Badge className={tierColors[profile.subscription_tier as keyof typeof tierColors]}>
                  {profile.subscription_tier.toUpperCase()}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Welcome back, {profile?.full_name || user?.email?.split('@')[0]}
              </span>
              
              <Button variant="outline" onClick={() => navigate("/pricing")}>
                <Crown className="h-4 w-4 mr-2" />
                Upgrade
              </Button>
              
              <Button variant="ghost" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total QR Codes</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{qrCodes.length}</div>
              <p className="text-xs text-muted-foreground">
                {qrCodes.filter(qr => qr.is_dynamic).length} dynamic codes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalScans}</div>
              <p className="text-xs text-muted-foreground">
                Across all your QR codes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {profile?.subscription_tier}
              </div>
              <p className="text-xs text-muted-foreground">
                Current plan status
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => navigate("/#qr-generator")}
              className="h-20 flex-col gap-2"
              variant="outline"
            >
              <Plus className="h-6 w-6" />
              Create New QR
            </Button>
            
            <Button
              onClick={() => toast.info("Analytics feature coming soon!")}
              className="h-20 flex-col gap-2"
              variant="outline"
            >
              <BarChart3 className="h-6 w-6" />
              View Analytics
            </Button>
            
            <Button
              onClick={() => navigate("/pricing")}
              className="h-20 flex-col gap-2"
              variant="outline"
            >
              <Crown className="h-6 w-6" />
              Upgrade Plan
            </Button>
            
            <Button
              onClick={() => toast.info("Bulk export feature coming soon!")}
              className="h-20 flex-col gap-2"
              variant="outline"
            >
              <Download className="h-6 w-6" />
              Export All
            </Button>
          </div>
        </div>

        {/* Recent QR Codes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your QR Codes</h2>
            <Button onClick={() => navigate("/#qr-generator")}>
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </div>

          {qrCodes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <QrCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No QR codes yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first QR code to get started
                </p>
                <Button onClick={() => navigate("/#qr-generator")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First QR Code
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {qrCodes.map((qr) => (
                <Card key={qr.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{qr.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {qr.qr_type.toUpperCase()}
                          </Badge>
                          {qr.is_dynamic && (
                            <Badge variant="secondary" className="text-xs">
                              Dynamic
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {qr.content.length > 50 
                            ? `${qr.content.substring(0, 50)}...` 
                            : qr.content
                          }
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Created: {new Date(qr.created_at).toLocaleDateString()}</span>
                          <span>Scans: {qr.scan_count}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toast.info("View analytics feature coming soon!")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toast.info("Download QR feature coming soon!")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteQRCode(qr.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard