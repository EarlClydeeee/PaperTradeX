import Link from "next/link";
import { TrendingUp, Zap, Brain, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
          <Zap className="w-3 h-3" />
          The future of paper trading
        </div>
        
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-display font-extrabold tracking-tighter text-white">
            Trade fake money.<br />
            <span className="text-primary">Learn real patterns.</span>
          </h1>
          <p className="text-text-muted text-xl md:text-2xl font-medium max-w-2xl mx-auto">
            PaperTradeX is the first simulator with an AI coach that watches how you trade and builds your behavioral fingerprint.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/practice" 
            className="bg-primary text-text-inverse px-8 py-4 rounded-radius-button font-display font-bold text-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            Start Practice Trading
          </Link>
          <button className="bg-surface border border-border text-text px-8 py-4 rounded-radius-button font-display font-bold text-xl hover:bg-border transition-all flex items-center justify-center gap-2">
            View Live Markets
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 w-full">
          <FeatureCard 
            icon={<Brain className="w-6 h-6 text-accent" />}
            title="AI Coaching"
            description="Every trade gets an instant bias check from your dedicated AI coach."
          />
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            title="Real Market Data"
            description="Trade real tickers with live price action, zero financial risk."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-success" />}
            title="Behavioral Fingerprint"
            description="Identify the biases that are costing you money before you go live."
          />
        </div>
      </section>

      <footer className="p-8 border-t border-border flex justify-between items-center text-text-muted text-sm">
        <div>© 2026 PaperTradeX. Built for the next generation of investors.</div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-text transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-text transition-colors">Terms</Link>
          <Link href="https://github.com" className="hover:text-text transition-colors">GitHub</Link>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 bg-surface border border-border rounded-radius-card text-left space-y-3">
      <div className="bg-bg w-12 h-12 rounded-lg flex items-center justify-center border border-border">
        {icon}
      </div>
      <h3 className="font-display font-bold text-lg text-white">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
