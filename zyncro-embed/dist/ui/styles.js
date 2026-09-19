"use strict";
/**
 * @zyncro/embed — Injected UI Styles
 * Exact 1:1 design system and theme tokens matching Zyncro (https://zyncro.in).
 * Zero-runtime dependency, fully isolated, supports Dark / Light / Auto mode.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureStyles = ensureStyles;
const STYLE_ELEMENT_ID = "zyncro-embed-styles";
function ensureStyles() {
    if (typeof document === "undefined" || document.getElementById(STYLE_ELEMENT_ID)) {
        return;
    }
    const css = `
/* ── Design Tokens ────────────────────────────────────────────── */
:root {
  --zyncro-font: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --zyncro-primary: #7c3aed;
  --zyncro-primary-hover: #6d28d9;
  --zyncro-primary-glow: rgba(124, 58, 237, 0.45);
  --zyncro-primary-gradient: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
  --zyncro-radius: 16px;
}

/* ── Modal Overlay ─────────────────────────────────────────────── */
.zyncro-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0;
  visibility: hidden;
  font-family: var(--zyncro-font);
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.28s ease;
}

.zyncro-modal-overlay.zyncro-visible {
  opacity: 1;
  visibility: visible;
}

/* ── Modal Dialog Panel (Deep Space Dark by default) ──────────── */
.zyncro-modal-panel {
  position: relative;
  width: 100%;
  max-width: 980px;
  max-height: 92vh;
  border-radius: var(--zyncro-radius);
  background: #090d16;
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 25px 60px -15px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 0 40px -10px rgba(124, 58, 237, 0.15);
  overflow: hidden;
  transform: scale(0.96) translateY(10px);
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease;
  display: flex;
  flex-direction: column;
}

.zyncro-modal-overlay.zyncro-visible .zyncro-modal-panel {
  transform: scale(1) translateY(0);
}

/* Subtle top radial ambient glow */
.zyncro-modal-panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 140px;
  background: radial-gradient(ellipse at top, rgba(124, 58, 237, 0.12), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── Light Mode Modal Override ─────────────────────────────────── */
.zyncro-modal-panel.zyncro-theme-light {
  background: #ffffff;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  box-shadow: 
    0 25px 50px -12px rgba(15, 23, 42, 0.2),
    0 0 0 1px rgba(15, 23, 42, 0.05);
}
.zyncro-modal-panel.zyncro-theme-light::before {
  background: radial-gradient(ellipse at top, rgba(124, 58, 237, 0.06), transparent 70%);
}
.zyncro-modal-panel.zyncro-theme-light .zyncro-modal-close {
  background: rgba(15, 23, 42, 0.06);
  color: #334155;
}
.zyncro-modal-panel.zyncro-theme-light .zyncro-modal-close:hover {
  background: rgba(15, 23, 42, 0.12);
  color: #0f172a;
}
.zyncro-modal-panel.zyncro-theme-light .zyncro-loader-container {
  color: #64748b;
}

/* Auto Theme: fallback to OS light mode */
@media (prefers-color-scheme: light) {
  .zyncro-modal-panel.zyncro-theme-auto {
    background: #ffffff;
    color: #0f172a;
    border: 1px solid #e2e8f0;
    box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.2);
  }
  .zyncro-modal-panel.zyncro-theme-auto::before {
    background: radial-gradient(ellipse at top, rgba(124, 58, 237, 0.06), transparent 70%);
  }
  .zyncro-modal-panel.zyncro-theme-auto .zyncro-modal-close {
    background: rgba(15, 23, 42, 0.06);
    color: #334155;
  }
  .zyncro-modal-panel.zyncro-theme-auto .zyncro-modal-close:hover {
    background: rgba(15, 23, 42, 0.12);
    color: #0f172a;
  }
  .zyncro-modal-panel.zyncro-theme-auto .zyncro-loader-container {
    color: #64748b;
  }
}

