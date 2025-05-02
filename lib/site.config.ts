/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import { siteConfig as defaultConfig } from "./site.config.example"
// Load local overrides if present (gitignored); fallback to empty object
let localConfig: Partial<typeof defaultConfig> = {}
try {
  // @ts-ignore: optional local config
  localConfig = require("./site.config.local").siteConfig
} catch {
  // no local config found, proceed with defaults
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

function deepMerge<T>(defaults: T, override: DeepPartial<T>): T {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const result = { ...defaults } as any
  for (const key in override) {
    const overrideValue = override[key]
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const defaultValue = (defaults as any)[key]
    // skip undefined, null, or empty-string overrides so defaults stay in place
    if (overrideValue === undefined || overrideValue === null || overrideValue === "") continue
    if (
      overrideValue && typeof overrideValue === "object" && !Array.isArray(overrideValue) &&
      defaultValue && typeof defaultValue === "object" && !Array.isArray(defaultValue)
    ) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      result[key] = deepMerge(defaultValue, overrideValue as any)
    } else {
      result[key] = overrideValue
    }
  }
  return result as T
}

export const siteConfig = deepMerge(defaultConfig, localConfig)
export type SiteConfig = typeof siteConfig 