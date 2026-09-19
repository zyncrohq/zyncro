/**
 * @zyncro/embed — URL Builder
 * Safely normalizes, validates, and builds embed iframe URLs with prefill & theme parameters.
 */

import { BaseEmbedOptions, EmbedTheme } from "../types";

export const DEFAULT_ORIGIN = "https://zyncro.in";

let globalDefaultOrigin = DEFAULT_ORIGIN;
let globalDefaultTheme: EmbedTheme | undefined = undefined;
let globalDefaultColor: string | undefined = undefined;

const RESERVED_PARAMS = new Set([
  "embed",
  "theme",
  "primaryColor",
  "name",
  "email",
  "guestPhone",
  "phone",
  "notes",
  "date",
  "origin",
]);

export function setGlobalOrigin(origin: string): void {
  if (origin && typeof origin === "string") {
    try {
      const u = new URL(origin);
      if (isOriginSafe(u)) {
        globalDefaultOrigin = u.origin;
        return;
      }
    } catch {}
    console.warn(`[Zyncro Embed] Insecure or invalid origin rejected: '${origin}'. Production embeds require HTTPS. Using default '${DEFAULT_ORIGIN}'`);
  }
}

export function getGlobalOrigin(): string {
  return globalDefaultOrigin;
}

export function setGlobalTheme(theme?: EmbedTheme): void {
  globalDefaultTheme = theme;
}

export function getGlobalTheme(): EmbedTheme | undefined {
  return globalDefaultTheme;
}

export function setGlobalColor(color?: string): void {
  globalDefaultColor = color;
}

export function getGlobalColor(): string | undefined {
  return globalDefaultColor;
}

export function resetGlobalOrigin(): void {
  globalDefaultOrigin = DEFAULT_ORIGIN;
  globalDefaultTheme = undefined;
  globalDefaultColor = undefined;
}


/**
 * Normalizes input URL and creates a safe embed URL pointing to Zyncro with ?embed=1.
 */
export function buildEmbedUrl(rawUrl: string, options: Partial<BaseEmbedOptions> = {}): string | null {
  const input = String(rawUrl || "").trim();
  if (!input) return null;

  // Security: block dangerous protocols like javascript:, data:, vbscript:, file:, blob:
  if (/^(javascript|data|vbscript|file|blob):/i.test(input)) {
    console.warn(`[Zyncro Embed] Blocked unsafe URL protocol: '${input}'`);
    return null;
  }

  const targetOrigin = options.origin ? sanitizeOrigin(options.origin) : globalDefaultOrigin;

  try {
    let pathAndQuery: string;

    if (/^https?:\/\//i.test(input)) {
      const parsed = new URL(input);
      // Strip foreign host, retain path & query
      pathAndQuery = parsed.pathname + parsed.search;
    } else if (input.startsWith("//")) {
      const withoutSlashes = input.replace(/^\/+/, "");
      if (withoutSlashes.includes("/") && withoutSlashes.split("/")[0].includes(".")) {
        pathAndQuery = "/" + withoutSlashes.split("/").slice(1).join("/");
      } else {
        pathAndQuery = "/" + withoutSlashes;
      }
    } else {
      let sanitized = input.replace(/^\/+/, "");
      // If user typed "zyncro.in/prem/30min", strip leading domain part
      if (sanitized.includes("/") && sanitized.split("/")[0].includes(".")) {
        sanitized = sanitized.split("/").slice(1).join("/");
      }
      pathAndQuery = "/" + sanitized;
    }

    // Strip hash fragment from base path
    const hashIdx = pathAndQuery.indexOf("#");
    if (hashIdx > -1) {
      pathAndQuery = pathAndQuery.slice(0, hashIdx);
    }

    const finalUrl = new URL(pathAndQuery, targetOrigin);

    // 1. Enforce embedding mode for middleware.ts CSP & header relaxation
    finalUrl.searchParams.set("embed", "1");

    // 2. Strict Theme Validation ('light' | 'dark' only)
    const effectiveTheme = options.theme || globalDefaultTheme;
    if (effectiveTheme === "light" || effectiveTheme === "dark") {
      finalUrl.searchParams.set("theme", effectiveTheme);
    }

    // 3. Brand color (hex only: #fff, #7c3aed, #7c3aedff)
    const effectiveColor = options.color || globalDefaultColor;
    if (effectiveColor && /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(effectiveColor)) {
      finalUrl.searchParams.set("primaryColor", effectiveColor);
    }

    // 4. Prefill data with reserved parameter protection
    if (options.prefill && typeof options.prefill === "object") {
      const { name, email, phone, notes, date, ...customFields } = options.prefill;

      if (name) finalUrl.searchParams.set("name", String(name).trim());
      if (email) finalUrl.searchParams.set("email", String(email).trim());
      if (phone) finalUrl.searchParams.set("guestPhone", String(phone).trim());
      if (notes) finalUrl.searchParams.set("notes", String(notes));
      if (date) finalUrl.searchParams.set("date", String(date).trim());

      // Append custom question answers without colliding with reserved params
      for (const [key, val] of Object.entries(customFields)) {
        if (val !== undefined && val !== null && !RESERVED_PARAMS.has(key)) {
          finalUrl.searchParams.set(key, String(val));
        }
      }
    }

    return finalUrl.toString();
  } catch {
    return null;
  }
}

/**
 * Builds clean public URL without embed parameter (for fallback / open in new tab).
 */
export function buildCleanUrl(rawUrl: string, options: Partial<BaseEmbedOptions> = {}): string {
  const embedUrl = buildEmbedUrl(rawUrl, options);
  if (!embedUrl) return DEFAULT_ORIGIN;
  try {
    const u = new URL(embedUrl);
    u.searchParams.delete("embed");
    return u.toString();
  } catch {
    return DEFAULT_ORIGIN;
  }
}

function isOriginSafe(u: URL): boolean {
  if (u.protocol === "https:") return true;
  if (
    u.protocol === "http:" &&
    (u.hostname === "localhost" || u.hostname === "127.0.0.1" || u.hostname === "[::1]")
  ) {
    return true;
  }
  return false;
}

function sanitizeOrigin(raw: string): string {
  try {
    const u = new URL(raw);
    if (isOriginSafe(u)) {
      return u.origin;
    }
  } catch {}
  return globalDefaultOrigin;
}


