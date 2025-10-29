import React, { useState, useCallback, useEffect } from 'react';
import { runNexusAnalysis } from './services/geminiService';
import { SAMPLE_MODALITIES } from './data/assetData';
import type { NexusAnalysis, MultiModalData } from './types';
import { Loader } from './components/ui/Loader';
import { Card } from './components/ui/Card';
import { ExecutiveSummary, Stratum2, Stratum3, Stratum4, Stratum5, Stratum6, Stratum7, Stratum8, Stratum9 } from './components/strata/StratumComponents';


const STRATA = [
  { id: 1, name: "Signal Horizon", description: "Clinical Data Acquisition & Standardization" },
  { id: 2, name: "Pattern Constellation", description: "Clinical Syndrome Recognition" },
  { id: 3, name: "Hypothesis Forge", description: "Differential Diagnosis & Bayesian Refinement" },
  { id: 4, name: "Decision Nexus", description: "Action Determination Under Uncertainty" },
  { id: 5, name: "Cerebrum Sentinel", description: "Reflective Reasoning & Quality Assurance" },
  { id: 6, name: "Hermeneutic Graph", description: "Causal & Pathophysiologic Weaving" },
  { id: 7, name: "Kairós Orchestrator", description: "Time-Critical Decision Control" },
  { id: 8, name: "Praxis Loop", description: "Learning, Calibration & Governance" },
  { id: 9, name: "Actionable Plan", description: "Clinical Management & Next Steps" },
];

const NAV_ITEMS = [
    { id: 0, name: "Executive Summary", description: "High-level diagnostic overview" },
    ...STRATA.map(s => ({...s, id: s.id + 1})), // Shift strata IDs to make space
];

