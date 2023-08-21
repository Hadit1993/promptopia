import Prompt, { PromptAttr } from "@models/mongoose/Prompt";
import connectToDB from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body: PromptAttr = await req.json();

    await connectToDB();
    const newPrompt = Prompt.build(body);
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
