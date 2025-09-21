import { toast } from "@/hooks/use-toast";

interface VertexAIConfig {
  apiKey: string;
  projectId: string;
  location: string;
  model?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

class VertexAIService {
  private config: VertexAIConfig | null = null;
  private baseUrl: string = '';

  configure(config: VertexAIConfig) {
    this.config = {
      ...config,
      model: config.model || 'gemini-1.5-flash'
    };
    
    // For production, you'd use the actual Vertex AI endpoint
    // This would typically go through a backend proxy to handle CORS
    this.baseUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent`;
  }

  isConfigured(): boolean {
    return this.config !== null && !!this.config.apiKey;
  }

  async generateResponse(
    prompt: string,
    context?: string,
    history?: ChatMessage[]
  ): Promise<string> {
    if (!this.isConfigured() || !this.config) {
      throw new Error('Vertex AI is not configured. Please provide API credentials.');
    }

    try {
      // Build the conversation history
      const contents = [];
      
      // Add context if provided (document content)
      if (context) {
        contents.push({
          role: 'user',
          parts: [{
            text: `You are a legal document AI assistant. Here is the document context:\n\n${context}\n\nPlease answer questions about this document clearly and concisely.`
          }]
        });
        contents.push({
          role: 'model',
          parts: [{
            text: 'I understand the document context. I\'m ready to answer your questions about this legal document.'
          }]
        });
      }

      // Add conversation history
      if (history && history.length > 0) {
        history.forEach(msg => {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          });
        });
      }

      // Add current prompt
      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const requestBody = {
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      };

      const response = await fetch(`${this.baseUrl}?key=${this.config.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to generate response');
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (error) {
      console.error('Vertex AI Error:', error);
      throw error;
    }
  }

  async analyzeDocument(documentText: string): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error('Vertex AI is not configured');
    }

    const prompt = `
      Analyze this legal document and provide:
      1. A plain English summary (2-3 paragraphs)
      2. Key risks and concerns (list format)
      3. Unusual or concerning clauses
      4. Important terms and their meanings
      5. Overall risk assessment (Low/Medium/High)
      
      Document:
      ${documentText.substring(0, 10000)} // Limit for API
      
      Format the response as JSON with keys: summary, risks, unusualClauses, keyTerms, riskLevel, confidence
    `;

    try {
      const response = await this.generateResponse(prompt);
      
      // Try to parse as JSON, fallback to structured text parsing
      try {
        return JSON.parse(response);
      } catch {
        // Fallback: parse structured text response
        return this.parseStructuredResponse(response);
      }
    } catch (error) {
      console.error('Document analysis error:', error);
      throw error;
    }
  }

  private parseStructuredResponse(text: string): any {
    // Basic parsing of structured text if JSON parsing fails
    return {
      summary: this.extractSection(text, 'summary') || text.substring(0, 500),
      risks: this.extractList(text, 'risks') || [],
      unusualClauses: this.extractList(text, 'unusual') || [],
      keyTerms: this.extractList(text, 'terms') || [],
      riskLevel: this.extractRiskLevel(text) || 'Medium',
      confidence: 85
    };
  }

  private extractSection(text: string, keyword: string): string {
    const regex = new RegExp(`${keyword}[:\s]+(.+?)(?=\n\n|\n[A-Z]|$)`, 'is');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  }

  private extractList(text: string, keyword: string): string[] {
    const section = this.extractSection(text, keyword);
    if (!section) return [];
    
    return section
      .split(/[\n•\-\d\.]+/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }

  private extractRiskLevel(text: string): string {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('high risk')) return 'High';
    if (lowerText.includes('low risk')) return 'Low';
    return 'Medium';
  }
}

export const vertexAI = new VertexAIService();
export type { VertexAIConfig, ChatMessage };