
export interface ExtractionResult {
  fileName: string;
  status: 'success' | 'failed';
  data: Record<string, string>;
}
