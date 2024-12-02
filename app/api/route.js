import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

async function ensureDBConnection() {
    if (!global.isDBConnected) {
        await ConnectDB();
        global.isDBConnected = true;
    }
}

export async function GET() {
    try {
        await ensureDBConnection();
        const todos = await TodoModel.find({});
        return NextResponse.json({ todos });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch todos." }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { title, description } = await request.json();

        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
        }

        await TodoModel.create({ title, description });
        return NextResponse.json({ msg: "Todo Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create todo." }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const mongoId = request.nextUrl.searchParams.get("mongoId");

        if (!mongoId) {
            return NextResponse.json({ error: "ID is required." }, { status: 400 });
        }

        await TodoModel.findByIdAndDelete(mongoId);
        return NextResponse.json({ msg: "Todo Deleted." });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete todo." }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const mongoId = request.nextUrl.searchParams.get("mongoId");
        const currentTodo = await TodoModel.findById(mongoId);

        if (!currentTodo) {
            return NextResponse.json({ error: "Todo not found." }, { status: 404 });
        }

        // Toggle the isCompleted status
        const updatedStatus = !currentTodo.isCompleted;

        await TodoModel.findByIdAndUpdate(mongoId, {
            $set: { isCompleted: updatedStatus },
        });

        return NextResponse.json({ msg: `Todo marked as ${updatedStatus ? "completed" : "pending"}.` });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update todo." }, { status: 500 });
    }
}

