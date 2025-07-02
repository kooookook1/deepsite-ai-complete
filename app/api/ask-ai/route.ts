/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { InferenceClient } from "@huggingface/inference";

import { MODELS, PROVIDERS } from "@/lib/providers";
import {
  DIVIDER,
  FOLLOW_UP_SYSTEM_PROMPT,
  INITIAL_SYSTEM_PROMPT,
  MAX_REQUESTS_PER_IP,
  REPLACE_END,
  SEARCH_START,
} from "@/lib/prompts";
import MY_TOKEN_KEY from "@/lib/get-cookie-name";

const ipAddresses = new Map();

function generateDemoHTML(prompt: string, redesignMarkdown?: string, html?: string): string {
  // Simple demo HTML generator for testing
  const userRequest = prompt || "Create a beautiful website";
  
  if (userRequest.toLowerCase().includes("login") || userRequest.toLowerCase().includes("sign in")) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
        <form class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password">
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">Sign In</button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-4">Don't have an account? <a href="#" class="text-blue-500 hover:underline">Sign up</a></p>
    </div>
</body>
</html>`;
  }
  
  if (userRequest.toLowerCase().includes("portfolio") || userRequest.toLowerCase().includes("resume")) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-md">
        <div class="container mx-auto px-6 py-4">
            <nav class="flex justify-between items-center">
                <h1 class="text-2xl font-bold text-gray-800">John Doe</h1>
                <div class="space-x-6">
                    <a href="#about" class="text-gray-600 hover:text-blue-500">About</a>
                    <a href="#projects" class="text-gray-600 hover:text-blue-500">Projects</a>
                    <a href="#contact" class="text-gray-600 hover:text-blue-500">Contact</a>
                </div>
            </nav>
        </div>
    </header>
    
    <main class="container mx-auto px-6 py-12">
        <section class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">Full Stack Developer</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">I create beautiful and functional web applications using modern technologies.</p>
        </section>
        
        <section id="projects" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">Project One</h3>
                    <p class="text-gray-600">A modern web application built with React and Node.js</p>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">Project Two</h3>
                    <p class="text-gray-600">E-commerce platform with advanced features</p>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="h-48 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">Project Three</h3>
                    <p class="text-gray-600">Mobile app with cross-platform compatibility</p>
                </div>
            </div>
        </section>
    </main>
</body>
</html>`;
  }
  
  // Default beautiful landing page
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beautiful Website</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 min-h-screen">
    <div class="container mx-auto px-6 py-12">
        <header class="text-center mb-16">
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 animate-pulse">
                ✨ ${userRequest} ✨
            </h1>
            <p class="text-xl text-blue-100 max-w-2xl mx-auto">
                This is a beautiful website created with AI assistance. The design is modern, responsive, and engaging.
            </p>
        </header>
        
        <main class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <div class="text-4xl mb-4">🚀</div>
                <h3 class="text-xl font-semibold mb-2">Fast Performance</h3>
                <p class="text-blue-100">Lightning-fast loading times and smooth interactions.</p>
            </div>
            <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <div class="text-4xl mb-4">🎨</div>
                <h3 class="text-xl font-semibold mb-2">Beautiful Design</h3>
                <p class="text-blue-100">Modern and elegant design that captures attention.</p>
            </div>
            <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                <div class="text-4xl mb-4">📱</div>
                <h3 class="text-xl font-semibold mb-2">Responsive</h3>
                <p class="text-blue-100">Works perfectly on all devices and screen sizes.</p>
            </div>
        </main>
        
        <footer class="text-center">
            <button class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300 transform hover:scale-105">
                Get Started
            </button>
        </footer>
    </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  const authHeaders = await headers();
  const userToken = request.cookies.get(MY_TOKEN_KEY())?.value;

  const body = await request.json();
  const { prompt, provider, model, redesignMarkdown, html } = body;

  if (!model || (!prompt && !redesignMarkdown)) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const selectedModel = MODELS.find(
    (m) => m.value === model || m.label === model
  );
  if (!selectedModel) {
    return NextResponse.json(
      { ok: false, error: "Invalid model selected" },
      { status: 400 }
    );
  }

  if (!selectedModel.providers.includes(provider) && provider !== "auto") {
    return NextResponse.json(
      {
        ok: false,
        error: `The selected model does not support the ${provider} provider.`,
        openSelectProvider: true,
      },
      { status: 400 }
    );
  }

  let token = userToken;
  let billTo: string | null = null;

  /**
   * Handle local usage token, this bypass the need for a user token
   * and allows local testing without authentication.
   * This is useful for development and testing purposes.
   */
  if (process.env.HF_TOKEN && process.env.HF_TOKEN.length > 0) {
    token = process.env.HF_TOKEN;
  }

  const ip = authHeaders.get("x-forwarded-for")?.includes(",")
    ? authHeaders.get("x-forwarded-for")?.split(",")[1].trim()
    : authHeaders.get("x-forwarded-for");

  if (!token) {
    ipAddresses.set(ip, (ipAddresses.get(ip) || 0) + 1);
    if (ipAddresses.get(ip) > MAX_REQUESTS_PER_IP) {
      return NextResponse.json(
        {
          ok: false,
          openLogin: true,
          message: "Log In to continue using the service",
        },
        { status: 429 }
      );
    }

    token = process.env.DEFAULT_HF_TOKEN as string;
    billTo = "huggingface";
  }

  const DEFAULT_PROVIDER = PROVIDERS.novita;
  const selectedProvider =
    provider === "auto"
      ? PROVIDERS[selectedModel.autoProvider as keyof typeof PROVIDERS]
      : PROVIDERS[provider as keyof typeof PROVIDERS] ?? DEFAULT_PROVIDER;

  try {
    // Create a stream response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Start the response
    const response = new NextResponse(stream.readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    (async () => {
      let completeResponse = "";
      try {
        // Check if we have a valid token, if not use demo mode
        if (!token || token === "hf_demo_token_for_testing") {
          // Demo mode - generate a simple HTML response
          const demoHTML = generateDemoHTML(prompt, redesignMarkdown, html);
          const chunks = demoHTML.split('');
          
          for (const chunk of chunks) {
            await writer.write(encoder.encode(chunk));
            await new Promise(resolve => setTimeout(resolve, 10)); // Simulate streaming
          }
        } else {
          const client = new InferenceClient(token);
          const chatCompletion = client.chatCompletionStream(
            {
              model: selectedModel.value,
              provider: selectedProvider.id as any,
              messages: [
                {
                  role: "system",
                  content: INITIAL_SYSTEM_PROMPT,
                },
                {
                  role: "user",
                  content: redesignMarkdown
                    ? `Here is my current design as a markdown:\n\n${redesignMarkdown}\n\nNow, please create a new design based on this markdown.`
                    : html
                    ? `Here is my current HTML code:\n\n\`\`\`html\n${html}\n\`\`\`\n\nNow, please create a new design based on this HTML.`
                    : prompt,
                },
              ],
              max_tokens: selectedProvider.max_tokens,
            },
            billTo ? { billTo } : {}
          );

          while (true) {
          const { done, value } = await chatCompletion.next();
          if (done) {
            break;
          }

          const chunk = value.choices[0]?.delta?.content;
          if (chunk) {
            let newChunk = chunk;
            if (!selectedModel?.isThinker) {
              if (provider !== "sambanova") {
                await writer.write(encoder.encode(chunk));
                completeResponse += chunk;

                if (completeResponse.includes("</html>")) {
                  break;
                }
              } else {
                if (chunk.includes("</html>")) {
                  newChunk = newChunk.replace(/<\/html>[\s\S]*/, "</html>");
                }
                completeResponse += newChunk;
                await writer.write(encoder.encode(newChunk));
                if (newChunk.includes("</html>")) {
                  break;
                }
              }
            } else {
              const lastThinkTagIndex =
                completeResponse.lastIndexOf("</think>");
              completeResponse += newChunk;
              await writer.write(encoder.encode(newChunk));
              if (lastThinkTagIndex !== -1) {
                const afterLastThinkTag = completeResponse.slice(
                  lastThinkTagIndex + "</think>".length
                );
                if (afterLastThinkTag.includes("</html>")) {
                  break;
                }
              }
            }
          }
          }
        }
      } catch (error: any) {
        if (error.message?.includes("exceeded your monthly included credits")) {
          await writer.write(
            encoder.encode(
              JSON.stringify({
                ok: false,
                openProModal: true,
                message: error.message,
              })
            )
          );
        } else {
          await writer.write(
            encoder.encode(
              JSON.stringify({
                ok: false,
                message:
                  error.message ||
                  "An error occurred while processing your request.",
              })
            )
          );
        }
      } finally {
        await writer?.close();
      }
    })();

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        openSelectProvider: true,
        message:
          error?.message || "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authHeaders = await headers();
  const userToken = request.cookies.get(MY_TOKEN_KEY())?.value;

  const body = await request.json();
  const { prompt, html, previousPrompt, provider, selectedElementHtml } = body;

  if (!prompt || !html) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const selectedModel = MODELS[0];

  let token = userToken;
  let billTo: string | null = null;

  /**
   * Handle local usage token, this bypass the need for a user token
   * and allows local testing without authentication.
   * This is useful for development and testing purposes.
   */
  if (process.env.HF_TOKEN && process.env.HF_TOKEN.length > 0) {
    token = process.env.HF_TOKEN;
  }

  const ip = authHeaders.get("x-forwarded-for")?.includes(",")
    ? authHeaders.get("x-forwarded-for")?.split(",")[1].trim()
    : authHeaders.get("x-forwarded-for");

  if (!token) {
    ipAddresses.set(ip, (ipAddresses.get(ip) || 0) + 1);
    if (ipAddresses.get(ip) > MAX_REQUESTS_PER_IP) {
      return NextResponse.json(
        {
          ok: false,
          openLogin: true,
          message: "Log In to continue using the service",
        },
        { status: 429 }
      );
    }

    token = process.env.DEFAULT_HF_TOKEN as string;
    billTo = "huggingface";
  }

  const client = new InferenceClient(token);

  const DEFAULT_PROVIDER = PROVIDERS.novita;
  const selectedProvider =
    provider === "auto"
      ? PROVIDERS[selectedModel.autoProvider as keyof typeof PROVIDERS]
      : PROVIDERS[provider as keyof typeof PROVIDERS] ?? DEFAULT_PROVIDER;

  try {
    const response = await client.chatCompletion(
      {
        model: selectedModel.value,
        provider: selectedProvider.id as any,
        messages: [
          {
            role: "system",
            content: FOLLOW_UP_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: previousPrompt
              ? previousPrompt
              : "You are modifying the HTML file based on the user's request.",
          },
          {
            role: "assistant",

            content: `The current code is: \n\`\`\`html\n${html}\n\`\`\` ${
              selectedElementHtml
                ? `\n\nYou have to update ONLY the following element, NOTHING ELSE: \n\n\`\`\`html\n${selectedElementHtml}\n\`\`\``
                : ""
            }`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        ...(selectedProvider.id !== "sambanova"
          ? {
              max_tokens: selectedProvider.max_tokens,
            }
          : {}),
      },
      billTo ? { billTo } : {}
    );

    const chunk = response.choices[0]?.message?.content;
    if (!chunk) {
      return NextResponse.json(
        { ok: false, message: "No content returned from the model" },
        { status: 400 }
      );
    }

    if (chunk) {
      const updatedLines: number[][] = [];
      let newHtml = html;
      let position = 0;
      let moreBlocks = true;

      while (moreBlocks) {
        const searchStartIndex = chunk.indexOf(SEARCH_START, position);
        if (searchStartIndex === -1) {
          moreBlocks = false;
          continue;
        }

        const dividerIndex = chunk.indexOf(DIVIDER, searchStartIndex);
        if (dividerIndex === -1) {
          moreBlocks = false;
          continue;
        }

        const replaceEndIndex = chunk.indexOf(REPLACE_END, dividerIndex);
        if (replaceEndIndex === -1) {
          moreBlocks = false;
          continue;
        }

        const searchBlock = chunk.substring(
          searchStartIndex + SEARCH_START.length,
          dividerIndex
        );
        const replaceBlock = chunk.substring(
          dividerIndex + DIVIDER.length,
          replaceEndIndex
        );

        if (searchBlock.trim() === "") {
          newHtml = `${replaceBlock}\n${newHtml}`;
          updatedLines.push([1, replaceBlock.split("\n").length]);
        } else {
          const blockPosition = newHtml.indexOf(searchBlock);
          if (blockPosition !== -1) {
            const beforeText = newHtml.substring(0, blockPosition);
            const startLineNumber = beforeText.split("\n").length;
            const replaceLines = replaceBlock.split("\n").length;
            const endLineNumber = startLineNumber + replaceLines - 1;

            updatedLines.push([startLineNumber, endLineNumber]);
            newHtml = newHtml.replace(searchBlock, replaceBlock);
          }
        }

        position = replaceEndIndex + REPLACE_END.length;
      }

      return NextResponse.json({
        ok: true,
        html: newHtml,
        updatedLines,
      });
    } else {
      return NextResponse.json(
        { ok: false, message: "No content returned from the model" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    if (error.message?.includes("exceeded your monthly included credits")) {
      return NextResponse.json(
        {
          ok: false,
          openProModal: true,
          message: error.message,
        },
        { status: 402 }
      );
    }
    return NextResponse.json(
      {
        ok: false,
        openSelectProvider: true,
        message:
          error.message || "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
