"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, TrendingUp, Users } from "lucide-react";
import { remoteConfig } from "@/lib/firebase";
import { fetchAndActivate, getString } from "firebase/remote-config";

export default function Home() {
  const [heroPrefix, setHeroPrefix] = useState("Master the AI Revolution.");
  const [heroHighlight, setHeroHighlight] = useState("Build the Future.");

  useEffect(() => {
    async function loadRemoteConfig() {
      if (remoteConfig) {
        try {
          await fetchAndActivate(remoteConfig);
          const prefix = getString(remoteConfig, "landing_hero_prefix");
          const highlight = getString(remoteConfig, "landing_hero_highlight");
          
          if (prefix) setHeroPrefix(prefix);
          if (highlight) setHeroHighlight(highlight);
        } catch (error) {
          console.error("Failed to load Remote Config", error);
        }
      }
    }
    loadRemoteConfig();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-4xl space-y-8">
          <div className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-semibold mb-4 tracking-wide">
            WELCOME TO YI AI COURSE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {heroPrefix} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              {heroHighlight}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            The ultimate learning platform and AI toolsuite for serious builders. Stop guessing and start shipping with world-class AI strategies.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-500/20">
                Start Learning for Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32 px-4 text-left">
          <div className="space-y-3 p-6 rounded-2xl bg-white dark:bg-zinc-900 border shadow-sm">
            <PlayCircle className="w-10 h-10 text-blue-500" />
            <h3 className="text-xl font-bold">World-Class Curriculum</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Step-by-step masterclasses on building the future with AI.</p>
          </div>
          <div className="space-y-3 p-6 rounded-2xl bg-white dark:bg-zinc-900 border shadow-sm">
            <TrendingUp className="w-10 h-10 text-indigo-500" />
            <h3 className="text-xl font-bold">Interactive Quizzes</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Test your knowledge with questionnaires at the end of each module.</p>
          </div>
          <div className="space-y-3 p-6 rounded-2xl bg-white dark:bg-zinc-900 border shadow-sm">
            <Users className="w-10 h-10 text-purple-500" />
            <h3 className="text-xl font-bold">AI Tutoring Bot</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Stuck? Ask the 24/7 AI tutor for instant help with course material.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
