import { NextResponse } from "next/server";
import { getBlinkProvider } from "@/lib/ai/provider";
import { parseBlinkResult, type SourceType } from "@/lib/blink-schema";

const sourceTypes: SourceType[] = ["url", "pdf", "image", "text"];

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const { content, sourceType, title } = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  if (typeof content !== "string" || !content.trim() || !sourceTypes.includes(sourceType as SourceType)) return NextResponse.json({ error: "Add a source before creating a Blink." }, { status: 400 });
  const output = await getBlinkProvider().generate({ content, sourceType: sourceType as SourceType, title: typeof title === "string" ? title : undefined });
  return NextResponse.json(parseBlinkResult(output));
}
