import { useState, useEffect } from "react";
import { Clock, FileText, Trash2, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HistoryItem {
  id: string;
  fileName: string;
  analyzedAt: Date;
  riskLevel: 'high' | 'medium' | 'low';
  summary: string;
}

export default function History() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Mock history data
    const mockHistory: HistoryItem[] = [
      {
        id: '1',
        fileName: 'Service_Agreement_2024.pdf',
        analyzedAt: new Date(Date.now() - 86400000),
        riskLevel: 'medium',
        summary: 'Standard service agreement with some clauses requiring attention'
      },
      {
        id: '2',
        fileName: 'NDA_Template.docx',
        analyzedAt: new Date(Date.now() - 172800000),
        riskLevel: 'low',
        summary: 'Well-balanced non-disclosure agreement with standard terms'
      },
      {
        id: '3',
        fileName: 'Employment_Contract.pdf',
        analyzedAt: new Date(Date.now() - 259200000),
        riskLevel: 'high',
        summary: 'Contains several high-risk clauses including non-compete'
      }
    ];
    setHistoryItems(mockHistory);
  }, []);

  const deleteItem = (id: string) => {
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Document History</h1>
            <p className="text-muted-foreground">
              View and manage your previously analyzed documents
            </p>
          </div>

          {historyItems.length === 0 ? (
            <Card className="p-12 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No History Yet</h3>
              <p className="text-muted-foreground">
                Documents you analyze will appear here
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {historyItems.map(item => (
                <Card key={item.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <FileText className="w-5 h-5 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{item.fileName}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.summary}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            Analyzed {item.analyzedAt.toLocaleDateString()}
                          </span>
                          <Badge variant={
                            item.riskLevel === 'high' ? 'destructive' :
                            item.riskLevel === 'medium' ? 'default' :
                            'secondary'
                          }>
                            {item.riskLevel} risk
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}