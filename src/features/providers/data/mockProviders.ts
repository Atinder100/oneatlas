import type { Provider } from "@/features/providers/types/provider";

// Fictional directory metadata; supported models are resolved from mockModels.
export const mockProviders: Provider[] = [
  {
    id: "northwind-cloud",
    name: "Northwind Cloud",
    description:
      "A fictional platform offering hosted access to general-purpose AI tools.",
  },
  {
    id: "asteron-gateway",
    name: "Asteron Gateway",
    description:
      "A fictional provider focused on responsive access to lightweight AI models.",
  },
  {
    id: "meridian-api",
    name: "Meridian API",
    description:
      "A fictional API platform for experimentation with structured reasoning models.",
  },
  {
    id: "prismatica-studio",
    name: "Prismatica Studio",
    description:
      "A fictional creative platform for exploring multimodal AI capabilities.",
  },
];
