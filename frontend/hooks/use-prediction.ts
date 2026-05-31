import { useState, useCallback } from "react";
import { FEATURES, type FeatureId } from "@/lib/breast-cancer/features";
import type { KernelId, SVMPrediction } from "@/lib/breast-cancer/models";

export function useBackendPrediction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(
    async (kernelId: KernelId, values: number[]): Promise<SVMPrediction | null> => {
      setLoading(true);
      setError(null);

      const features = Object.fromEntries(
        FEATURES.map((f, i) => [f.id, values[i]])
      );

      try {
        const res = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: kernelId, kernel: kernelId, features }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Prediction failed");
          return null;
        }

        return {
          label: data.prediction.label,
          probability: data.prediction.probability_malignant,
          confidence: data.prediction.confidence,
          decision: data.prediction.decision,
        };
      } catch (err) {
        setError("Could not reach prediction server");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { predict, loading, error };
}
