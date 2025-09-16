const sessions = new Map<string, { userId: string; revoked: boolean }>();

export function saveSession(jti: string, userId: string) {
  sessions.set(jti, { userId, revoked: false });
}

export function revokeSession(jti: string) {
  const s = sessions.get(jti);
  if (s) s.revoked = true;
}

export function isSessionValid(jti: string) {
  const s = sessions.get(jti);
  return s && !s.revoked;
}
