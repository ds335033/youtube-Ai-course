"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, CheckCircle2 } from "lucide-react";
import { generateScriptOutline } from "@/app/actions/ai";

export default function ScriptGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [points, setPoints] = useState("");
  const [error, setError] = useState<string | null>(null);

  const generateScript = async () => {
    if (!title || !duration || !points) return;
    setLoading(true);
    setError(null);
    try {
      const generated = await generateScriptOutline(title, Number(duration), points);
      setResult(generated);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Script Outline Builder</h1>
        <p className="text-muted-foreground">Generate a retention-optimized structure for your video.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Video Concept</CardTitle>
            <CardDescription>What is the core premise of your video?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Working Title</Label>
              <Input 
                id="title" 
                placeholder="e.g. The TRUTH About Click-Through Rates" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Target Duration (Minutes)</Label>
              <Input 
                id="duration" 
                type="number" 
                placeholder="8" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Key Points to Cover</Label>
              <Textarea 
                id="points" 
                placeholder="- 3 element rule\n- Color psychology\n- Curiosity gaps"
                rows={4}
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button onClick={generateScript} disabled={loading || !title || !duration || !points} className="w-full">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-pulse" /> Structuring Script...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Generate Outline
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        {result ? (
          <Card className="border-blue-500/50 shadow-sm shadow-blue-500/10">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle>Your Script Outline</CardTitle>
                <CardDescription>Ready to film!</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={copyToClipboard}
                className={copied ? "text-green-500" : "text-muted-foreground"}
              >
                {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap bg-muted/30 p-4 rounded-md border">
                {result}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="hidden md:flex border-2 border-dashed rounded-xl items-center justify-center text-muted-foreground p-8 text-center h-[400px]">
            Fill out the concept details and hit generate to see your AI-crafted outline here.
          </div>
        )}
      </div>
    </div>
  );
}
