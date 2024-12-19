import { imageString } from "../../../data/imagestring.js";
import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import MarkdownIt from "markdown-it";

export default async function handler(req, res) {
  const imgData = imageString;
  const promptMessage = "What is in the image?";
  const contents = [
    new HumanMessage({
      content: [
        {
          type: "text",
          text: promptMessage,
        },
        {
          type: "image_url",
          image_url: { url: imgData },
        },
      ],
    }),
  ];

  // const { contents } = req.body;
  const vision = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "gemini-1.5-pro",
  });

  // Multi-modal streaming
  const streamRes = await vision.stream(contents);

  // Read from the stream and interpret the output as markdown
  const buffer = [];
  const md = new MarkdownIt();
  let outputRes = "";
  for await (const chunk of streamRes) {
    buffer.push(chunk.content);
    outputRes = md.render(buffer.join(""));
  }

  res.status(200).json({ response: outputRes });
}
