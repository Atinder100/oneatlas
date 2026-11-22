export type Benchmark = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export type BenchmarkResult = {
  modelId: string;
  benchmarkId: string;
  score: number;
};
