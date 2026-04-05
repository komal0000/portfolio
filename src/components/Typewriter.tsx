"use client";

import { useEffect, useState } from "react";

interface Props {
  text: string;
  delayStart?: number;
}

export function Typewriter({ text, delayStart = 1800 }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let charIdx = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (charIdx >= text.length) {
          clearInterval(interval);
          setDone(true);
          return;
        }
        charIdx++;
        setDisplayed(text.slice(0, charIdx));
      }, 35);

      return () => clearInterval(interval);
    }, delayStart);

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
  }, [text, delayStart]);

  return (
    <div className="text-text-secondary text-lg md:text-xl font-body min-h-[64px]">
      {displayed}
      {!done && (
        <span
          className="inline-block w-0.5 h-5 bg-[#ff6b00] ml-0.5 align-middle"
          style={{
            opacity: cursorVisible ? 1 : 0,
            transition: "opacity 0.1s",
          }}
        />
      )}
    </div>
  );
}
