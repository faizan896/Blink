import type { BlinkResult, SourceType } from "../blink-schema";

export interface SourceDocument { content: string; sourceType: SourceType; title?: string }
export interface BlinkProvider { generate(document: SourceDocument): Promise<BlinkResult> }

/** Provider selection lives in one place so hosted models can be changed without touching routes or UI. */
export function getBlinkProvider(): BlinkProvider {
  return {
    async generate(document) {
      return {
        title: document.title || "A new Blink",
        sourceType: document.sourceType,
        takeaway: "The demo provider is ready to be replaced by a configured hosted model.",
        keyPoints: [{ title: "Source received", explanation: `Blink read ${document.content.length.toLocaleString()} characters from this source.` }],
      };
    },
  };
}
