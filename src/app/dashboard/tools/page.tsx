import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, FileText, Search, Video } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    title: "Viral Title Generator",
    description: "Generate 10 highly-clickable YouTube titles based on your video concept and target audience.",
    icon: Lightbulb,
    href: "/dashboard/tools/titles",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    title: "Script Outline Builder",
    description: "Create a retention-optimized script outline with hooks, transitions, and CTA placements.",
    icon: FileText,
    href: "/dashboard/tools/script",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "SEO Tag Optimizer",
    description: "Extract the best performing tags and keywords to rank in YouTube Search.",
    icon: Search,
    href: "/dashboard/tools/seo",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Thumbnail Idea Analyzer",
    description: "Describe your thumbnail idea and get an AI rating on its CTR potential.",
    icon: Video,
    href: "/dashboard/tools/thumbnail",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  }
];

export default function AIToolsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Creator Toolkit</h1>
        <p className="text-muted-foreground">Leverage the power of Gemini AI to accelerate your channel growth.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <Card key={tool.title} className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${tool.bg}`}>
                  <tool.icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription className="mt-1">{tool.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href={tool.href}>
                <Button variant="secondary" className="w-full">Launch Tool</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
