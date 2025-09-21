import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-dark border-t border-border mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">LegalClarify AI</h3>
            <p className="text-sm text-muted-foreground">
              Making legal documents accessible to everyone through AI-powered analysis.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/features/document-analysis" className="hover:text-foreground transition-colors">Document Analysis</Link></li>
              <li><Link to="/features/risk-assessment" className="hover:text-foreground transition-colors">Risk Assessment</Link></li>
              <li><Link to="/features/summaries" className="hover:text-foreground transition-colors">Plain English Summaries</Link></li>
              <li><Link to="/features/qa" className="hover:text-foreground transition-colors">Interactive Q&A</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Privacy & Security</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/security" className="hover:text-foreground transition-colors">Security Practices</Link></li>
              <li><Link to="/data-retention" className="hover:text-foreground transition-colors">Data Retention</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/legal-disclaimer" className="hover:text-foreground transition-colors">Legal Disclaimer</Link></li>
              <li><Link to="/feedback" className="hover:text-foreground transition-colors">Feedback</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 LegalClarify AI. This tool provides AI-generated analysis and should not replace professional legal advice.</p>
        </div>
      </div>
    </footer>
  );
}