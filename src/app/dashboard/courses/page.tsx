import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

// Placeholder data
const availableCourses = [
  { id: "1", title: "YouTube Algorithm Secrets", description: "Master the algorithm to go viral.", progress: 100 },
  { id: "2", title: "Thumbnail Psychology 101", description: "Design thumbnails that get clicks.", progress: 45 },
  { id: "3", title: "Scripting for Retention", description: "Keep your viewers watching until the end.", progress: 0 },
];

export default function StudentCoursesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Academy</h1>
        <p className="text-muted-foreground">Continue learning and master your craft.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableCourses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden">
            <div className="h-40 bg-muted flex items-center justify-center">
              <PlayCircle className="h-12 w-12 text-muted-foreground opacity-50" />
            </div>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                {course.progress === 0 ? "Start Course" : course.progress === 100 ? "Review Course" : "Continue"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
