"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PlusCircle, MoreHorizontal, Video, Edit, Trash, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courseData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(courseData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;
    
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        title: newCourse.title,
        description: newCourse.description,
        status: "Draft",
        moduleCount: 0,
        createdAt: serverTimestamp(),
      });
      setCourses([...courses, { id: docRef.id, title: newCourse.title, description: newCourse.description, status: "Draft", moduleCount: 0 }]);
      setIsCreating(false);
      setNewCourse({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Curriculum Builder</h1>
          <p className="text-muted-foreground mt-1">Manage your academy curriculum, modules, and generate AI Quizzes.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)} className="bg-red-600 hover:bg-red-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          {isCreating ? "Cancel" : "New Course"}
        </Button>
      </div>

      {isCreating && (
        <Card className="border-red-500/50 bg-red-500/5 shadow-xl">
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
            <CardDescription>Setup the framework for your new masterclass.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input 
                  value={newCourse.title} 
                  onChange={e => setNewCourse({...newCourse, title: e.target.value})} 
                  placeholder="e.g. Viral Shorts Masterclass" 
                  className="bg-zinc-900 border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={newCourse.description} 
                  onChange={e => setNewCourse({...newCourse, description: e.target.value})} 
                  placeholder="Brief description of what students will learn..." 
                  className="bg-zinc-900 border-zinc-800"
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create Course Draft</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-10 text-muted-foreground animate-pulse">Loading curriculum...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 transition-all group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold truncate pr-4">{course.title}</CardTitle>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500 line-clamp-2 min-h-[40px]">{course.description || "No description provided."}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-6">
                  <div className="flex items-center gap-1.5">
                    <Video className="w-4 h-4" />
                    <span>{course.moduleCount || 0} Modules</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${course.status === "Published" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"}`}>
                    {course.status}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="border-t border-zinc-800/50 pt-4 flex gap-2">
                <Button variant="outline" size="sm" className="w-full bg-zinc-900 hover:bg-zinc-800">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-blue-500/20">
                  <Sparkles className="w-4 h-4 mr-2" /> AI Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
          {courses.length === 0 && !isCreating && (
            <div className="col-span-full py-12 text-center border border-dashed border-zinc-800 rounded-xl">
              <h3 className="text-lg font-semibold text-zinc-300">No courses found</h3>
              <p className="text-zinc-500 mt-1">Create your first masterclass to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
