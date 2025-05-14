import { AzureOpenAI } from "openai";
import { NextResponse } from "next/server";

const client = new AzureOpenAI({
    endpoint: process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY,
    apiVersion: "2025-01-01-preview",
    deployment: "gpt-35-turbo",
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = await client.chat.completions.create({            messages,
            model: "gpt-35-turbo",
            max_tokens: 1000,
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: [";"],  // Stop at the end of SQL statements
        });

        return NextResponse.json({ response: result.choices[0]?.message?.content });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}
