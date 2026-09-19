var U="zyncro-embed-styles";function z(){if(typeof document>"u"||document.getElementById(U))return;let n=`
/* \u2500\u2500 Design Tokens \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
:root {
  --zyncro-font: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --zyncro-primary: #7c3aed;
  --zyncro-primary-hover: #6d28d9;
  --zyncro-primary-glow: rgba(124, 58, 237, 0.45);
  --zyncro-primary-gradient: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
  --zyncro-radius: 16px;
}

/* \u2500\u2500 Modal Overlay \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Modal Dialog Panel (Deep Space Dark by default) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Light Mode Modal Override \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Close Button \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Modal Body & Iframe Container \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Inline Embed Container \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Zyncro Loading Spinner \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Floating Action Launcher Button (FAB) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Success State Screen \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

/* \u2500\u2500 Mobile Responsiveness \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
  `.trim(),e=document.createElement("style");e.id=U,e.textContent=n,(document.head||document.documentElement).appendChild(e)}var S="https://zyncro.in",Z=S,K,_,Q=new Set(["embed","theme","primaryColor","name","email","guestPhone","phone","notes","date","origin"]);function C(n){if(n&&typeof n=="string"){try{let e=new URL(n);if(D(e)){Z=e.origin;return}}catch{}console.warn(`[Zyncro Embed] Insecure or invalid origin rejected: '${n}'. Production embeds require HTTPS. Using default '${S}'`)}}function w(){return Z}function j(n){K=n}function q(n){_=n}function g(n,e={}){let t=String(n||"").trim();if(!t)return null;if(/^(javascript|data|vbscript|file|blob):/i.test(t))return console.warn(`[Zyncro Embed] Blocked unsafe URL protocol: '${t}'`),null;let a=e.origin?J(e.origin):Z;try{let r;if(/^https?:\/\//i.test(t)){let l=new URL(t);r=l.pathname+l.search}else if(t.startsWith("//")){let l=t.replace(/^\/+/,"");l.includes("/")&&l.split("/")[0].includes(".")?r="/"+l.split("/").slice(1).join("/"):r="/"+l}else{let l=t.replace(/^\/+/,"");l.includes("/")&&l.split("/")[0].includes(".")&&(l=l.split("/").slice(1).join("/")),r="/"+l}let o=r.indexOf("#");o>-1&&(r=r.slice(0,o));let i=new URL(r,a);i.searchParams.set("embed","1");let s=e.theme||K;(s==="light"||s==="dark")&&i.searchParams.set("theme",s);let d=e.color||_;if(d&&/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(d)&&i.searchParams.set("primaryColor",d),e.prefill&&typeof e.prefill=="object"){let{name:l,email:m,phone:p,notes:u,date:y,...b}=e.prefill;l&&i.searchParams.set("name",String(l).trim()),m&&i.searchParams.set("email",String(m).trim()),p&&i.searchParams.set("guestPhone",String(p).trim()),u&&i.searchParams.set("notes",String(u)),y&&i.searchParams.set("date",String(y).trim());for(let[h,v]of Object.entries(b))v!=null&&!Q.has(h)&&i.searchParams.set(h,String(v))}return i.toString()}catch{return null}}function O(n,e={}){let t=g(n,e);if(!t)return S;try{let a=new URL(t);return a.searchParams.delete("embed"),a.toString()}catch{return S}}function D(n){return n.protocol==="https:"||n.protocol==="http:"&&(n.hostname==="localhost"||n.hostname==="127.0.0.1"||n.hostname==="[::1]")}function J(n){try{let e=new URL(n);if(D(e))return e.origin}catch{}return Z}var I=class{constructor(){this.listeners=new Map;this.iframeRegistry=[];this.isListening=!1;this.initGlobalListener()}initGlobalListener(){typeof window>"u"||this.isListening||(this.isListening=!0,window.addEventListener("message",e=>{this.handleIncomingMessage(e)}))}handleIncomingMessage(e){let t=w();if(e.origin!==t)return;let a=this.iframeRegistry.find(o=>o.iframe&&o.iframe.contentWindow===e.source);if(!a)return;let r=e.data;if(r){if(r.type==="zyncro:resize"&&typeof r.height=="number"){let o=Math.min(3200,Math.max(280,r.height));if(a.iframe.style.height=`${o}px`,a.onResize)try{a.onResize(o)}catch(i){console.error("[Zyncro Embed] Error in onResize callback:",i)}this.emit("resize",{type:"zyncro:resize",height:o});return}if(r==="zyncro:booking-confirmed"||typeof r=="object"&&r!==null&&(r.type==="zyncro:booking-confirmed"||r.type==="zyncro:bookingSuccessful")){let o=typeof r=="object"&&r!==null&&typeof r.data=="object"&&r.data!==null?r.data:{},i={type:"zyncro:bookingSuccessful",data:{bookingId:typeof o.bookingId=="string"?o.bookingId:"",bookingRef:typeof o.bookingRef=="string"?o.bookingRef:void 0,eventTitle:typeof o.eventTitle=="string"?o.eventTitle:void 0,guestName:typeof o.guestName=="string"?o.guestName:void 0,date:typeof o.date=="string"?o.date:void 0,time:typeof o.time=="string"?o.time:void 0,duration:typeof o.duration=="number"?o.duration:void 0,meetLink:typeof o.meetLink=="string"?o.meetLink:void 0,locationType:typeof o.locationType=="string"?o.locationType:void 0,provider:typeof o.provider=="string"?o.provider:void 0}};if(a.onBookingSuccessful)try{a.onBookingSuccessful(i)}catch(s){console.error("[Zyncro Embed] Error in onBookingSuccessful callback:",s)}this.emit("bookingSuccessful",i);return}if(typeof r=="object"&&r!==null&&r.type==="zyncro:bookingRescheduled"){let o=typeof r.data=="object"&&r.data!==null?r.data:{},i={type:"zyncro:bookingRescheduled",data:{bookingId:typeof o.bookingId=="string"?o.bookingId:"",newStart:typeof o.newStart=="string"?o.newStart:void 0}};this.emit("bookingRescheduled",i);return}if(typeof r=="object"&&r!==null&&r.type==="zyncro:bookingCancelled"){let o=typeof r.data=="object"&&r.data!==null?r.data:{},i={type:"zyncro:bookingCancelled",data:{bookingId:typeof o.bookingId=="string"?o.bookingId:"",refundStatus:typeof o.refundStatus=="string"?o.refundStatus:void 0}};this.emit("bookingCancelled",i);return}}}registerIframe(e){this.iframeRegistry.push(e)}unregisterIframe(e){this.iframeRegistry=this.iframeRegistry.filter(t=>t.iframe!==e)}on(e,t){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t)}once(e,t){let a=r=>{this.off(e,a),t(r)};this.on(e,a)}off(e,t){let a=this.listeners.get(e);a&&a.delete(t)}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}emit(e,t){let a=this.listeners.get(e);if(a)for(let r of Array.from(a))try{r(t)}catch(o){console.error(`[Zyncro Embed] Error in event listener for '${e}':`,o)}}},f=new I;function H(n,e="Zyncro Booking Calendar"){let t=document.createElement("iframe");return t.src=n,t.title=e,t.loading="lazy",t.className="zyncro-iframe",t.setAttribute("frameborder","0"),t.setAttribute("allow","payment; clipboard-write"),t.setAttribute("role","region"),t.setAttribute("aria-label",e),t}function N(n){let e=document.createElement("div");e.className="zyncro-loader-container",e.innerHTML=`
    <div class="zyncro-spinner" aria-hidden="true"></div>
    <span>Loading calendar\u2026</span>
  `;let t=null;return n&&(t=setTimeout(()=>{if(e.parentNode){let r=document.createElement("a");r.href=n,r.target="_blank",r.rel="noopener noreferrer",r.textContent="Taking longer than usual? Open in new tab \u2197",r.style.cssText="font-size:12px;color:var(--zyncro-primary, #7c3aed);text-decoration:underline;margin-top:8px;pointer-events:auto;",e.appendChild(r)}},8e3)),{element:e,clearFallbackTimer:()=>{t&&(clearTimeout(t),t=null)}}}function L(n,e){if(z(),!n)return console.warn("[Zyncro Embed] Zyncro.inline(): Target container element or selector is required."),null;let t=typeof n=="string"?document.querySelector(n):n;if(!t)return console.warn(`[Zyncro Embed] Target container '${n}' not found in the DOM.`),null;if(!e)return console.warn("[Zyncro Embed] Zyncro.inline(): Options object with a booking 'url' is required."),null;let a=typeof e=="string"?{url:e}:e;if(!a.url)return console.warn("[Zyncro Embed] Zyncro.inline(): A valid 'url' (e.g. 'prem/30min' or 'https://zyncro.in/prem/30min') is required."),null;let r=g(a.url,a),o=O(a.url,a);if(!r)return console.warn("[Zyncro Embed] Could not construct a valid embed URL from:",a.url),null;A(t);let i=document.createElement("div");i.className="zyncro-inline-wrapper",a.minHeight&&(i.style.minHeight=`${a.minHeight}px`);let s=N(o),d=H(r);return i.appendChild(s.element),i.appendChild(d),t.appendChild(i),d.addEventListener("load",()=>{s.clearFallbackTimer(),s.element.style.opacity="0",setTimeout(()=>{s.element.parentNode&&s.element.parentNode.removeChild(s.element)},250)}),f.registerIframe({iframe:d,onBookingSuccessful:a.onBookingSuccessful,onResize:a.onResize}),t.__zyncroUnmount=()=>A(t),t}function A(n){if(typeof document>"u")return!1;let e=typeof n=="string"?document.querySelector(n):n;if(!e)return!1;let t=e.querySelector(":scope > .zyncro-inline-wrapper");if(t){let a=t.querySelector("iframe");return a&&f.unregisterIframe(a),t.remove(),delete e.__zyncroUnmount,!0}return!1}var E=null;function G(){return E!==null}function k(n){if(z(),E)return;if(!n){console.warn("[Zyncro Embed] Zyncro.popup(): Options object with a booking 'url' is required.");return}let e=typeof n=="string"?{url:n}:n;if(!e.url){console.warn("[Zyncro Embed] Zyncro.popup(): A valid 'url' (e.g. 'prem/30min' or 'https://zyncro.in/prem/30min') is required.");return}let t=g(e.url,e),a=O(e.url,e);if(!t){console.warn("[Zyncro Embed] Invalid booking URL provided for modal:",e.url);return}let r=document.activeElement,o=document.body.style.overflow;document.body.style.overflow="hidden";let i=document.createElement("div");i.className="zyncro-modal-overlay",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Zyncro Booking Calendar");let d=`zyncro-theme-${e.theme||"auto"}`,l=document.createElement("div");l.className=`zyncro-modal-panel ${d}`,e.color&&/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(e.color)&&(l.style.setProperty("--zyncro-primary",e.color),l.style.setProperty("--zyncro-primary-glow",`${e.color}55`));let m=document.createElement("button");m.type="button",m.className="zyncro-modal-close",m.setAttribute("aria-label","Close modal"),m.innerHTML=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;let p=document.createElement("div");p.className="zyncro-modal-body";let u=N(a),y=H(t,"Zyncro Booking Modal");p.appendChild(u.element),p.appendChild(y),l.appendChild(m),l.appendChild(p),i.appendChild(l),document.body.appendChild(i),E=i,requestAnimationFrame(()=>{i.classList.add("zyncro-visible"),m.focus()}),y.addEventListener("load",()=>{u.clearFallbackTimer(),u.element.style.opacity="0",setTimeout(()=>{u.element.parentNode&&u.element.parentNode.removeChild(u.element)},250)});let b=!1,h=()=>{if(!b){if(b=!0,u.clearFallbackTimer(),i.classList.remove("zyncro-visible"),document.body.style.overflow=o,document.removeEventListener("keydown",v,!0),i.removeEventListener("touchmove",R),f.unregisterIframe(y),f.emit("modalClose",{type:"zyncro:modalClose"}),e.onClose)try{e.onClose()}catch(c){console.error("[Zyncro Embed] Error in onClose callback:",c)}setTimeout(()=>{if(i.parentNode&&i.parentNode.removeChild(i),E=null,r&&typeof r.focus=="function")try{r.focus()}catch{}},280)}},v=c=>{if(c.key==="Escape"){c.stopPropagation(),h();return}if(c.key==="Tab"){let x=l.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(x.length===0)return;let F=x[0],P=x[x.length-1];c.shiftKey&&document.activeElement===F?(P.focus(),c.preventDefault()):!c.shiftKey&&document.activeElement===P&&(F.focus(),c.preventDefault())}},R=c=>{c.target===i&&c.preventDefault()};m.addEventListener("click",h),i.addEventListener("click",c=>{c.target===i&&h()}),i.addEventListener("touchmove",R,{passive:!1}),document.addEventListener("keydown",v,!0),f.registerIframe({iframe:y,onBookingSuccessful:c=>{if(e.onBookingSuccessful)try{e.onBookingSuccessful(c)}catch(x){console.error("[Zyncro Embed] Error in onBookingSuccessful callback:",x)}p.innerHTML=`
        <div class="zyncro-success-box">
          <div class="zyncro-success-icon">\u2728</div>
          <div class="zyncro-success-title">Booking Confirmed!</div>
          <div class="zyncro-success-desc">A calendar invitation with meeting details has been sent to your email.</div>
        </div>
      `,setTimeout(h,2400)}}),f.emit("modalOpen",{type:"zyncro:modalOpen"})}function $(){if(E){let n=E.querySelector(".zyncro-modal-close");n&&n.click()}}var Y="zyncro-floating-launcher";function B(n){if(typeof document>"u"||!document.body)return null;z();let e=document.getElementById(Y);e&&e.parentNode&&e.parentNode.removeChild(e);let t=typeof n=="string"?{url:n}:n;if(!g(t.url,t))return console.warn("[Zyncro Embed] Invalid URL for floating button:",t.url),null;let r=document.createElement("button");return r.id=Y,r.type="button",r.className=`zyncro-floating-btn zyncro-pos-${t.position==="bottom-left"?"left":"right"}`,r.setAttribute("aria-label",t.text||"Book a call with Zyncro"),t.color&&/^#[0-9a-fA-F]{3,8}$/.test(t.color)&&(r.style.backgroundColor=t.color,r.style.boxShadow=`0 10px 25px -4px ${t.color}66, 0 4px 6px -2px rgba(0, 0, 0, 0.2)`),r.innerHTML=`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
    <span>${t.text||"Book a call"}</span>
  `,r.addEventListener("click",()=>{k(t)}),document.body.appendChild(r),r}function T(n){let e=n.getAttribute("data-zyncro-url")||n.getAttribute("data-zyncro-inline")||n.getAttribute("data-zyncro-modal")||n.getAttribute("data-zyncro-popup")||n.getAttribute("data-zyncro-float")||n.getAttribute("href")||"",t=n.getAttribute("data-zyncro-theme")||void 0,a=n.getAttribute("data-zyncro-color")||void 0,r=n.getAttribute("data-zyncro-origin")||void 0,o=n.getAttribute("data-zyncro-text")||n.textContent?.trim()||void 0,i={},s=n.getAttribute("data-zyncro-name"),d=n.getAttribute("data-zyncro-email"),l=n.getAttribute("data-zyncro-phone")||n.getAttribute("data-zyncro-guest-phone"),m=n.getAttribute("data-zyncro-notes"),p=n.getAttribute("data-zyncro-date");if(s&&(i.name=s),d&&(i.email=d),l&&(i.phone=l),m&&(i.notes=m),p&&(i.date=p),n.attributes)for(let u=0;u<n.attributes.length;u++){let y=n.attributes[u];if(y.name.startsWith("data-zyncro-prefill-")){let b=y.name.slice(20);b&&!i[b]&&(i[b]=y.value)}}return{url:e,theme:t,color:a,origin:r,text:o,prefill:Object.keys(i).length>0?i:void 0}}function M(n){if(typeof document>"u")return;let e=n||document;if(e.querySelectorAll("[data-zyncro-inline]").forEach(o=>{let i=T(o);i.url&&(o.__zyncroMounted||(o.__zyncroMounted=!0,L(o,i)))}),e!==document&&e.hasAttribute&&e.hasAttribute("data-zyncro-inline")){let o=e,i=T(o);i.url&&!o.__zyncroMounted&&(o.__zyncroMounted=!0,L(o,i))}e.querySelectorAll("[data-zyncro-modal], [data-zyncro-popup]").forEach(o=>{T(o).url&&(o.__zyncroBound||(o.__zyncroBound=!0,o.style.cursor="pointer",o.addEventListener("click",s=>{s.preventDefault();let d=T(o);d.url&&k(d)})))}),e.querySelectorAll("[data-zyncro-float]").forEach(o=>{let i=T(o);i.url&&(o.__zyncroMounted||(o.__zyncroMounted=!0,B(i)))})}function W(){if(typeof document>"u")return;let n=()=>{M(document)};if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n(),typeof MutationObserver<"u"){let e=null,t=[];new MutationObserver(r=>{for(let o of r)if(o.type==="childList")for(let i=0;i<o.addedNodes.length;i++){let s=o.addedNodes[i];s.nodeType===1&&t.push(s)}t.length>0&&e===null&&(e=requestAnimationFrame(()=>{let o=t.splice(0,t.length);for(let i of o)M(i);e=null}))}).observe(document.body||document.documentElement,{childList:!0,subtree:!0})}}var X="1.0.0",V={version:X,init(n){n?.origin&&C(n.origin),n?.theme&&j(n.theme),n?.color&&q(n.color),M()},inline(n,e){return n?e?L(n,e):(console.warn("[Zyncro Embed] Zyncro.inline(): Options object with a booking 'url' is required."),null):(console.warn("[Zyncro Embed] Zyncro.inline(): Target container element or selector is required."),null)},unmount(n){return A(n)},popup(n){if(!n){console.warn("[Zyncro Embed] Zyncro.popup(): Options object with a booking 'url' is required.");return}k(n)},modal(n){this.popup(n)},close(){$()},isModalOpen(){return G()},floating(n){return n?B(n):(console.warn("[Zyncro Embed] Zyncro.floating(): Options object with a booking 'url' is required."),null)},preload(n){if(!(typeof document>"u"||!n))try{let e=w();if(!document.querySelector(`link[rel="preconnect"][href="${e}"]`)){let a=document.createElement("link");a.rel="preconnect",a.href=e,document.head.appendChild(a);let r=document.createElement("link");r.rel="dns-prefetch",r.href=e,document.head.appendChild(r)}let t=g(n);if(!t)return;if(!document.querySelector(`link[rel="prefetch"][href="${t}"]`)){let a=document.createElement("link");a.rel="prefetch",a.href=t,a.as="document",document.head.appendChild(a)}}catch{}},scan(n){M(n)},getOrigin(){return w()},setOrigin(n){C(n)},on(n,e){f.on(n,e)},once(n,e){f.once(n,e)},off(n,e){f.off(n,e)}};typeof window<"u"&&(window.Zyncro=window.Zyncro||V,W());var Ze=V;export{V as Zyncro,$ as closeModal,Ze as default,w as getGlobalOrigin,G as isModalOpen,B as mountFloatingButton,L as mountInline,k as openModal,C as setGlobalOrigin,A as unmountInline};
