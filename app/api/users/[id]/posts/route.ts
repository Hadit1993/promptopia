import Prompt from "@models/mongoose/Prompt";
import { IdRequestParam } from "@customTypes/RequestParams";
import connectToDB from "@utils/database";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, options: IdRequestParam) {
  try {
    const { id } = options.params;

    await connectToDB();
    const prompts = await Prompt.find({
      creator: id,
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}
