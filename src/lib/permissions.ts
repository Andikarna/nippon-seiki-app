/**
 * permissions.ts
 * Single source of truth for role-based access control.
 * Permissions are stored in localStorage so Settings changes
 * are immediately reflected in the sidebar menu.
 */

import type { Role } from "./auth";

const PERMS_KEY = "npms_role_permissions";

/** Every permission name that exists in the system */
export const ALL_PERMISSIONS = [
  "View Dashboard",
  "Input Production",
  "Part Out",
  "FIFO Check",
  "View Production Data",
  "Approve Transactions",
  "Review FIFO Violations",
  "Generate Reports",
  "Access Analytics",
  "Access All Reports",
  "Manage Users",
  "Manage Production Lines",
  "Export Data",
] as const;

export type Permission = (typeof ALL_PERMISSIONS)[number];

/** Map each permission to the route(s) it grants access to */
export const PERMISSION_ROUTES: Record<Permission, string[]> = {
  "View Dashboard":         ["/dashboard"],
  "Input Production":       ["/part-input"],
  "Part Out":               ["/part-out"],
  "FIFO Check":             ["/fifo"],
  "View Production Data":   ["/production"],
  "Approve Transactions":   ["/production"],
  "Review FIFO Violations": ["/fifo"],
  "Generate Reports":       ["/reports"],
  "Access Analytics":       ["/dashboard", "/reports"],
  "Access All Reports":     ["/reports"],
  "Manage Users":           ["/settings"],
  "Manage Production Lines":["/settings"],
  "Export Data":            ["/reports"],
};

/** Default permissions per role (used when nothing is saved yet) */
export const DEFAULT_ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  operator: [
    "View Dashboard",
    "Input Production",
    "Part Out",
    "FIFO Check",
  ],
  supervisor: [
    "View Dashboard",
    "Approve Transactions",
    "Review FIFO Violations",
    "Generate Reports",
    "View Production Data",
    "Export Data",
  ],
  manager: [
    "View Dashboard",
    "Access Analytics",
    "Access All Reports",
    "Manage Users",
    "Manage Production Lines",
    "View Production Data",
    "Export Data",
  ],
};

/** Load saved permissions from localStorage, falling back to defaults */
export function loadRolePermissions(): Record<Role, Permission[]> {
  if (typeof window === "undefined") return { ...DEFAULT_ROLE_PERMISSIONS };
  try {
    const raw = localStorage.getItem(PERMS_KEY);
    if (raw) return JSON.parse(raw) as Record<Role, Permission[]>;
  } catch {
    // ignore parse errors
  }
  return { ...DEFAULT_ROLE_PERMISSIONS };
}

/** Persist updated permissions to localStorage and notify listeners */
export function saveRolePermissions(perms: Record<Role, Permission[]>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PERMS_KEY, JSON.stringify(perms));
  window.dispatchEvent(new Event("npms-permissions-changed"));
}

/**
 * Derive the set of allowed route paths for a given role
 * based on its current permissions.
 */
export function getAllowedRoutes(role: Role, perms: Record<Role, Permission[]>): string[] {
  const rolePerms = perms[role] ?? [];
  const routes = new Set<string>();
  for (const perm of rolePerms) {
    const mapped = PERMISSION_ROUTES[perm] ?? [];
    mapped.forEach((r) => routes.add(r));
  }
  return Array.from(routes);
}
