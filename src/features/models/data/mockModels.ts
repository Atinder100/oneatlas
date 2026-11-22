import type { Model } from "@/features/models/types/model";

// Fictional demonstration records; replace this array with API data when available.
export const mockModels: Model[] = [
  {
    id: "atlas-2",
    name: "Atlas 2",
    company: "Northwind AI",
    provider: "Northwind Cloud",
    description:
      "A balanced general-purpose demonstration model for drafting, analysis, and everyday AI workflows.",
    modelType: "General purpose",
    capabilities: ["Text generation", "Summarization", "Code assistance"],
    contextWindow: 128000,
    inputPricePerMillion: 2.5,
    outputPricePerMillion: 10,
    releaseDate: "2026-02-18",
  },
  {
    id: "nova-lite",
    name: "Nova Lite",
    company: "Asteron Labs",
    provider: "Asteron Gateway",
    description:
      "A fictional lightweight model designed for fast responses in chat and document transformation tasks.",
    modelType: "Lightweight",
    capabilities: ["Chat", "Classification", "Document Q&A"],
    contextWindow: 32000,
    inputPricePerMillion: 0.35,
    outputPricePerMillion: 1.2,
    releaseDate: "2025-11-07",
  },
  {
    id: "echo-reasoner",
    name: "Echo Reasoner",
    company: "Meridian Research",
    provider: "Meridian API",
    description:
      "A demonstration reasoning model focused on structured problem solving and multi-step analysis.",
    modelType: "Reasoning",
    capabilities: ["Reasoning", "Data analysis", "Planning"],
    contextWindow: 200000,
    inputPricePerMillion: 5,
    outputPricePerMillion: 15,
    releaseDate: null,
  },
  {
    id: "prisma-vision",
    name: "Prisma Vision",
    company: "Prismatica",
    provider: "Prismatica Studio",
    description:
      "A fictional multimodal model for understanding visual content and generating concise written responses.",
    modelType: "Multimodal",
    capabilities: ["Image understanding", "Text generation", "OCR"],
    contextWindow: null,
    inputPricePerMillion: null,
    outputPricePerMillion: 8,
    releaseDate: "2026-05-12",
  },
];
