/** Shared Zalo glyph — single source of truth for the Zalo mark. */
export function ZaloIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.6 1.4 5 3.7 6.6-.2 1-.7 2.5-1.6 3.5-.2.2 0 .5.3.5 1.9-.1 3.6-.9 4.7-1.7 1 .2 2 .4 2.9.4 5.5 0 10-3.9 10-8.7C22 5.9 17.5 2 12 2zm-4.5 11H6V8h1.5v5zm5.5 0h-1.3l-2.3-3v3H8V8h1.4l2.3 3V8H13v5zm3.5 0H15c-.6 0-1-.4-1-1V8h1.5v3.5H17V13zm3.7-1.4c0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6.7-1.6 1.6-1.6 1.6.7 1.6 1.6z" />
    </svg>
  );
}

export default ZaloIcon;
