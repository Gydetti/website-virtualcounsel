"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ConsentOptions = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

type CookieConsentStore = {
  consents: ConsentOptions
  isConsentGiven: boolean
  updateConsent: (consent: Partial<ConsentOptions>) => void
  acceptAll: () => void
  rejectAll: () => void
  resetConsent: () => void
}

export const useCookieConsentStore = create<CookieConsentStore>()(
  persist(
    (set) => ({
      consents: {
        necessary: true, // Always required
        analytics: false,
        marketing: false,
        preferences: false,
      },
      isConsentGiven: false,
      updateConsent: (consent) =>
        set((state) => ({
          consents: { ...state.consents, ...consent },
          isConsentGiven: true,
        })),
      acceptAll: () =>
        set({
          consents: {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
          },
          isConsentGiven: true,
        }),
      rejectAll: () =>
        set({
          consents: {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
          },
          isConsentGiven: true,
        }),
      resetConsent: () =>
        set({
          consents: {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
          },
          isConsentGiven: false,
        }),
    }),
    {
      name: "cookie-consent",
    },
  ),
)

export const useCookieConsent = useCookieConsentStore
