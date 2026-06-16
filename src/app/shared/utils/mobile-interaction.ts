const MOBILE_MEDIA_QUERY = '(max-width: 480px)';

export function isMobileInteraction(): boolean {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}
