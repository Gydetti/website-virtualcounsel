"use client";
import { useEffect } from "react";

// Set to track all controllers for active fetches
const controllers = new Set<AbortController>();

export default function BfcacheSafety() {
  useEffect(() => {
    // Monkey-patch window.fetch to attach an AbortController
    const originalFetch = window.fetch;
    window.fetch = (input: RequestInfo, init?: RequestInit) => {
      const controller = new AbortController();
      controllers.add(controller);
      const fetchInit = { ...init, signal: controller.signal };
      const promise = originalFetch(input, fetchInit);
      promise.finally(() => {
        controllers.delete(controller);
      });
      return promise;
    };

    // Abort all in-flight fetches when page is hidden (bfcache triggers)
    const onPageHide = () => {
      for (const c of controllers) {
        c.abort();
      }
      controllers.clear();
    };
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("pagehide", onPageHide);
      // Restore original fetch
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}