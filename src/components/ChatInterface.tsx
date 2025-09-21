import { useState, useEffect } from "react";
import { Send, Bot, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { vertexAI } from "@/services/vertexAI";
import { toast } from "@/hooks/use-toast";
import AIConfigDialog from "./AIConfigDialog";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  documentContext: any;
}

export default function ChatInterface({ documentContext }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "I'm ready to answer any questions you have about this document. Feel free to ask about specific clauses, terms, or any concerns you might have.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [isAIConfigured, setIsAIConfigured] = useState(false);

  useEffect(() => {
    // Check if AI is already configured
    const config = localStorage.getItem('ai_config');
    if (config) {
      try {
        const parsedConfig = JSON.parse(config);
        vertexAI.configure(parsedConfig);
        setIsAIConfigured(true);
      } catch (error) {
        console.error('Failed to load AI configuration:', error);
      }
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    // Check if AI is configured
    if (!isAIConfigured || !vertexAI.isConfigured()) {
      setShowConfig(true);
      toast({
        title: "AI Configuration Required",
        description: "Please configure AI settings to enable real responses",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      // Use real AI response
      const contextString = documentContext ? 
        `Document Summary: ${documentContext.summary}\n` +
        `Key Terms: ${documentContext.keyTerms?.join(', ')}\n` +
        `Risks: ${documentContext.risks?.map((r: any) => r.title).join(', ')}` : 
        '';

      const response = await vertexAI.generateResponse(
        input,
        contextString,
        messages.filter(m => m.role !== 'assistant' || m.id !== '1') // Exclude initial message
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI response error:', error);
      
      // Fallback to simulated response if AI fails
      const fallbackResponses = [
        "I'm having trouble connecting to the AI service. Please check your configuration and try again.",
        "Unable to generate a response. Please ensure your API key is valid and try again."
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponses[0],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      toast({
        title: "AI Response Error",
        description: "Failed to get AI response. Using fallback mode.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[400px]">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent" />
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowConfig(true)}
          title="AI Settings"
        >
          <Settings className="w-4 h-4" />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about the document..."
          disabled={isProcessing}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || isProcessing}
          size="icon"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      <AIConfigDialog
        open={showConfig}
        onClose={() => setShowConfig(false)}
        onConfigured={() => {
          setIsAIConfigured(true);
          toast({
            title: "AI Configured",
            description: "You can now use real AI responses for document analysis",
          });
        }}
      />
    </div>
  );
}