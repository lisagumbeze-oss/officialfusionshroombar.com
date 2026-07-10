export const SMARTSUPP_CHAT_OPEN_CLASS = 'smartsupp-chat-open';

export function setSmartsuppChatOpen(isOpen: boolean) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle(SMARTSUPP_CHAT_OPEN_CLASS, isOpen);
  syncSmartsuppPointerEvents();
}

export function syncSmartsuppPointerEvents() {
  if (typeof document === 'undefined') return;

  const interactive = document.documentElement.classList.contains(SMARTSUPP_CHAT_OPEN_CLASS);

  document
    .querySelectorAll<HTMLElement>(
      'iframe[src*="smartsupp"], #smartsupp-widget-container, #smartsupp-widget, [class*="smartsupp-widget"]'
    )
    .forEach((node) => {
      if (node.dataset.chatHidden === 'true') return;
      node.style.setProperty('pointer-events', interactive ? 'auto' : 'none', 'important');
    });
}

export function registerSmartsuppChatListeners() {
  if (typeof window === 'undefined' || typeof window.smartsupp !== 'function') return;

  const close = () => setSmartsuppChatOpen(false);
  const open = () => setSmartsuppChatOpen(true);

  try {
    window.smartsupp('on', 'chat:opened', open);
    window.smartsupp('on', 'chat:closed', close);
    window.smartsupp('on', 'widget:closed', close);
  } catch {
    // Smartsupp event API may vary by version; CSS fallback still blocks stray clicks.
  }
}
