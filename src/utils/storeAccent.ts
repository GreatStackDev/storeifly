import React from "react";

export interface AccentPreset {
    name: string;
    hex: string;
    description: string;
}

export const ACCENT_PRESETS: AccentPreset[] = [
    { name: "Emerald", hex: "#059669", description: "Fresh & Balanced" },
    { name: "Indigo", hex: "#4f46e5", description: "Modern & Tech" },
    { name: "Crimson", hex: "#e11d48", description: "Bold & Vibrant" },
    { name: "Amber", hex: "#d97706", description: "Warm & Artisanal" },
    { name: "Violet", hex: "#7c3aed", description: "Creative & Luxury" },
    { name: "Sky Blue", hex: "#0284c7", description: "Clean & Trustworthy" },
    { name: "Teal", hex: "#0d9488", description: "Deep Ocean" },
    { name: "Coral", hex: "#ea580c", description: "Energetic & Playful" },
    { name: "Obsidian", hex: "#171717", description: "Sleek Monochrome" },
];

export const DEFAULT_ACCENT_COLOR = "#059669";

/**
 * Parses a hex string to [r, g, b].
 */
export function hexToRgb(hexStr?: string): [number, number, number] {
    if (!hexStr) return [5, 150, 105];
    let cleaned = hexStr.replace("#", "").trim();
    if (cleaned.length === 3) {
        cleaned = cleaned.split("").map((c) => c + c).join("");
    }
    if (cleaned.length !== 6) return [5, 150, 105];

    const num = parseInt(cleaned, 16);
    if (isNaN(num)) return [5, 150, 105];

    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Calculates brightness to determine contrast text color.
 */
export function getContrastColor(hexStr?: string): "#ffffff" | "#0a0a0a" {
    const [r, g, b] = hexToRgb(hexStr);
    // YIQ formula
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 160 ? "#0a0a0a" : "#ffffff";
}

/**
 * Generates dynamic CSS variables for the store page based on merchant accent color.
 */
export function getStoreAccentStyles(accentHex?: string): React.CSSProperties {
    const hex = (accentHex && accentHex.startsWith("#") ? accentHex : DEFAULT_ACCENT_COLOR).trim();
    const [r, g, b] = hexToRgb(hex);

    // Darkened version for hover state (reduce RGB by ~15%)
    const hoverR = Math.max(0, Math.floor(r * 0.85));
    const hoverG = Math.max(0, Math.floor(g * 0.85));
    const hoverB = Math.max(0, Math.floor(b * 0.85));
    const hoverHex = `rgb(${hoverR}, ${hoverG}, ${hoverB})`;

    const contrastColor = getContrastColor(hex);

    return {
        "--store-accent": hex,
        "--store-accent-hover": hoverHex,
        "--store-accent-light": `rgba(${r}, ${g}, ${b}, 0.08)`,
        "--store-accent-medium": `rgba(${r}, ${g}, ${b}, 0.16)`,
        "--store-accent-border": `rgba(${r}, ${g}, ${b}, 0.28)`,
        "--store-accent-ring": `rgba(${r}, ${g}, ${b}, 0.25)`,
        "--store-accent-contrast": contrastColor,
    } as React.CSSProperties;
}
