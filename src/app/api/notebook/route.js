import { connect } from "@/dbConfig/dbConfig";
import Notebook from "@/models/notebookModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { topic, userId } = reqBody;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const notebook = new Notebook({
      topic,
      user: user._id,
    });

    let savedNotebook = await notebook.save();

    savedNotebook = await savedNotebook.populate("user");

    return NextResponse.json({
      message: "Notebook created successfully",
      success: true,
      savedNotebook,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const reqBody = req.json();
    const { userId } = reqBody;

    const notebooks = await Notebook.find({ userId }).populate("user");

    return NextResponse.json({
      success: true,
      notebooks,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

