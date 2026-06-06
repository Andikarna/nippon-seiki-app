// Simple client-only auth + mock data store for NPMS
import { useEffect, useState } from "react";

export type Role = "operator" | "supervisor" | "manager";
export interface User {
  name: string;
  email: string;
  role: Role;
}

const AUTH_KEY = "npms_auth";

export const DEMO_USERS: User[] = [
  {
    name: "Afifi Rouf",
    email: "operator@ins.co.id",
    role: "operator",
  },
  {
    name: "Sari Handayani",
    email: "supervisor@ins.co.id",
    role: "supervisor",
  },
  {
    name: "Andi Firmansyah",
    email: "manager@ins.co.id",
    role: "manager",
  },
];

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setUser(u: User | null) {
  if (typeof window === "undefined") return;
  if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u));
  else localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("npms-auth"));
}

import { authenticateUser } from "./api/db.functions";

export async function loginUser(email: string, password?: string): Promise<User | null> {
  try {
    const res = await authenticateUser({ data: { email, password } });
    if (res.success && res.user) {
      setUser(res.user);
      return res.user;
    }
  } catch (e) {
    console.error("Auth server function error:", e);
  }
  return null;
}
export function useUser() {
  const [user, set] = useState<User | null>(null);
  useEffect(() => {
    set(getUser());
    const h = () => set(getUser());
    window.addEventListener("npms-auth", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("npms-auth", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return user;
}
