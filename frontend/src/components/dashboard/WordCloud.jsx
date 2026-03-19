import React, { useMemo } from "react";

const WORDS = [
  { text: "Python",           fontSize: "1.6rem",  bg: "#1D4ED8", color: "#BFDBFE", px: "1.4rem", py: "0.6rem" },
  { text: "React",            fontSize: "1.5rem",  bg: "#065F46", color: "#6EE7B7", px: "1.4rem", py: "0.6rem" },
  { text: "JavaScript",       fontSize: "1.4rem",  bg: "#92400E", color: "#FDE68A", px: "1.3rem", py: "0.55rem" },
  { text: "Flutter",          fontSize: "1.3rem",  bg: "#3730A3", color: "#C7D2FE", px: "1.3rem", py: "0.55rem" },
  { text: "Data Science",     fontSize: "1.2rem",  bg: "#831843", color: "#FBCFE8", px: "1.2rem", py: "0.5rem" },
  { text: "Machine Learning", fontSize: "1.15rem", bg: "#7C3AED", color: "#DDD6FE", px: "1.2rem", py: "0.5rem" },
  { text: "Node.js",          fontSize: "1.15rem", bg: "#14532D", color: "#86EFAC", px: "1.1rem",  py: "0.5rem" },
  { text: "Full Stack",       fontSize: "1.1rem",  bg: "#1E3A5F", color: "#93C5FD", px: "1.1rem",  py: "0.45rem" },
  { text: "DevOps",           fontSize: "1rem",    bg: "#7F1D1D", color: "#FCA5A5", px: "1rem",    py: "0.45rem" },
  { text: "UI/UX",            fontSize: "1rem",    bg: "#701A75", color: "#F0ABFC", px: "1rem",    py: "0.45rem" },
  { text: "Django",           fontSize: "0.95rem", bg: "#1C4532", color: "#6EE7B7", px: "1rem",    py: "0.4rem" },
  // { text: "AWS",              fontSize: "0.95rem", bg: "#78350F", color: "#FDE68A", px: "1rem",    py: "0.4rem" },
];

const WordCloud = () => {
  const shuffled = useMemo(() => [...WORDS].sort(() => Math.random() - 0.5), []);

  return (
    <div className="px-15 flex flex-col items-start mt-10">
      <p className="font-bold text-2xl mb-4">Word Cloud</p>
      <div className="bg-[var(--bg-input)] w-full rounded-3xl p-10 flex flex-wrap items-center justify-center gap-4 min-h-[280px]">
        {shuffled.map((word) => (
          <span
            key={word.text}
            style={{
              fontSize: word.fontSize,
              background: word.bg,
              color: word.color,
              padding: `${word.py} ${word.px}`,
              borderRadius: "999px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
              cursor: "default",
              transition: "transform 0.25s cubic-bezier(.34,1.56,.64,1), filter 0.25s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.1) translateY(-2px)";
              e.currentTarget.style.filter = "brightness(1.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.filter = "brightness(1)";
            }}
          >
            {word.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordCloud;