export type UserRole = "STUDENT" | "CREATOR" | "FOUNDER" | "ADMIN";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  subscriptionTier: "FREE" | "PRO" | "LIFETIME";
  createdAt: Date;
  updatedAt: Date;
}

export const ROLE_PERMISSIONS = {
  STUDENT: ["read:courses", "read:community"],
  CREATOR: ["read:courses", "read:community", "write:tools", "read:tools"],
  FOUNDER: ["read:courses", "read:community", "write:tools", "read:tools", "access:founder_modules", "access:alpha_tools"],
  ADMIN: ["*"],
} as const;

export function hasPermission(userRole: UserRole, permission: string): boolean {
  if (userRole === "ADMIN") return true;
  const permissions = ROLE_PERMISSIONS[userRole] as readonly string[];
  return permissions.includes(permission);
}
