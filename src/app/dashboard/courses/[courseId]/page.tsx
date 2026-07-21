import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";

// Placeholder data for the curriculum
const curriculum = [
  { 
    title: "Module 1: AI Fundamentals", 
    lessons: [
      { id: "l1", title: "Intro to LLMs", duration: "12:30", completed: true },
      { id: "l2", title: "Prompt Engineering 101", duration: "15:45", completed: false },
      { id: "l3", title: "Building your first Agent", duration: "18:20", locked: true },
    ]
  },
  { 
    title: "Module 2: Advanced Integrations", 
    lessons: [
      { id: "l4", title: "Connecting APIs", duration: "08:15", locked: true },
      { id: "l5", title: "Deploying to Production", duration: "11:10", locked: true },
    ]
  }
];

export default function CoursePlayerPage({ params }: { params: { courseId: string } }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Video Player Section */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="aspect-video bg-black rounded-xl flex items-center justify-center text-white relative overflow-hidden shadow-2xl border border-zinc-800">
          {/* Real video player (like Mux) would go here */}
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-zinc-950/40 backdrop-blur-sm">
            <PlayCircle className="h-20 w-20 opacity-90 text-blue-500 cursor-pointer hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>
        </div>
        
        <div className="flex items-start justify-between mt-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Prompt Engineering 101</h1>
            <p className="text-muted-foreground mt-1 text-lg">Module 1 • Lesson 2</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-blue-500/50 text-blue-500 hover:bg-blue-500/10">Take Module Quiz</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Next Lesson</Button>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none mt-6 bg-muted/30 p-6 rounded-xl border">
          <h3 className="mt-0">Lesson Notes</h3>
          <p>In this lesson, we cover why structuring your prompt with specific context windows yields a 10x improvement in LLM accuracy. Remember the 3 rules of zero-shot prompting.</p>
        </div>
      </div>

      {/* Curriculum Sidebar */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
        <h3 className="font-semibold text-lg">Course Curriculum</h3>
        
        <div className="flex flex-col gap-4">
          {curriculum.map((module, mIdx) => (
            <div key={mIdx} className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{module.title}</h4>
              <div className="flex flex-col gap-2">
                {module.lessons.map((lesson) => (
                  <Card 
                    key={lesson.id} 
                    className={`cursor-pointer transition-colors ${lesson.completed ? 'bg-muted/50' : lesson.locked ? 'opacity-60 cursor-not-allowed' : 'hover:border-primary'}`}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      ) : lesson.locked ? (
                        <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : (
                        <PlayCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      
                      <div className="flex-1 flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">{lesson.title}</span>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
