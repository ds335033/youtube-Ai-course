"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mocked state for the UI, in production this would fetch/save to Firebase Admin SDK or Firestore
  const [settings, setSettings] = useState({
    enable_ai_tutor: true,
    landing_hero_prefix: "Master the AI Revolution.",
    landing_hero_highlight: "Build the Future.",
    pro_plan_price: "$49/mo",
    lifetime_plan_price: "$499",
  });

  const handleSave = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Configurator</h1>
        <p className="text-muted-foreground mt-2">
          Control your platform's remote configuration variables instantly. (Visual UI mockup)
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Kill Switches */}
        <Card className="border-zinc-800 bg-zinc-950/50">
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
            <CardDescription>Instantly disable features for maintenance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold">AI Tutor Active</Label>
                <p className="text-sm text-muted-foreground">Allows students to chat with the Gemini Tutor.</p>
              </div>
              <Switch 
                checked={settings.enable_ai_tutor}
                onCheckedChange={(c) => setSettings({...settings, enable_ai_tutor: c})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="border-zinc-800 bg-zinc-950/50">
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>Update checkout prices and Stripe IDs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Pro Plan Price String</Label>
              <Input 
                value={settings.pro_plan_price} 
                onChange={(e) => setSettings({...settings, pro_plan_price: e.target.value})}
                className="bg-zinc-900 border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label>Lifetime Plan Price String</Label>
              <Input 
                value={settings.lifetime_plan_price} 
                onChange={(e) => setSettings({...settings, lifetime_plan_price: e.target.value})}
                className="bg-zinc-900 border-zinc-800"
              />
            </div>
          </CardContent>
        </Card>

        {/* A/B Testing Landing Page */}
        <Card className="border-zinc-800 bg-zinc-950/50 md:col-span-2">
          <CardHeader>
            <CardTitle>Landing Page A/B Testing</CardTitle>
            <CardDescription>Modify the hero copy to test conversions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hero Prefix (White Text)</Label>
                <Input 
                  value={settings.landing_hero_prefix} 
                  onChange={(e) => setSettings({...settings, landing_hero_prefix: e.target.value})}
                  className="bg-zinc-900 border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label>Hero Highlight (Gradient Text)</Label>
                <Input 
                  value={settings.landing_hero_highlight} 
                  onChange={(e) => setSettings({...settings, landing_hero_highlight: e.target.value})}
                  className="bg-zinc-900 border-zinc-800"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-4 border-t border-zinc-800">
            <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
              {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {success ? "Saved!" : "Publish Config"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
