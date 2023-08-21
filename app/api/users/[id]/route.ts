import User from "@models/mongoose/User";
import connectToDB from "@utils/database";
import { NextRequest } from "next/server";

interface Optios {
  params: {
    id: string;
  };
}

export async function GET(_: NextRequest, options: Optios) {
  const { id } = options.params;
  try {
    await connectToDB();
    const user = await User.findById(id);
    if (user) return new Response(JSON.stringify(user), { status: 200 });
    else return new Response("user not found", { status: 404 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}
