"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search, Mail, ShieldAlert, CheckCircle2, UserX } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserAccess = async (userId: string, currentAccess: boolean) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { hasAccess: !currentAccess });
      // Optimistic update
      setUsers(users.map(u => u.id === userId ? { ...u, hasAccess: !currentAccess } : u));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const filteredUsers = users.filter(u => 
    (u.email || "").toLowerCase().includes(search.toLowerCase()) || 
    (u.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student CRM</h1>
        <p className="text-muted-foreground mt-1">Manage student access, view analytics, and control course progression.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search by name or email..." 
            className="pl-8 bg-zinc-950 border-zinc-800"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800">
          Export CSV
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 bg-zinc-900/50 font-medium text-sm text-muted-foreground">
          <div className="col-span-4">Student</div>
          <div className="col-span-3">Joined</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-3 text-right">Premium Access</div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Loading students...</div>
        ) : filteredUsers.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-zinc-900/30 transition-colors">
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold shrink-0">
                    {user.name ? user.name.charAt(0).toUpperCase() : <Mail className="w-4 h-4" />}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{user.name || "No Name Provided"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="col-span-3 text-sm text-zinc-400">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                </div>
                
                <div className="col-span-2 flex justify-center">
                  {user.hasAccess ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
                      <UserX className="w-3 h-3" /> Free Tier
                    </span>
                  )}
                </div>
                
                <div className="col-span-3 flex justify-end items-center gap-4">
                  <span className="text-xs text-muted-foreground">
                    {user.hasAccess ? "Revoke" : "Grant"}
                  </span>
                  <Switch 
                    checked={user.hasAccess || false} 
                    onCheckedChange={() => toggleUserAccess(user.id, user.hasAccess || false)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <ShieldAlert className="w-12 h-12 text-zinc-700 mb-4" />
            <h3 className="text-lg font-semibold text-zinc-300">No students found</h3>
            <p className="text-zinc-500 mt-1 max-w-sm">
              We couldn't find any students matching your search. Have you had any signups yet?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
