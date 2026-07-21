import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MoreHorizontal } from "lucide-react";

// Placeholder data
const courses = [
  { id: "1", title: "YouTube Algorithm Secrets", modules: 5, status: "Published" },
  { id: "2", title: "Thumbnail Psychology 101", modules: 3, status: "Draft" },
];

export default function AdminCoursesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground">Manage your academy curriculum and content.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Course
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4">
                <span>{course.modules} Modules</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {course.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
