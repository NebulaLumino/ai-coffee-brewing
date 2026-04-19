import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.deepseek.com/v1",
  });
}

export async function POST(req: NextRequest) {
  try {
    const { brewMethod, beanOrigin, roastLevel, grindSize } = await req.json();

    const completion = await getClient().chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are a specialty coffee expert barista. Create a detailed brewing guide including:
- Dose (grams)
- Grind calibration
- Water temperature
- Brew time
- Yield (grams/ml)
- Brew ratio
- Tasting notes
- Tips for this specific method and bean

Format with clear sections using markdown.`,
        },
        {
          role: "user",
          content: `Brew method: ${brewMethod}\nBean origin: ${beanOrigin}\nRoast level: ${roastLevel}\nGrind size: ${grindSize}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
