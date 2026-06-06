/**
 * preferences.ts
 * Manages all user-facing app preferences with localStorage persistence.
 * Other components can read preferences and listen for changes.
 */

const PREFS_KEY = "npms_app_preferences";
const PREFS_EVENT = "npms-preferences-changed";

export interface AppPreferences {
  realtimeNotifications: boolean;
  auditTrailEmails: boolean;
  autoPrintLabels: boolean;
  compactDensity: boolean;
  defaultShift: string;
}

export const DEFAULT_PREFERENCES: AppPreferences = {
  realtimeNotifications: true,
  auditTrailEmails: false,
  autoPrintLabels: true,
  compactDensity: false,
  defaultShift: "Shift 1 · 07:00 – 15:00",
};

/** Load preferences from localStorage */
export function loadPreferences(): AppPreferences {
  if (typeof window === "undefined") return { ...DEFAULT_PREFERENCES };
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return { ...DEFAULT_PREFERENCES };
}

/** Save preferences to localStorage and notify all listeners */
export function savePreferences(prefs: AppPreferences): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  // Apply compact density immediately
  applyCompactDensity(prefs.compactDensity);
  window.dispatchEvent(new CustomEvent(PREFS_EVENT, { detail: prefs }));
}

/** Apply compact density CSS class to document root */
export function applyCompactDensity(enabled: boolean): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("compact", enabled);
}

/** Read a single preference value */
export function getPref<K extends keyof AppPreferences>(key: K): AppPreferences[K] {
  return loadPreferences()[key];
}
