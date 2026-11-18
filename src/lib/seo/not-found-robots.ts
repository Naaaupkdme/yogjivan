type MatchLike = { status?: string; globalNotFound?: boolean };

/**
 * True when the rendered page is the 404 shell: only the root match exists
 * (no route matched the URL) or a route threw notFound().
 */
export function isNotFoundShell(match: MatchLike, matches: ReadonlyArray<MatchLike> | undefined) {
  if (match.globalNotFound) return true;
  if (!matches) return false;
  return matches.length <= 1 || matches.some((m) => m.status === "notFound" || m.globalNotFound);
}
