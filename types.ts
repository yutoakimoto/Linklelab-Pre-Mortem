export interface ProjectInput {
  name: string;
  description: string;
  target: string;
  monetization: string;
  challenges: string;
  techStack: string;
}

export interface FailureCategory {
  categoryName: string;
  reasons: string[];
}

export interface DoomScenario {
  headline: string;
  date: string;
  articleBody: string; // Markdown supported
  failureAnalysis: FailureCategory[];
  survivalTips: string[];
}

export interface GeneratedResult {
  scenario: DoomScenario;
  imageUrl: string | null;
}
