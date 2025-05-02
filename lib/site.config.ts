/* eslint-disable @typescript-eslint/no-explicit-any */
/* biome-disable-file */
/* biome-disable lint/suspicious/noExplicitAny */
// @ts-ignore: module resolution for example config
import { siteConfig as defaultConfig } from "./site.config.example"
import { siteConfig as localConfig } from "./site.config.local"

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

function deepMerge<T>(defaults: T, override: DeepPartial<T>): T {
  const result = { ...defaults } as any
  for (const key in override) {
    const overrideValue = override[key]
    const defaultValue = (defaults as any)[key]
    // skip undefined, null, or empty-string overrides so defaults stay in place
    if (overrideValue === undefined || overrideValue === null || overrideValue === "") continue
    if (
      overrideValue && typeof overrideValue === "object" && !Array.isArray(overrideValue) &&
      defaultValue && typeof defaultValue === "object" && !Array.isArray(defaultValue)
    ) {
      result[key] = deepMerge(defaultValue, overrideValue as any)
    } else {
      result[key] = overrideValue
    }
  }
  return result as T
}

export const siteConfig = deepMerge(defaultConfig, localConfig)
export type SiteConfig = typeof siteConfig 