/* ── Close Button ──────────────────────────────────────────────── */
.zyncro-modal-close {
  position: absolute;
  top: 14px;
  right: 16px;
  z-index: 10;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #f1f5f9;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
}

.zyncro-modal-close:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: scale(1.06);
}

.zyncro-modal-close:focus-visible {
  outline: 2px solid var(--zyncro-primary);
  outline-offset: 2px;
}

/* ── Modal Body & Iframe Container ─────────────────────────────── */
.zyncro-modal-body {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 600px;
  max-height: 88vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
}

/* ── Inline Embed Container ────────────────────────────────────── */
.zyncro-inline-wrapper {
  position: relative;
  width: 100%;
  min-height: 580px;
  border-radius: var(--zyncro-radius);
  overflow: hidden;
  background: transparent;
  font-family: var(--zyncro-font);
}

.zyncro-iframe {
  width: 100%;
  border: 0;
  background: transparent;
  display: block;
  min-height: 560px;
  color-scheme: normal;
  transition: height 0.2s ease;
}

/* ── Zyncro Loading Spinner ────────────────────────────────────── */
.zyncro-loader-container {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #94a3b8;
  font-family: var(--zyncro-font);
  font-size: 13px;
  font-weight: 500;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 2;
}

.zyncro-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(124, 58, 237, 0.15);
  border-top-color: var(--zyncro-primary);
  border-radius: 50%;
  animation: zyncro-spin 0.65s linear infinite;
}

@keyframes zyncro-spin {
  to { transform: rotate(360deg); }
}

/* ── Floating Action Launcher Button (FAB) ─────────────────────── */
.zyncro-floating-btn {
  position: fixed;
  bottom: 24px;
  z-index: 2147482000;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 22px;
  border: 0;
  border-radius: 9999px;
  background: var(--zyncro-primary-gradient);
  color: #ffffff;
  font-family: var(--zyncro-font);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  box-shadow: 
    0 10px 25px -4px var(--zyncro-primary-glow),
    0 4px 6px -2px rgba(0, 0, 0, 0.15);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, filter 0.22s ease;
}

.zyncro-floating-btn.zyncro-pos-right {
  right: 24px;
}

.zyncro-floating-btn.zyncro-pos-left {
  left: 24px;
}

.zyncro-floating-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0 14px 30px -4px var(--zyncro-primary-glow),
    0 6px 10px -2px rgba(0, 0, 0, 0.2);
  filter: brightness(1.05);
}

.zyncro-floating-btn:active {
  transform: translateY(0) scale(0.98);
}

.zyncro-floating-btn:focus-visible {
  outline: 2px solid var(--zyncro-primary);
  outline-offset: 3px;
}

.zyncro-floating-btn svg {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
}

/* ── Success State Screen ──────────────────────────────────────── */
.zyncro-success-box {
  padding: 64px 24px;
  text-align: center;
  color: inherit;
  font-family: var(--zyncro-font);
}

.zyncro-success-icon {
  font-size: 48px;
  margin-bottom: 16px;
  animation: zyncro-bounce 0.8s ease;
}

.zyncro-success-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.zyncro-success-desc {
  font-size: 14px;
  opacity: 0.7;
}

@keyframes zyncro-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* ── Mobile Responsiveness ─────────────────────────────────────── */
@media (max-width: 640px) {
  .zyncro-modal-overlay {
    padding: 0;
    align-items: flex-end;
  }
  .zyncro-modal-panel {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    max-height: 94vh;
  }
  .zyncro-floating-btn {
    bottom: 18px;
    padding: 12px 18px;
    font-size: 13px;
  }
  .zyncro-floating-btn.zyncro-pos-right {
    right: 18px;
  }
  .zyncro-floating-btn.zyncro-pos-left {
    left: 18px;
  }
}
  `.trim();
    const styleEl = document.createElement("style");
    styleEl.id = STYLE_ELEMENT_ID;
    styleEl.textContent = css;
    (document.head || document.documentElement).appendChild(styleEl);
}
