import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import type { ResolvedTheme, ThemePreference } from "./useThemePreference";

type ThemeControlProps = {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  onChange: (preference: ThemePreference) => void;
  placement?: "header" | "drawer";
};

const themeOptions: { value: ThemePreference; label: string; Icon: typeof Monitor }[] = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

const preferenceLabels: Record<ThemePreference, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export default function ThemeControl({ preference, resolvedTheme, onChange, placement = "header" }: ThemeControlProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const CurrentIcon = resolvedTheme === "dark" ? Moon : Sun;

  useEffect(() => {
    if (!open) return undefined;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const selectTheme = (value: ThemePreference) => {
    onChange(value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  if (placement === "drawer") {
    return (
      <section className="mobile-appearance-panel" aria-labelledby="mobile-appearance-heading">
        <div className="mobile-appearance-heading-row">
          <h2 id="mobile-appearance-heading">Appearance</h2>
          <span>{preferenceLabels[preference]}</span>
        </div>
        <div className="mobile-appearance-options" role="group" aria-label="Choose appearance">
          {themeOptions.map(({ value, label, Icon }) => (
            <button
              className="mobile-appearance-option"
              key={value}
              type="button"
              aria-pressed={preference === value}
              onClick={() => onChange(value)}
            >
              <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
              <span>{label}</span>
              {preference === value && <Check className="mobile-appearance-check" size={15} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <p className="mobile-appearance-hint">System follows your device setting.</p>
      </section>
    );
  }

  return (
    <div className="theme-control" ref={rootRef}>
      <button
        className="theme-toggle"
        ref={triggerRef}
        type="button"
        aria-label={`Theme: ${preferenceLabels[preference]}. Open appearance options.`}
        aria-expanded={open}
        aria-controls="theme-preference-options"
        title={`Appearance: ${preferenceLabels[preference]}`}
        onClick={() => setOpen((current) => !current)}
      >
        <CurrentIcon size={19} strokeWidth={1.9} aria-hidden="true" />
      </button>

      {open && (
        <div className="theme-options-popover" id="theme-preference-options" role="group" aria-label="Choose appearance">
          <p className="theme-options-title">Appearance</p>
          {themeOptions.map(({ value, label, Icon }) => (
            <button
              className="theme-option"
              key={value}
              type="button"
              aria-pressed={preference === value}
              onClick={() => selectTheme(value)}
            >
              <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
              <span>{label}</span>
              {preference === value && <Check className="theme-option-check" size={16} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
