import React from "react";

const steps = [
  {
    number: "1",
    title: "Create Account or Login",
    description: "Sign up in seconds or log in to your existing account to access the full competitor analysis dashboard.",
  },
  {
    number: "2",
    title: "Monitor Competitors",
    description: "Select Nepal's top IT training providers to track — compare their course prices, curriculum, and market positioning in real time.",
  },
  {
    number: "3",
    title: "Analyze & Act",
    description: "Dive deep into gap analysis, pricing trends, and SWOT insights to make data-driven decisions for your institute.",
  },
];

const HowItWorks = () => {
  return (
    <div className="mt-20 md:mt-35 px-4 md:px-15">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--text-primary)]">How It Works</h2>
      <p className="text-center text-[var(--text-muted)] mt-2 text-sm md:text-base">Get started in three simple steps</p>

      <div className="flex flex-col md:flex-row gap-6 mt-10">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl w-full md:w-1/3 py-8 px-6 flex flex-col items-center text-center space-y-4 transition-colors duration-300"
          >
            <div className="h-14 w-14 bg-[#025E90] rounded-full flex justify-center items-center text-white text-xl font-bold shrink-0">
              {step.number}
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">{step.title}</h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;