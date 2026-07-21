export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  isPublished: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  videoUrl?: string; // Mux or YouTube URL
  content?: string; // Markdown or Rich Text
  order: number;
  isPublished: boolean;
  durationMinutes?: number;
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
  lastWatchedAt: Date;
}
