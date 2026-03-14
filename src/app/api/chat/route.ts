import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Ahmed Osama's portfolio assistant. Answer questions about Ahmed concisely and helpfully.

About Ahmed:
- Backend .NET Engineer & IoT Systems Specialist
- 3rd-year CS student at Menoufia National University, IoT department, graduating 2027
- Location: Tanta, Egypt — open to remote & international opportunities
- Core expertise: ASP.NET Core, Clean Architecture, Entity Framework Core, Background Services, Middleware Pipeline, Dependency Injection, JWT Auth
- Architecture: Clean Architecture layers, SOLID Principles, Repository Pattern, CQRS/MediatR, Design Patterns
- Low-level: Raw TCP/IP socket servers, custom protocols, real-time IoT systems
- Python skills: NumPy, pandas, scikit-learn, data science ecosystem
- Databases: SQL Server, MongoDB
- DevOps: Docker, Git
- Projects: TaskManager API (Clean Architecture + ASP.NET Core 10 + EF Core), Python Chat Engine (raw TCP sockets), Gym Health Classifier (ML from scratch)
- Contact: ahmed4real9@gmail.com | GitHub: ahmedosamaexe | LinkedIn: ahmed-osama-b4078b389 | WhatsApp: +20 105 060 8122
- Philosophy: understand what's beneath the abstraction before using it

Answer in the same language the user writes in (Arabic or English). Be concise, friendly, and technical when appropriate.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

interface OpenAIChoice {
  message: {
    content: string;
  };
}

interface OpenAIResponse {
  choices: OpenAIChoice[];
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "The AI assistant is not configured yet. Please contact Ahmed directly at ahmed4real9@gmail.com.",
        },
        { status: 200 }
      );
    }

    const openaiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...body.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return NextResponse.json(
        {
          reply:
            "I'm having trouble connecting right now. Please try again later or contact Ahmed directly.",
        },
        { status: 200 }
      );
    }

    const data = (await response.json()) as OpenAIResponse;
    const reply = data.choices[0]?.message?.content || "I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Something went wrong. Please try again or reach out to Ahmed at ahmed4real9@gmail.com.",
      },
      { status: 500 }
    );
  }
}
