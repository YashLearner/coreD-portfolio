import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";

function corsHeaders(origin: string | null) {
  const headers = new Headers();

  headers.set("Vary", "Origin");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  if (origin === FRONTEND_ORIGIN) {
    headers.set("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  }

  return headers;
}

function jsonResponse(
  data: unknown,
  status: number,
  origin: string | null
) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders(origin),
  });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");

  if (origin && origin !== FRONTEND_ORIGIN) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");

  if (origin && origin !== FRONTEND_ORIGIN) {
    return jsonResponse(
      { success: false, error: "Origin not allowed" },
      403,
      origin
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid JSON body" },
      400,
      origin
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("question" in body) ||
    typeof body.question !== "string"
  ) {
    return jsonResponse(
      { success: false, error: "A question is required" },
      400,
      origin
    );
  }

  const question = body.question.trim();

  if (question.length === 0 || question.length > 500) {
    return jsonResponse(
      {
        success: false,
        error: "Question must contain 1–500 characters",
      },
      400,
      origin
    );
  }

  try {
    const savedQuestion = await prisma.unansweredQuestion.create({
      data: { question },
    });

    return jsonResponse(
      {
        success: true,
        message: "Unanswered question saved",
        id: savedQuestion.id,
      },
      201,
      origin
    );
  } catch (error) {
    console.error("Failed to save unanswered question:", error);

    return jsonResponse(
      { success: false, error: "Could not save question" },
      500,
      origin
    );
  }
}