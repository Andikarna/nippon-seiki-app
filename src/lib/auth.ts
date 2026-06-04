// Simple client-only auth + mock data store for NPMS
import { useEffect, useState } from "react";

export type Role = "operator" | "supervisor" | "manager";
export interface User {
  name: string;
  email: string;
  role: Role;
}

const AUTH_KEY = "npms_auth";

const DEFAULT_USER: User = {
  name: "Demo Operator",
  email: "operator@ins.co.id",
  role: "operator",
};

export function getUser(): User | null {
  if (typeof window === "undefined") return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as User) : DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
}

export function setUser(u: User | null) {
  if (typeof window === "undefined") return;
  if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u));
  else localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("npms-auth"));
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
