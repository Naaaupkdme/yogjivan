import { MessageCircle } from "lucide-react";

const WHATSAPP = "https://wa.me/84000000000?text=Hello%20Yog%20Jivan%2C%20I%27d%20like%20to%20book%20a%20free%20trial.";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_20px_50px_-10px_rgba(37,211,102,0.55)] transition-transform hover:scale-110"
      style={{
        background: "linear-gradient(135deg,#25D366,#128C7E)",
        marginBottom: "env(safe-area-inset-bottom,0px)",
      }}
    >
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
      <MessageCircle className="relative h-6 w-6" />
    </a>
  );
}
