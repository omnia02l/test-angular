/**
 * Extrait le message d'erreur d'une réponse API (Laravel).
 */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'error' in err) {
    const body = err as { error?: { message?: string; errors?: Record<string, string[]> } };
    if (typeof body.error?.message === 'string') return body.error.message;
    const titreErr = body.error?.errors?.['titre']?.[0];
    if (titreErr) return titreErr;
  }
  return fallback;
}
