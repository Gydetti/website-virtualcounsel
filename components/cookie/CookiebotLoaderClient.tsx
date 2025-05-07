// Client-only wrapper to dynamically load CookiebotLoader
"use client";
import dynamic from "next/dynamic";

const CookiebotLoader = dynamic(() => import("./CookiebotLoader"), {
  ssr: false,
});

export default function CookiebotLoaderClient() {
  return <CookiebotLoader />;
}
