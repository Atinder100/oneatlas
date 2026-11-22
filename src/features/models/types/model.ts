export interface Model {
  id: string;
  name: string;
  company: string;
  provider: string;
  description: string;
  modelType: string;
  capabilities: string[];
  contextWindow: number | null;
  inputPricePerMillion: number | null;
  outputPricePerMillion: number | null;
  releaseDate: string | null;
}
