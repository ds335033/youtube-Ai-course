"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, CheckCircle2 } from "lucide-react";
import { generateYouTubeTitles } from "@/app/actions/ai";

export default function TitleGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const generateTitles = async () => {
    if (!topic || !description) return;
    setLoading(true);
    setError(null);
    try {
      const newTitles = await generateYouTubeTitles(topic, description);
      setResults(newTitles);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Viral Title Generator</h1>
        <p className="text-muted-foreground">Let Gemini craft the perfect, high-CTR title for your next video.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>Tell the AI what your video is about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Main Topic or Keyword</Label>
            <Input 
              id="topic" 
              placeholder="e.g. YouTube Algorithm" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">What happens in the video?</Label>
            <Textarea 
              id="description" 
              placeholder="I spent 30 days uploading daily to see if the algorithm favors consistency over quality..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button onClick={generateTitles} disabled={loading || !topic || !description} className="w-full sm:w-auto">
            {loading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 animate-pulse" /> Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Generate Titles
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="border-amber-500/50 shadow-sm shadow-amber-500/10">
          <CardHeader>
            <CardTitle>Generated Titles</CardTitle>
            <CardDescription>Here are 5 high-CTR options for your video.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.map((title, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-md border bg-muted/30">
                <p className="font-medium">{title}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard(title, idx)}
                  className={copiedIndex === idx ? "text-green-500" : "text-muted-foreground hover:text-primary"}
                >
                  {copiedIndex === idx ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
