import { getModel } from "../config/llmodels.js";

export const router = async (state) => {
  const llm = await getModel("router");

  const prompt = `
You are an intelligent router agent.

Your job is to determine which specialized agent should handle the user's request.

Available agents:

- chat
- search
- coding
- pdf
- ppt
- vission

Routing Rules:

chat:
- General conversation
- Greetings
- Explanations
- Learning
- Questions
- Casual discussion

search:
- Current events
- Latest information
- News
- Real-time facts
- Web search

coding:
- Generate code
- Debug code
- Build projects
- Software architecture
- API design
- Programming questions

pdf:
- Extract information from PDF files
- Summarize PDF files
- Answer questions about PDF content

ppt:
- Generate PowerPoint presentations
- Questions about presentations
- PPT editing or slides

vission:
- Image analysis
- OCR
- Describe images
- Answer questions about images

Instructions:
- Return ONLY one word.
- Do not explain your answer.
- Choose one of:
chat
search
coding
pdf
ppt
vission

User Query:
${state.prompt}
`;

  const response = await llm.invoke(prompt);
  console.log(response);

  return { agent: response.content.trim().toLowerCase() };
};
