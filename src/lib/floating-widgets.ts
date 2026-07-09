export const MOBILE_NAV_QUERY = '(max-width: 1023px)';
export const FLOATING_BUTTON_SIZE = 56;
export const FLOATING_GAP = 12;
export const FLOATING_SIDE = 20;
export const DESKTOP_BOTTOM = 16;
export const CHAT_GAP = 12;

export const FLOATING_WIDGETS_CHANGE = 'floating-widgets-change';

export function getBrandPrimaryColor(): string {
  if (typeof window === 'undefined') return '#a78bfa';
  return (
    getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() ||
    '#a78bfa'
  );
}

export function getBottomNavHeight(): number {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;bottom:0;left:0;width:0;height:var(--bottom-nav-offset);visibility:hidden;pointer-events:none';
  document.body.appendChild(probe);
  const height = probe.offsetHeight;
  document.body.removeChild(probe);
  return height;
}

export function getFloatingBaseBottom(): number {
  const isMobile = window.matchMedia(MOBILE_NAV_QUERY).matches;
  if (!isMobile) return DESKTOP_BOTTOM;
  return getBottomNavHeight() + CHAT_GAP;
}

export function isBackToTopVisible(): boolean {
  return document.documentElement.dataset.backToTop === 'true';
}

export function getStackOffset(): number {
  return isBackToTopVisible() ? FLOATING_BUTTON_SIZE + FLOATING_GAP : 0;
}

export function getChatOffsetY(): number {
  return getFloatingBaseBottom() + getStackOffset();
}

export function getBackToTopBottom(): number {
  return getChatOffsetY() + FLOATING_BUTTON_SIZE + FLOATING_GAP;
}

export function notifyFloatingWidgetsChange() {
  window.dispatchEvent(new CustomEvent(FLOATING_WIDGETS_CHANGE));
}
