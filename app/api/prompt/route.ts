import Prompt from "@models/mongoose/Prompt";
import connectToDB from "@utils/database";
import { PipelineStage } from "mongoose";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  try {
    await connectToDB();
    const url = new URL(request.url!);
    const term = url.searchParams.get("term");
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "user_data",
        },
      },
      {
        $unwind: "$user_data",
      },
      {
        $project: {
          creator: "$user_data",
          prompt: 1,
          tag: 1,
        },
      },
    ];
    if (term) {
      pipeline.push({
        $match: {
          $or: [
            { "creator.username": { $regex: term, $options: "i" } },
            { prompt: { $regex: term, $options: "i" } },
            { tag: { $regex: term, $options: "i" } },
          ],
        },
      });
    }
    const prompts = await Prompt.aggregate(pipeline);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}
