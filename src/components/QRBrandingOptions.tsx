import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface QRBrandingOptions {
  logoFile: File | null;
  logoUrl: string;
  companyName: string;
  tagline: string;
}

interface QRBrandingOptionsProps {
  branding: QRBrandingOptions;
  onBrandingChange: (branding: QRBrandingOptions) => void;
}

export const QRBrandingOptions = ({ branding, onBrandingChange }: QRBrandingOptionsProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error("File size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onBrandingChange({
        ...branding,
        logoFile: file,
        logoUrl: e.target?.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const removeLogo = () => {
    onBrandingChange({
      ...branding,
      logoFile: null,
      logoUrl: ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Branding Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Logo Upload</Label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5'
                : branding.logoUrl
                ? 'border-green-300 bg-green-50/50'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {branding.logoUrl ? (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={branding.logoUrl}
                    alt="Logo preview"
                    className="max-w-full max-h-32 mx-auto rounded"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {branding.logoFile?.name || "Logo uploaded"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Drag and drop your logo here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                  id="logo-upload"
                />
                <Label htmlFor="logo-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Choose File</span>
                  </Button>
                </Label>
              </div>
            )}
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name</Label>
          <Input
            id="company-name"
            placeholder="Enter your company name"
            value={branding.companyName}
            onChange={(e) => onBrandingChange({
              ...branding,
              companyName: e.target.value
            })}
          />
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline (Optional)</Label>
          <Input
            id="tagline"
            placeholder="Enter your tagline or slogan"
            value={branding.tagline}
            onChange={(e) => onBrandingChange({
              ...branding,
              tagline: e.target.value
            })}
          />
        </div>

        {/* Preview Note */}
        {(branding.logoUrl || branding.companyName) && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 Your branding will be displayed alongside the QR code when downloaded or shared.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};