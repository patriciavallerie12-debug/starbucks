import { useEffect, useLayoutEffect, useState } from "react";

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const storageKey = "sb-ph-theme-preference";
const systemThemeQuery = "(prefers-color-scheme: dark)";

function readPreference(): ThemePreference {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (value === "light" || value === "dark" || value === "system") return value;
  } catch {
    // Use the device setting when browser storage is unavailable.
  }
  return "system";
}

function readSystemTheme(): ResolvedTheme {
  try {
    return window.matchMedia(systemThemeQuery).matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function useThemePreference() {
  const [preference, setPreference] = useState<ThemePreference>(readPreference);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(readSystemTheme);
  const resolvedTheme = preference === "system" ? systemTheme : preference;

  useEffect(() => {
    let media: MediaQueryList;
    try {
      media = window.matchMedia(systemThemeQuery);
    } catch {
      return undefined;
    }

    const updateSystemTheme = () => setSystemTheme(media.matches ? "dark" : "light");
    updateSystemTheme();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateSystemTheme);
      return () => media.removeEventListener("change", updateSystemTheme);
    }

    media.addListener(updateSystemTheme);
    return () => media.removeListener(updateSystemTheme);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = preference;
    root.style.colorScheme = resolvedTheme;

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = resolvedTheme === "dark" ? "#111813" : "#006241";

    try {
      window.localStorage.setItem(storageKey, preference);
    } catch {
      // The theme still applies for this visit if storage is unavailable.
    }
  }, [preference, resolvedTheme]);

  return { preference, setPreference, resolvedTheme };
}