const App: React.FC = () => {
  const [activeStratum, setActiveStratum] = useState<number>(1);
  const [analysisResult, setAnalysisResult] = useState<NexusAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [caseSummary, setCaseSummary] = useState<string>('42-year-old male with a history of smoking presents with a 3-day history of productive cough, fever up to 102°F, and shortness of breath. He reports sharp right-sided chest pain that worsens with deep breaths.');
  const [multiModalData, setMultiModalData] = useState<MultiModalData>({});
  const [additionalFinding, setAdditionalFinding] = useState<string>('');
  
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    setShowMain(true);
  }, []);

  const handleToggleModality = <K extends keyof MultiModalData>(modality: K) => {
    setMultiModalData(prev => {
        const newState = {...prev};
        if (newState[modality]) {
            delete newState[modality];
        } else {
            newState[modality] = SAMPLE_MODALITIES[modality];
        }
        return newState;
    });
  };

  const handleAnalysis = useCallback(async (summaryOverride?: string) => {
    const summaryToAnalyze = summaryOverride || caseSummary;

    if (!summaryToAnalyze.trim()) {
      setError("Please enter a clinical case summary.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setActiveStratum(0);

    try {
      const result = await runNexusAnalysis(summaryToAnalyze, multiModalData);
      setAnalysisResult(result);
      setActiveStratum(summaryOverride ? 3 : 0);
    } catch (e) {
      setError("An error occurred during analysis. Please check your API key and try again.");
      setActiveStratum(1);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [caseSummary, multiModalData]);

  const handleRefinement = () => {
    if (!additionalFinding.trim()) return;
    const combinedSummary = `${caseSummary}\n\n**Clinician-added Finding:** ${additionalFinding}`;
    handleAnalysis(combinedSummary);
    setAdditionalFinding('');
  };

  
  const renderStratumContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full min-h-[500px]">
          <div className="flex flex-col items-center animate-fade-in">
            <Loader />
          </div>
        </div>
      );
    }

    if (error) {
       return <div className="flex justify-center items-center h-full min-h-[500px]"><Card title="Error" className="border-red-500"><p className="text-red-400">{error}</p></Card></div>;
    }

    switch(activeStratum) {
      case 0:
        return analysisResult && <ExecutiveSummary data={analysisResult.stratum1} />;
      case 1:
        return (
          <div className="animate-fade-in p-6">
            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-100">Stratum 1: Signal Horizon</h2>
                <p className="text-slate-400 mt-2">Input raw clinical data for a single case analysis.</p>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <div className="w-full max-w-4xl">
                 <Card title="Clinical Case Summary" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>}>
                    <textarea
                      className="w-full h-24 p-3 bg-slate-900/70 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none text-slate-200 resize-none"
                      value={caseSummary}
                      onChange={(e) => setCaseSummary(e.target.value)}
                      placeholder="e.g., 42-year-old male with a history of smoking..."
                    />
                 </Card>

                 <div className="mt-6">
                    <Card title="Add Multi-Modal Data" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button onClick={() => handleToggleModality('chestXray')} className={`p-2 border-2 rounded-lg transition-colors ${multiModalData.chestXray ? 'border-cyan-500 bg-cyan-900/30' : 'border-slate-700 hover:border-cyan-700'}`}>Add Sample Chest X-Ray</button>
                            <button onClick={() => handleToggleModality('ekg')} className={`p-2 border-2 rounded-lg transition-colors ${multiModalData.ekg ? 'border-cyan-500 bg-cyan-900/30' : 'border-slate-700 hover:border-cyan-700'}`}>Add Sample EKG</button>
                            <button onClick={() => handleToggleModality('labResults')} className={`p-2 border-2 rounded-lg transition-colors ${multiModalData.labResults ? 'border-cyan-500 bg-cyan-900/30' : 'border-slate-700 hover:border-cyan-700'}`}>Add Sample Lab Results</button>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {multiModalData.chestXray && <div className="p-2 bg-slate-800/50 rounded-lg"><h4 className="font-bold text-slate-300">Chest X-Ray</h4><img src={multiModalData.chestXray.image} alt="Chest X-Ray" className="mt-2 rounded border border-slate-600 h-24 w-24 object-cover" /><p className="text-xs mt-1 text-slate-400">{multiModalData.chestXray.findings}</p></div>}
                            {multiModalData.ekg && <div className="p-2 bg-slate-800/50 rounded-lg"><h4 className="font-bold text-slate-300">EKG</h4><img src={multiModalData.ekg.image} alt="EKG" className="mt-2 rounded border border-slate-600 h-24 w-full object-cover" /><p className="text-xs mt-1 text-slate-400">{multiModalData.ekg.findings}</p></div>}
                            {multiModalData.labResults && <div className="p-2 bg-slate-800/50 rounded-lg md:col-span-2"><h4 className="font-bold text-slate-300">{multiModalData.labResults.panel}</h4><ul className="text-xs mt-1 text-slate-400 columns-2">{multiModalData.labResults.results.map(r => <li key={r.test}><strong>{r.test}:</strong> {r.value}</li>)}</ul></div>}
                        </div>
                    </Card>
                 </div>
              </div>
            </div>
             <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                 <button
                  onClick={() => handleAnalysis()}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-12 rounded-full hover:scale-105 transition-transform duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-pulse-glow"
                >
                  Analyze with NEXUS
                </button>
             </div>
          </div>
        );
      case 2: return analysisResult && <Stratum2 data={analysisResult.stratum2} />;
      case 3:
        return analysisResult && (
            <div className="space-y-6">
                <Stratum3 data={analysisResult.stratum3} />
                <Card title="Interactive Refinement" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.898 0V3a1 1 0 112 0v2.101a7.002 7.002 0 01-11.898 0V3a1 1 0 01-1-1zM12 10a2 2 0 11-4 0 2 2 0 014 0zM4 12a1 1 0 011 1v2.101a7.002 7.002 0 0111.898 0V13a1 1 0 112 0v2.101a7.002 7.002 0 01-11.898 0V13a1 1 0 01-1-1z" clipRule="evenodd" /></svg>}>
                    <p className="text-sm text-slate-400 mb-2">Add a new finding or test result to see how it impacts the analysis in real-time.</p>
                    <textarea
                        className="w-full p-2 bg-slate-900/70 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none text-slate-200 resize-none"
                        value={additionalFinding}
                        onChange={(e) => setAdditionalFinding(e.target.value)}
                        placeholder="e.g., BNP came back at 800 pg/mL"
                    />
                    <button
                        onClick={handleRefinement}
                        disabled={isLoading || !additionalFinding.trim()}
                        className="mt-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:scale-105 transition-transform duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        Incorporate Finding & Re-Analyze
                    </button>
                </Card>
            </div>
        );
      case 4: return analysisResult && <Stratum4 data={analysisResult.stratum4} />;
      case 5: return analysisResult && <Stratum5 data={analysisResult.stratum5} />;
      case 6: return analysisResult && <Stratum6 data={analysisResult.stratum6} />;
      case 7: return analysisResult && <Stratum7 data={analysisResult.stratum7} />;
      case 8: return analysisResult && <Stratum8 data={analysisResult.stratum8} />;
      case 9: return analysisResult && <Stratum9 data={analysisResult.stratum9} />;
      default:
        return <div className="p-6">Select a stratum</div>;
    }
  };


  return (
    <div className={`min-h-screen bg-transparent transition-opacity duration-1000 ${showMain ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">NEXUS</span>
            </h1>
            <p className="mt-2 text-lg text-slate-400 font-light tracking-wide">Neural Evidence eXtraction & Uncertainty Synthesis</p>
        </header>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4 xl:w-1/5">
            <nav className="sticky top-8">
              <ul className="space-y-1">
                {NAV_ITEMS.map(item => {
                  const stratumId = item.id > 1 && item.id < 99 ? item.id - 1 : item.id;
                  return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveStratum(item.id)}
                      disabled={
                        (item.id !== 1 && !analysisResult)
                      }
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group relative
                        ${activeStratum === item.id 
                          ? 'bg-cyan-900/30 text-white' 
                          : 'text-slate-300 hover:bg-slate-800/60'
                        }
                      `}
                    >
                      <div className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-cyan-400 transition-all duration-300 ${activeStratum === item.id ? 'opacity-100' : 'opacity-0 scale-y-0'} group-hover:opacity-50 group-hover:scale-y-50`}></div>
                      <span className="font-semibold text-sm block pl-3">{item.id > 1 && item.id < 99 ? `${stratumId}. ` : ''}{item.name}</span>
                      <span className="text-xs text-slate-400 block pl-3">{item.description}</span>
                    </button>
                  </li>
                )})}
              </ul>
            </nav>
          </aside>
          
          <main className="flex-1">
            <div className="min-h-[600px] bg-slate-800/20 border border-slate-800/50 rounded-2xl backdrop-blur-md p-4 sm:p-6">
              {renderStratumContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;