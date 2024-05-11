import { connect } from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel";
import Notebook from "@/models/notebookModel";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { query, response, notebookId } = reqBody;

    const notebook = await Notebook.findById(notebookId);

    if (!notebook) {
      return NextResponse.json(
        { error: "Notebook not found" },
        { status: 404 }
      );
    }

    const chat = new Chat({
      query,
      response,
      notebook: notebook._id
    });

    const savedChat = await chat.save();

    return NextResponse.json({
      message: "Chat created successfully",
      success: true,
      savedChat,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const reqBody = req.json();
    const { notebookId } = reqBody;

    const chats = await Chat.find({ notebookId });

    return NextResponse.json({
      success: true,
      chats,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
