import { useEffect, useMemo, useRef, useState } from "react";
import { usePhoneInput, defaultCountries, parseCountry, FlagImage } from "react-international-phone";
import type { CountryIso2 } from "react-international-phone";
import { ChevronDown, Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: CountryIso2;
  placeholder?: string;
  name?: string;
  ariaLabel?: string;
};

export function SearchablePhoneInput({
  value,
  onChange,
  defaultCountry = "vn",
  placeholder = "912 345 678",
  name = "whatsapp",
  ariaLabel = "WhatsApp number",
}: Props) {
  const { inputValue, country, setCountry, handlePhoneValueChange, inputRef } = usePhoneInput({
    defaultCountry,
    value,
    disableDialCodeAndPrefix: true,
    onChange: (data) => onChange(data.phone),
  });

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const parsed = useMemo(() => defaultCountries.map(parseCountry), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return parsed;
    return parsed.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.dialCode.includes(q.replace(/^\+/, "")),
    );
  }, [parsed, query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    setTimeout(() => searchRef.current?.focus(), 20);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex items-stretch rounded-[1rem] border border-white/10 bg-white/[0.04] transition-colors focus-within:border-[color:var(--gold)]/60">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Select country"
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-l-[1rem] border-r border-white/10 px-3 py-3 text-sm hover:bg-white/[0.03]"
        >
          <FlagImage iso2={country.iso2} style={{ width: 22, height: 22 }} />
          <span className="text-foreground/90">+{country.dialCode}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </button>
        <input
          ref={inputRef}
          type="tel"
          name={name}
          aria-label={ariaLabel}
          placeholder={placeholder}
          value={inputValue}
          onChange={handlePhoneValueChange}
          className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
        />
      </div>

      {open && (
        <div className="absolute z-50 mt-2 max-h-72 w-full min-w-[18rem] overflow-hidden rounded-xl border border-white/10 bg-[color:var(--onyx)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
            <Search className="h-3.5 w-3.5 opacity-60" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code…"
              className="flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-xs text-muted-foreground">No matches</li>
            )}
            {filtered.map((c) => {
              const active = c.iso2 === country.iso2;
              return (
                <li key={c.iso2}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setCountry(c.iso2, { focusOnInput: true });
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-white/[0.05] ${
                      active ? "bg-white/[0.04] text-[color:var(--gold)]" : "text-foreground/90"
                    }`}
                  >
                    <FlagImage iso2={c.iso2} style={{ width: 20, height: 20 }} />
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground">+{c.dialCode}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
