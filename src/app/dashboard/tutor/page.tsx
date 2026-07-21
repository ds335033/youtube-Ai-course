"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Bot, User, Loader2, Wrench } from "lucide-react";
import { remoteConfig } from "@/lib/firebase";
import { fetchAndActivate, getBoolean } from "firebase/remote-config";

export default function TutorPage() {
  const [isTutorEnabled, setIsTutorEnabled] = useState(true);

  useEffect(() => {
    async function checkTutorStatus() {
      if (remoteConfig) {
        try {
          await fetchAndActivate(remoteConfig);
          // If remote config has the key, update the state
          const enabled = getBoolean(remoteConfig, "enable_ai_tutor");
          setIsTutorEnabled(enabled);
        } catch (error) {
          console.error("Failed to fetch Remote Config:", error);
        }
      }
    }
    checkTutorStatus();
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/tutor',
    initialMessages: [
      { id: '1', role: 'assistant', content: "Hello! I am your Yi AI Course tutor. How can I help you with the course material today?" }
    ]
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  if (!isTutorEnabled) {
    return (
      <div className="max-w-4xl mx-auto h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-md p-8 rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center">
            <Wrench className="w-8 h-8 text-zinc-500" />
          </div>
          <h2 className="text-2xl font-bold">Undergoing Maintenance</h2>
          <p className="text-muted-foreground">
            The AI Tutor is currently undergoing scheduled maintenance to improve its knowledge base. Please check back soon!
          </p>
        </div>
      </div>
    );
  }

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
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-blue-500" />
                  </div>
                )}
                <div className={`p-4 rounded-xl max-w-[85%] whitespace-pre-wrap leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-md' : 'bg-zinc-800/80 text-zinc-100 shadow-sm border border-zinc-700/50'}`}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-zinc-300" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-blue-500" />
                </div>
                <div className="p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  <span className="text-zinc-400 text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
            <form onSubmit={onFormSubmit} className="flex gap-2 relative">
              <Textarea 
                value={input}
                onChange={handleInputChange}
                placeholder="Ask your tutor a question..."
                className="min-h-[55px] max-h-[200px] resize-y bg-zinc-950 border-zinc-800 py-4 pr-14 text-base focus-visible:ring-blue-500/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onFormSubmit(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                disabled={!input.trim() || isLoading} 
                className="absolute bottom-2 right-2 h-10 w-10 shrink-0 bg-blue-600 hover:bg-blue-700 p-0 rounded-lg shadow-md transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
