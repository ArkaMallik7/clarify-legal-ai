import { Scale, History, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">LegalClarify AI</h1>
              <p className="text-xs text-muted-foreground">Demystifying Legal Documents</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/history" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <History className="w-4 h-4" />
              History
            </Link>
            <Link 
              to="/privacy" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Shield className="w-4 h-4" />
              Privacy
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}