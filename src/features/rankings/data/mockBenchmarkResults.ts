import type { Benchmark, BenchmarkResult } from "@/features/rankings/types/benchmark";

// Fictional illustrative scores for demonstration only; these are not real benchmark measurements.
export const mockBenchmarks: Benchmark[] = [
  {
    id: "reasoning-evaluation",
    name: "Reasoning Evaluation",
    category: "Reasoning",
    description:
      "An illustrative evaluation of structured reasoning and multi-step problem solving.",
  },
  {
    id: "coding-evaluation",
    name: "Coding Evaluation",
    category: "Coding",
    description:
      "An illustrative evaluation of code generation and programming assistance.",
  },
  {
    id: "knowledge-evaluation",
    name: "Knowledge Evaluation",
    category: "Knowledge",
    description:
      "An illustrative evaluation of broad knowledge recall and question answering.",
  },
];

export const mockBenchmarkResults: BenchmarkResult[] = [
  { modelId: "atlas-2", benchmarkId: "reasoning-evaluation", score: 86 },
  { modelId: "nova-lite", benchmarkId: "reasoning-evaluation", score: 74 },
  { modelId: "echo-reasoner", benchmarkId: "reasoning-evaluation", score: 93 },
  { modelId: "prisma-vision", benchmarkId: "reasoning-evaluation", score: 79 },
  { modelId: "atlas-2", benchmarkId: "coding-evaluation", score: 91 },
  { modelId: "nova-lite", benchmarkId: "coding-evaluation", score: 82 },
  { modelId: "echo-reasoner", benchmarkId: "coding-evaluation", score: 77 },
  { modelId: "prisma-vision", benchmarkId: "coding-evaluation", score: 72 },
  { modelId: "atlas-2", benchmarkId: "knowledge-evaluation", score: 88 },
  { modelId: "nova-lite", benchmarkId: "knowledge-evaluation", score: 84 },
  { modelId: "echo-reasoner", benchmarkId: "knowledge-evaluation", score: 90 },
  { modelId: "prisma-vision", benchmarkId: "knowledge-evaluation", score: 76 },
];
