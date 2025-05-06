export interface ReportData {
  id: string;
  title: string;
  data: {
    scannedDocument: ScannedDocument;
    results: Results;
    notifications: {
      alerts: any[];
    };
    status: number;
    developerPayload: string;
  };
}

export interface ScannedDocument {
  scanId: string;
  totalWords: number;
  totalExcluded: number;
  credits: number;
  expectedCredits: number;
  creationTime: string;
  metadata: {
    creationDate?: string;
    lastModificationDate?: string;
    filename?: string;
    author?: string;
    organization?: string;
  };
  enabled: {
    plagiarismDetection: boolean;
    aiDetection: boolean;
    explainableAi: boolean;
    writingFeedback: boolean;
    pdfReport: boolean;
    cheatDetection: boolean;
  };
  detectedLanguage: string;
}

export interface Results {
  score: {
    identicalWords: number;
    minorChangedWords: number;
    relatedMeaningWords: number;
    aggregatedScore: number;
  };
  internet: Source[];
  database: any[];
  batch: any[];
  repositories: any[];
}

export interface Source {
  url: string;
  id: string;
  title: string;
  introduction: string;
  matchedWords: number;
  identicalWords: number;
  similarWords: number;
  paraphrasedWords: number;
  totalWords: number;
  metadata: {
    filename?: string;
    creationDate?: string;
    lastModificationDate?: string;
    publishDate?: string;
    author?: string;
    organization?: string;
  };
  tags: string[];
}
