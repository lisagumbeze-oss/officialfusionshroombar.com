export const MOBILE_NAV_QUERY = '(max-width: 1023px)';
export const FLOATING_BUTTON_SIZE = 56;
export const FLOATING_GAP = 12;
export const FLOATING_SIDE = 20;
export const DESKTOP_BOTTOM = 16;
export const CHAT_GAP = 12;
export const BRAND_PRIMARY_FALLBACK = '#0071e3';

export const FLOATING_WIDGETS_CHANGE = 'floating-widgets-change';

export function getBrandPrimaryColor(): string {
  if (typeof window === 'undefined') return BRAND_PRIMARY_FALLBACK;
  return (
    getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() ||
    BRAND_PRIMARY_FALLBACK
  );
}

export function getBottomNavHeight(): number {
  const nav = document.querySelector<HTMLElement>('nav[aria-label="Mobile navigation"]');
  if (nav) {
    return nav.getBoundingClientRect().height;
  }

  return getCssVarPx('--bottom-nav-offset');
}

function getCssVarPx(name: string): number {
  const probe = document.createElement('div');
  probe.style.cssText = `position:fixed;bottom:0;left:0;width:0;height:var(${name});visibility:hidden;pointer-events:none`;
  document.body.appendChild(probe);
  const height = probe.getBoundingClientRect().height;
  document.body.removeChild(probe);
  return height;
}

export function getFloatingBaseBottom(): number {
  const fromCss = getCssVarPx('--floating-chat-bottom');
  if (fromCss > 0) return fromCss;

  const isMobile = window.matchMedia(MOBILE_NAV_QUERY).matches;
  if (!isMobile) return DESKTOP_BOTTOM;
  return getBottomNavHeight() + CHAT_GAP;
}

export function getChatOffsetY(): number {
  return getFloatingBaseBottom();
}

export function getBackToTopBottom(): number {
  const fromCss = getCssVarPx('--floating-back-to-top-bottom');
  if (fromCss > 0) return fromCss;
  return getFloatingBaseBottom() + FLOATING_BUTTON_SIZE + FLOATING_GAP;
}

export function applyFloatingWidgetCssVars() {
  if (typeof window === 'undefined') return;

  document.documentElement.style.setProperty('--floating-side', `${FLOATING_SIDE}px`);
  document.documentElement.style.setProperty('--floating-accent', getBrandPrimaryColor());
}

export function notifyFloatingWidgetsChange() {
  applyFloatingWidgetCssVars();
  window.dispatchEvent(new CustomEvent(FLOATING_WIDGETS_CHANGE));
}
