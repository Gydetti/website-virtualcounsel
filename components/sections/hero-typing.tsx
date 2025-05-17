"use client";
import type { heroSectionDataSchema } from "@/lib/schemas/sections.schema";
import { useEffect, useRef, useState } from "react";
import type { z } from "zod";

export type HeroTypingProps = {
  typingWords?: z.infer<typeof heroSectionDataSchema>["typingWords"];
};

export default function HeroTyping({ typingWords }: HeroTypingProps) {
  const typingRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    if (!typingWords || typingWords.length === 0) return;
    const handleTyping = () => {
      const current = loopNum % typingWords.length;
      const fullText = typingWords[current];
      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1),
      );
      setTypingSpeed(isDeleting ? 50 : 100);
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, typingWords]);

  return (
    <span className="block mt-2 md:mt-4 lg:mt-6 text-primary">
      <span className="inline-block min-h-[1.2em]" ref={typingRef}>
        {displayText}
        <span className="typing-cursor" />
      </span>
    </span>
  );
}
