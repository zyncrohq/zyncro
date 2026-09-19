"use strict";
/**
 * @zyncro/embed — URL Builder
 * Safely normalizes, validates, and builds embed iframe URLs with prefill & theme parameters.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ORIGIN = void 0;
exports.setGlobalOrigin = setGlobalOrigin;
exports.getGlobalOrigin = getGlobalOrigin;
exports.buildEmbedUrl = buildEmbedUrl;
exports.DEFAULT_ORIGIN = "https://zyncro.in";
let globalDefaultOrigin = exports.DEFAULT_ORIGIN;
function setGlobalOrigin(origin) {
    if (origin && typeof origin === "string") {
        try {
            const u = new URL(origin);
            globalDefaultOrigin = u.origin;
        }
        catch {
            // Invalid origin, keep current default
        }
    }
}
function getGlobalOrigin() {
    return globalDefaultOrigin;
}
/**
 * Normalizes input URL and creates a safe embed URL pointing to Zyncro.
 */
function buildEmbedUrl(rawUrl, options = {}) {
    const input = String(rawUrl || "").trim();
    if (!input)
        return null;
    const targetOrigin = options.origin ? sanitizeOrigin(options.origin) : globalDefaultOrigin;
    try {
        let pathAndQuery;
        if (/^https?:\/\//i.test(input)) {
            const parsed = new URL(input);
            // Strip foreign malicious host, retain path & search params
            pathAndQuery = parsed.pathname + parsed.search;
        }
        else {
            let sanitized = input.replace(/^\/+/, "");
            // If user typed "zyncro.in/prem/30min", strip domain part
            if (sanitized.includes("/") && sanitized.split("/")[0].includes(".")) {
                sanitized = sanitized.split("/").slice(1).join("/");
            }
            pathAndQuery = "/" + sanitized;
        }
        const finalUrl = new URL(pathAndQuery, targetOrigin);
        // Enforce embedding mode for middleware.ts CSP & header relaxation
        finalUrl.searchParams.set("embed", "1");
        // Theme (light / dark)
        if (options.theme && options.theme !== "auto") {
            finalUrl.searchParams.set("theme", options.theme);
        }
        // Brand color (hex)
        if (options.color && /^#[0-9a-fA-F]{3,8}$/.test(options.color)) {
            finalUrl.searchParams.set("primaryColor", options.color);
        }
        // Prefill data
        if (options.prefill && typeof options.prefill === "object") {
            const { name, email, phone, notes, date, ...rest } = options.prefill;
            if (name)
                finalUrl.searchParams.set("name", String(name));
            if (email)
                finalUrl.searchParams.set("email", String(email));
            if (phone)
                finalUrl.searchParams.set("guestPhone", String(phone));
            if (notes)
                finalUrl.searchParams.set("notes", String(notes));
            if (date)
                finalUrl.searchParams.set("date", String(date));
            // Append any custom question fields
            for (const [key, val] of Object.entries(rest)) {
                if (val !== undefined && val !== null) {
                    finalUrl.searchParams.set(key, String(val));
                }
            }
        }
        return finalUrl.toString();
    }
    catch {
        return null;
    }
}
function sanitizeOrigin(raw) {
    try {
        return new URL(raw).origin;
    }
    catch {
        return globalDefaultOrigin;
    }
}
