"use client";

import React from "react";
import Link from "next/link";
import styles from "./StepIndicator.module.css";

export type OnboardingStep = {
  id: string;
  name: string;
  href: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  { id: "plan", name: "1. Choose Plan", href: "/onboarding/plan" },
  { id: "agent", name: "2. Create Agent", href: "/onboarding/agent" },
  { id: "knowledge", name: "3. Knowledge", href: "/onboarding/knowledge" },
  { id: "test", name: "4. Sandbox Test", href: "/onboarding/test" },
  { id: "publish", name: "5. Publish", href: "/onboarding/publish" },
  { id: "payment", name: "6. Payment", href: "/onboarding/payment" },
  { id: "live", name: "7. Go Live", href: "/onboarding/live" },
];

export interface StepIndicatorProps {
  currentStepIndex: number; // 0 to 6
  completedIndices?: number[];
}

export function StepIndicator({
  currentStepIndex,
  completedIndices = [],
}: StepIndicatorProps) {
  return (
    <nav className={styles.wrapper} aria-label="Onboarding Progress">
      {ONBOARDING_STEPS.map((step, idx) => {
        const isCurrent = idx === currentStepIndex;
        const isDone = completedIndices.includes(idx) || idx < currentStepIndex;

        return (
          <React.Fragment key={step.id}>
            <Link href={step.href} className={styles.stepItem}>
              <div
                className={[
                  styles.circle,
                  isCurrent ? styles.circleActive : "",
                  isDone && !isCurrent ? styles.circleDone : "",
                ].join(" ")}
              >
                {isDone && !isCurrent ? (
                  <span className="material-symbols-outlined text-sm">
                    check
                  </span>
                ) : (
                  idx + 1
                )}
              </div>
              <div className={styles.labelWrap}>
                <span className={styles.stepNum}>Step {idx + 1}</span>
                <span
                  className={[
                    styles.stepName,
                    isCurrent ? styles.stepNameActive : "",
                  ].join(" ")}
                >
                  {step.name.replace(/^\d+\.\s*/, "")}
                </span>
              </div>
            </Link>
            {idx < ONBOARDING_STEPS.length - 1 ? (
              <div className={styles.divider} aria-hidden="true" />
            ) : null}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
