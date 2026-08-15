import { NextResponse } from "next/server";
import { getBlinkProvider } from "@/lib/ai/provider";
import { parseBlinkResult, type SourceType } from "@/lib/blink-schema";

export async function POST(request: Request) {
  const body = await request.json() as { content?: string; sourceType?: SourceType; title?: string };
  if (!body.content?.trim() || !body.sourceType) return NextResponse.json({ error: "Add a source before creating a Blink." }, { status: 400 });
  const output = await getBlinkProvider().generate({ content: body.content, sourceType: body.sourceType, title: body.title });
  return NextResponse.json(parseBlinkResult(output));
}
