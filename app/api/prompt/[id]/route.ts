import { IdRequestParam } from "@customTypes/RequestParams";
import Prompt, { PromptAttr } from "@models/mongoose/Prompt";
import connectToDB from "@utils/database";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, options: IdRequestParam) {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(options.params.id).populate("creator");
    if (!prompt) return new Response("prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
}

export async function PATCH(request: NextRequest, options: IdRequestParam) {
  const { prompt, tag }: PromptAttr = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(options.params.id);
    if (!existingPrompt)
      return new Response("prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
}

export async function DELETE(_: NextRequest, options: IdRequestParam) {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(options.params.id);
    return new Response("prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
}
