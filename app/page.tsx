"use client";
import { useState } from "react";

const accent = "text-yellow-400";
const accentBg = "bg-yellow-500";
const accentBorder = "border-yellow-500/30";
const accentGlow = "shadow-yellow-500/20";
const accentHover = "hover:bg-yellow-600";
const accentRing = "ring-yellow-500/30";
const placeholder = "placeholder-yellow-300/40";

export default function CoffeeBrewingPage() {
  const [brewMethod, setBrewMethod] = useState("");
  const [beanOrigin, setBeanOrigin] = useState("");
  const [roastLevel, setRoastLevel] = useState("");
  const [grindSize, setGrindSize] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!brewMethod) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brewMethod, beanOrigin, roastLevel, grindSize }),
    });
    const data = await res.json();
    setResult(data.result || "No result returned.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-100 flex flex-col">
      <header className="border-b border-gray-800 py-6 px-8">
        <h1 className={`text-3xl font-bold ${accent}`}>☕ Specialty Coffee Brewing Guide</h1>
        <p className="text-gray-400 mt-1">Precision recipes for pour-over, espresso, and more</p>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Brew Method *</label>
            <select value={brewMethod} onChange={(e) => setBrewMethod(e.target.value)} className={`w-full bg-gray-800 border ${accentBorder} rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-offset-0 ${accentRing} outline-none`}>
              <option value="">Select method...</option>
              <option>Pour-over (V60/Chemex)</option>
              <option>AeroPress</option>
              <option>French Press</option>
              <option>Espresso</option>
              <option>Moka Pot</option>
              <option>Cold Brew</option>
              <option>Siphon</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bean Origin</label>
            <input value={beanOrigin} onChange={(e) => setBeanOrigin(e.target.value)} placeholder="e.g. Ethiopian Yirgacheffe, Colombian Huila..." className={`w-full bg-gray-800 border ${accentBorder} rounded-lg px-4 py-3 text-gray-100 ${placeholder} outline-none focus:ring-2 focus:ring-offset-0 ${accentRing}`} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Roast Level</label>
            <select value={roastLevel} onChange={(e) => setRoastLevel(e.target.value)} className={`w-full bg-gray-800 border ${accentBorder} rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-offset-0 ${accentRing} outline-none`}>
              <option value="">Select roast...</option>
              <option>Light</option>
              <option>Medium-Light</option>
              <option>Medium</option>
              <option>Medium-Dark</option>
              <option>Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Grind Size</label>
            <select value={grindSize} onChange={(e) => setGrindSize(e.target.value)} className={`w-full bg-gray-800 border ${accentBorder} rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-offset-0 ${accentRing} outline-none`}>
              <option value="">Select grind...</option>
              <option>Extra Fine</option>
              <option>Fine</option>
              <option>Medium-Fine</option>
              <option>Medium</option>
              <option>Medium-Coarse</option>
              <option>Coarse</option>
            </select>
          </div>
          <button onClick={generate} disabled={loading || !brewMethod} className={`w-full ${accentBg} ${accentHover} text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg ${accentGlow}`}>
            {loading ? "Extracting..." : "Generate Brew Guide"}
          </button>
        </div>
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 overflow-y-auto max-h-[600px]">
          {result ? <div className="prose prose-invert prose-sm max-w-none text-gray-200 whitespace-pre-wrap">{result}</div> : <p className="text-gray-500 italic">Your precision brewing recipe with dose, ratio, and tasting notes will appear here.</p>}
        </div>
      </main>
    </div>
  );
}
