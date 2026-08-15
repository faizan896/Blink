export type SourceType = "url" | "pdf" | "image" | "text";

export interface BlinkResult {
  title: string;
  sourceType: SourceType;
  takeaway: string;
  keyPoints: { title: string; explanation: string; sourceReference?: string }[];
  importantNumbers?: { value: string; label: string; context?: string }[];
  whyItMatters?: string;
  entities?: { name: string; type: string }[];
  timeline?: { date: string; event: string }[];
  originalReadingMinutes?: number;
}

/** Reject malformed provider output before any of it reaches the reading view. */
export function parseBlinkResult(value: unknown): BlinkResult {
  if (!value || typeof value !== "object") throw new Error("Blink output must be an object");
  const result = value as Partial<BlinkResult>;
  if (typeof result.title !== "string" || typeof result.takeaway !== "string") throw new Error("Blink output is missing required copy");
  if (!result.sourceType || !["url", "pdf", "image", "text"].includes(result.sourceType)) throw new Error("Blink output has an invalid source type");
  if (!Array.isArray(result.keyPoints) || result.keyPoints.some(point => typeof point.title !== "string" || typeof point.explanation !== "string")) throw new Error("Blink output has invalid key points");
  return result as BlinkResult;
}
