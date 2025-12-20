
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface IdeaResponse {
  name: string;
  concept: string;
  features: string[];
  techStack: string[];
  marketFit: string;
}
