import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const SRC_DIR = import.meta.dirname;
const TOKENS_FILE = join(SRC_DIR, "assets", "styles", "tokens.css");

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

const sourceFiles = listFiles(SRC_DIR).filter(
  (file) => /\.(vue|ts|css)$/.test(file) && file !== TOKENS_FILE && !file.endsWith(".test.ts"),
);

function parseTokens(): Map<string, string> {
  const css = readFileSync(TOKENS_FILE, "utf8");
  const tokens = new Map<string, string>();
  for (const match of css.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) {
    const [, name, value] = match;
    if (name && value) {
      tokens.set(name, value.trim());
    }
  }
  return tokens;
}

function resolveColor(tokens: Map<string, string>, name: string): string {
  const value = tokens.get(name);
  if (!value) {
    throw new Error(`Token inconnu : --${name}`);
  }
  const reference = /^var\(--([a-z0-9-]+)\)$/.exec(value);
  return reference?.[1] ? resolveColor(tokens, reference[1]) : value;
}

function luminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [1, 3, 5]
    .map((index) => parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
}

describe("tokens de design", () => {
  it("réserve les couleurs de protection des mineurs au fichier de tokens", () => {
    const minorColors = ["#5c4ab7", "#efecfa", "#d3cbf0", "#4a3d96"];

    const offenders = sourceFiles.filter((file) => {
      const content = readFileSync(file, "utf8").toLowerCase();
      return minorColors.some((color) => content.includes(color));
    });

    expect(offenders).toEqual([]);
  });

  it("n'utilise aucune couleur brute hors du fichier de tokens", () => {
    const offenders = sourceFiles.filter((file) =>
      /#(?:[0-9a-f]{6}|[0-9a-f]{3})\b/i.test(readFileSync(file, "utf8")),
    );

    expect(offenders).toEqual([]);
  });

  it.each([
    ["color-ink", "color-paper"],
    ["color-ink-soft", "color-paper"],
    ["color-orange-dark", "color-paper"],
    ["color-on-orange", "color-orange"],
    ["color-on-dark", "color-navy"],
    ["color-on-dark-soft", "color-navy"],
    ["color-ok", "color-ok-bg"],
    ["color-warn", "color-warn-bg"],
    ["color-refuse", "color-refuse-bg"],
    ["color-minor", "color-minor-bg"],
    ["color-minor-text", "color-minor-bg"],
  ])("respecte le contraste WCAG AA (4,5:1) pour %s sur %s", (foreground, background) => {
    const tokens = parseTokens();

    const ratio = contrast(resolveColor(tokens, foreground), resolveColor(tokens, background));

    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
