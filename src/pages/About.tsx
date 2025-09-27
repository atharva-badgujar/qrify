import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col items-center justify-center p-4 text-center">
      <div className="flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-elegant mb-6">
        <QrCode className="h-10 w-10 text-white" />
      </div>
      <h1 className="text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-4">
        About QRify Pro
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-8">
        QRify Pro is your ultimate solution for generating professional, customizable, and trackable QR codes.
        We empower businesses and individuals to create stunning QR codes with advanced features like dynamic content,
        detailed analytics, and custom branding. Our mission is to make QR code technology accessible and powerful for everyone.
      </p>
      <Button onClick={() => navigate("/")} size="lg" className="mt-6">
        Go to Home
      </Button>
    </div>
  );
};

export default About;