// Free, rule-based first-reply generator (no AI API).
// Never receives health note text — only a boolean.

export type LeadForReply = {
  name: string;
  preferred_experience: string | null;
  funnel: string | null;
  source: string | null;
  goals: string[];
  preferred_time: string | null;
  timezone: string | null;
  experience_level: string | null;
  health_present: boolean;
};

export type ServiceKind = "private" | "group" | "studio" | "other";

const SENSITIVE_RE =
  /pain|injur|surgery|operat|thyroid|pcod|pcos|pregnan|diabet|pressure|hypertens|cancer|heart|asthma|arthrit|depress|anxiet|disorder|disease|condition|medical|medic|period|menstru|back|neck|knee|spine|sciatica|hernia|migraine|insomnia|health|therap|recover/i;

/** Goals that are safe to repeat in chat / alerts. Sensitive ones are dropped. */
export function safeGoals(goals: string[] | null | undefined): string[] {
  return (goals ?? [])
    .map((g) => String(g).trim().slice(0, 60))
    .filter((g) => g && !SENSITIVE_RE.test(g) && !/not sure/i.test(g));
}

export function classifyService(l: Pick<LeadForReply, "preferred_experience" | "funnel" | "source">): ServiceKind {
  const s = `${l.preferred_experience ?? ""} ${l.funnel ?? ""} ${l.source ?? ""}`.toLowerCase();
  if (/private|1-on-1|one-to-one|personal/.test(s)) return "private";
  if (/studio|hai duong|in-studio|aerial/.test(s)) return "studio";
  if (/group|online|paid_online/.test(s)) return "group";
  return "other";
}

export function isBeginner(l: Pick<LeadForReply, "experience_level" | "goals">): boolean {
  const s = `${l.experience_level ?? ""} ${(l.goals ?? []).join(" ")}`.toLowerCase();
  return /beginner|new to yoga|never|first time/.test(s);
}

function firstName(name: string): string {
  const f = name.trim().split(/\s+/)[0] ?? "";
  return f.slice(0, 30) || "there";
}

function lowerFirst(s: string): string {
  return s ? s[0].toLowerCase() + s.slice(1) : s;
}

export function generateReply(l: LeadForReply): string {
  const kind = classifyService(l);
  const beginner = isBeginner(l);
  const goals = safeGoals(l.goals).filter(
    (g) => !/private|group|1-on-1|live|beginner/i.test(g),
  );
  const tz = l.timezone ? l.timezone.slice(0, 40) : null;
  const time = l.preferred_time ? l.preferred_time.slice(0, 40) : null;
  const parts: string[] = [`Hi ${firstName(l.name)}, thank you for reaching out to Yog Jivan! 🙏`];

  if (kind === "private") {
    parts.push(
      beginner
        ? "As you're starting out, we'd love to offer you a complimentary assessment session with Master Anil, so we understand your level and match you with the right teacher."
        : "We'd love to start with a short complimentary assessment so we can match you with the right teacher for your private sessions.",
    );
  } else if (kind === "group") {
    parts.push("Thank you for your interest in our live online group classes. Our team will check the current class times for you.");
  } else if (kind === "studio") {
    parts.push("Thank you for your interest in classes at our Hai Duong studios.");
  } else {
    parts.push("Our team will guide you to the class that suits you best.");
  }

  if (goals.length) parts.push(`It's great that you'd like to focus on ${lowerFirst(goals[0])}.`);

  if (l.health_present) {
    parts.push("Thank you for sharing your health information — our team will review it carefully so your practice is adapted to you.");
  }

  const questions: string[] = [];
  if (kind === "studio") questions.push("Which studio is most convenient for you?");
  if (time) {
    parts.push(`We've noted your preference for ${lowerFirst(time)}${tz ? ` (${tz} time)` : ""}.`);
  } else {
    questions.push(`Which days and times usually suit you${tz ? ` (${tz} time)` : ""}?`);
  }
  if (kind === "group" && !l.experience_level && !beginner) {
    questions.push("Have you practised yoga before?");
  }
  if (kind === "studio" && !goals.length) questions.push("What would you like to focus on?");
  if (!l.health_present) {
    questions.push("Is there any pain, injury or physical restriction we should know about?");
  }

  if (questions.length) parts.push(questions.slice(0, 3).join(" "));
  parts.push("— Yog Jivan Team");
  return parts.join(" ").slice(0, 900);
}
