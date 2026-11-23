import type { Lab } from "@/features/labs/types/lab";

// Fictional directory metadata; associated models are resolved from mockModels.
export const mockLabs: Lab[] = [
  {
    id: "northwind-ai",
    name: "Northwind AI",
    description:
      "A fictional research group exploring practical language technologies.",
    focusArea: "Language and productivity",
  },
  {
    id: "asteron-labs",
    name: "Asteron Labs",
    description:
      "A fictional lab investigating efficient systems for everyday AI tasks.",
    focusArea: "Efficient AI",
  },
  {
    id: "meridian-research",
    name: "Meridian Research",
    description:
      "A fictional research organization studying structured reasoning methods.",
    focusArea: "Reasoning and planning",
  },
  {
    id: "prismatica",
    name: "Prismatica",
    description:
      "A fictional lab exploring how AI systems interpret visual information.",
    focusArea: "Multimodal systems",
  },
];
