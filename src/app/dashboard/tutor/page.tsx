"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Bot, User } from "lucide-react";

export default function TutorPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello! I am your Yi AI Course tutor. How can I help you with the course material today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setMessages([...messages, { role: 'user', content: prompt }]);
    setPrompt("");
    setLoading(true);

    // Simulate API call to Gemini Tutor
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "That's a great question about Prompt Engineering! When you use a system prompt, you set the behavior and persona of the LLM. This provides a strong baseline for accurate responses." }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Tutor</h1>
        <p className="text-muted-foreground mt-2">
          Get instant, 24/7 help with any course material. Powered by Gemini 1.5 Pro.
        </p>
      </div>

      <Card className="h-[600px] flex flex-col border-zinc-800 bg-zinc-950/50 shadow-2xl">
        <CardHeader className="border-b border-zinc-800 pb-4 bg-zinc-900/50">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            Course Assistant
          </CardTitle>
          <CardDescription>Ask questions about lessons, quizzes, or assignments.</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-blue-500" />
                  </div>
                )}
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-zinc-300" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-blue-500" />
                </div>
                <div className="p-3 rounded-lg bg-zinc-800 text-zinc-400 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask your tutor a question..."
                className="min-h-[50px] max-h-[150px] resize-y bg-zinc-950 border-zinc-800"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button type="submit" disabled={!prompt.trim() || loading} className="h-[50px] w-[50px] shrink-0 bg-blue-600 hover:bg-blue-700">
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
