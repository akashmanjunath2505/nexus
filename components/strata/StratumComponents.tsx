import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Card } from '../ui/Card';
import type { Stratum1Data, Stratum2Data, Stratum3Data, Stratum4Data, Stratum5Data, Stratum6Data, Stratum7Data, Stratum8Data, Stratum9Data, EtiologyCandidate } from '../../types';

const icons = {
  Summary: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a1 1 0 001 1h1.586l.293.293a1 1 0 001.414 0L8 14.586V14a1 1 0 011-1h2a1 1 0 011 1v.586l.293.293a1 1 0 001.414 0L15.414 14H17a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1zm12 0H5a1 1 0 00-1 1v8a1 1 0 001 1h.586l.293.293a1 1 0 001.414 0L10 14.586l2.293 2.293a1 1 0 001.414 0L14.414 16H15a1 1 0 001-1V5a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  Diagnosis: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  Confidence: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 18.5a11.954 11.954 0 007.834-13.501l-1.414 1.414A9.954 9.954 0 0110 16.5a9.954 9.954 0 01-5.416-10.088l-1.418-1.418zM10 2a8 8 0 110 16 8 8 0 010-16zm0 2a6 6 0 100 12A6 6 0 0010 4z" clipRule="evenodd" /></svg>,
  Syndrome: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Cluster: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 011.415 0 3 3 0 004.242 0 1 1 0 011.415-1.415 5 5 0 01-7.072 0 1 1 0 010-1.415z" clipRule="evenodd" /></svg>,
  Divergence: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  Pathway: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L16 9.586V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2.586l-3-3z" /></svg>,
  Test: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.938l-1.48-1.481A4.508 4.508 0 0013.5 10.5a4.5 4.5 0 10-9 0 4.508 4.508 0 004.02 3.957L7 14.938V16.5A1.5 1.5 0 008.5 18h3a1.5 1.5 0 001.5-1.5v-1.562z" clipRule="evenodd" /></svg>,
  Anchor: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414L9 14.586V3a1 1 0 112 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>,
  Action: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>,
  Urgency: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>,
  Audit: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 18.5a11.954 11.954 0 007.834-13.501l-1.414 1.414A9.954 9.954 0 0110 16.5a9.954 9.954 0 01-5.416-10.088l-1.418-1.418z" clipRule="evenodd" /><path fillRule="evenodd" d="M10 2a8 8 0 015.657 13.657l1.414-1.414A10 10 0 0010 0C4.612 0 .324 4.135.02 9.399l1.458.39A8.001 8.001 0 0110 2z" clipRule="evenodd" /></svg>,
  Bias: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>,
  Graph: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-1.75 4.5a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V7.5zM11.5 3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm1.75 2.5a.75.75 0 00-1.5 0v8a.75.75 0 001.5 0V5.5zM3 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.5-1.75a.75.75 0 010-1.5h8.5a.75.75 0 010 1.5H5.5zM17 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>,
  Loop: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.224 4.152l.962-.321a4.5 4.5 0 007.51-3.41l.003-.046l-.993.496a.75.75 0 01-1.06-1.06l2.25-2.25a.75.75 0 011.06 0l2.25 2.25a.75.75 0 11-1.06 1.06l-.993-.497zM4.688 8.576a5.5 5.5 0 019.224-4.152l-.962.321a4.5 4.5 0 00-7.51 3.41l-.003.046l.993-.496a.75.75 0 111.06 1.06l-2.25 2.25a.75.75 0 01-1.06 0L2.43 8.84a.75.75 0 111.06-1.06l.993.497z" clipRule="evenodd" /></svg>,
  Plan: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>,
};


const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
    const width = `${Math.round(value * 100)}%`;
    return (
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width }}></div>
        </div>
    );
};

const getUrgencyColor = (level: string) => {
    switch(level?.toUpperCase()) {
        case 'CRITICAL': return 'text-red-400';
        case 'HIGH': return 'text-orange-400';
        case 'MODERATE': return 'text-yellow-400';
        case 'LOW': return 'text-green-400';
        default: return 'text-slate-400';
    }
}


export const ExecutiveSummary: React.FC<{ data: Stratum1Data }> = ({ data }) => {
    const urgencyColor = getUrgencyColor(data.urgency.level);
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-100">Stratum 1: Executive Synthesis</h2>
                <p className="text-slate-400 mt-1">A high-level overview of the complete diagnostic analysis.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Top Diagnosis" icon={icons.Diagnosis()}>
                    <p className="text-2xl font-bold text-cyan-300 text-center">{data.topDiagnosis}</p>
                </Card>
                <Card title="Confidence Score" icon={icons.Confidence()}>
                    <p className="text-4xl font-bold text-cyan-300 text-center font-mono">{(data.confidenceScore * 100).toFixed(1)}%</p>
                </Card>
                <Card title="Clinical Urgency" icon={icons.Urgency()}>
                    <div className="text-center">
                        <p className={`text-2xl font-bold ${urgencyColor}`}>{data.urgency.level}</p>
                        <p className={`text-sm font-mono ${urgencyColor}`}>Quotient: {data.urgency.quotient.toFixed(2)}</p>
                    </div>
                </Card>
            </div>
            <Card title="Recommended Action" icon={icons.Action()}>
                <p className="text-lg font-semibold text-slate-200">{data.recommendedAction}</p>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Key Risk" icon={icons.Divergence()}>
                    <p className="text-slate-300 italic">"{data.keyRisk}"</p>
                </Card>
                 <Card title="Reasoning Coherence" icon={icons.Audit()}>
                    <p className="text-4xl font-bold text-cyan-300 text-center font-mono">{(data.reasoningCoherence * 100).toFixed(1)}%</p>
                </Card>
            </div>
        </div>
    );
};

export const Stratum2: React.FC<{ data: Stratum2Data }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <Card title="Syndrome Nodes" icon={icons.Syndrome()}>
        <ul className="space-y-4">
          {data.syndromeNodes.map(node => (
            <li key={node.name} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-200">{node.name}</span>
                    <span className="text-sm font-mono text-cyan-300">{(node.coherence * 100).toFixed(1)}%</span>
                </div>
                <ProgressBar value={node.coherence} />
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Phenocluster & Pathways" icon={icons.Cluster()}>
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-slate-300">Cluster Gravity: <span className="font-normal text-cyan-400">{data.phenoclusterMap.gravity}</span></h4>
                <h4 className="font-semibold text-slate-300">Cluster Density: <span className="font-normal text-cyan-400">{data.phenoclusterMap.density.toFixed(2)}</span></h4>
                <h4 className="font-semibold text-slate-300 mt-1">Crosstalk Index: <span className="font-normal text-cyan-400">{data.crosstalkIndex.toFixed(2)}</span></h4>
            </div>
            <div className="border-t border-slate-700 pt-4">
                <h4 className="font-bold text-slate-200 mb-2">Pathway Illuminators</h4>
                <ul className="space-y-3">
                    {data.pathwayIlluminators.map(p => (
                        <li key={p.system} className="flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-slate-200">{p.system}</span>
                                <span className="text-sm font-mono text-cyan-300">{(p.activation * 100).toFixed(1)}%</span>
                            </div>
                            <ProgressBar value={p.activation} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </Card>
      <Card title="Divergence Signals (Red Flags)" icon={icons.Divergence()} className="lg:col-span-2">
        <ul className="space-y-2">
          {data.divergenceSignals.map(signal => (
            <li key={signal.finding} className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                <span className="font-medium text-slate-300">{signal.finding}</span>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${signal.severity === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}>
                    {signal.severity}
                </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export const Stratum3: React.FC<{ data: Stratum3Data }> = ({ data }) => {
    const chartData = data.etiologyCandidates.map(c => ({
        name: c.name,
        Probability: c.postTestBelief,
        preTest: c.preTestLikelihood,
    }));

    return (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 animate-fade-in">
            <div className="xl:col-span-3">
                <Card title="Probabilistic Differential Diagnosis" icon={<div className="text-xl font-bold">Δx</div>}>
                    <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                            <XAxis type="number" domain={[0, 1]} tickFormatter={(tick) => `${tick * 100}%`} stroke="#94a3b8" />
                            <YAxis type="category" dataKey="name" width={150} stroke="#94a3b8" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                                labelStyle={{ color: '#e2e8f0' }}
                                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                            />
                            <Legend />
                            <Bar dataKey="Probability" name="Post-Test Belief" fill="#22d3ee">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={data.etiologyCandidates[index].mustNotMiss ? '#f43f5e' : '#22d3ee'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </Card>
            </div>
            <div className="xl:col-span-2 space-y-6">
                <Card title="Top Etiology Candidates" icon={icons.Anchor()}>
                    <ul className="space-y-4 max-h-[28rem] overflow-y-auto pr-2">
                        {data.etiologyCandidates.slice(0, 5).map(c => (
                            <li key={c.name} className={`p-3 rounded-lg border-l-4 transition-all duration-300 ${c.mustNotMiss ? 'border-red-500 bg-red-900/30 shadow-lg shadow-red-900/50' : 'border-cyan-500 bg-cyan-900/20'}`}>
                                <div className="flex justify-between items-baseline">
                                    <span className="font-bold text-slate-100">{c.rank}. {c.name}</span>
                                    <span className="font-mono text-lg text-cyan-300">{(c.postTestBelief * 100).toFixed(1)}%</span>
                                </div>
                                <div className="text-xs text-slate-400">CI: [{(c.confidenceInterval[0]*100).toFixed(1)}% - {(c.confidenceInterval[1]*100).toFixed(1)}%]</div>
                                <div className={`text-xs font-bold mt-1 ${getUrgencyColor(c.treatmentUrgency)}`}>Urgency: {c.treatmentUrgency}</div>
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card title="Recommended Discriminator Test" icon={icons.Test()}>
                    <h4 className="text-lg font-bold text-cyan-400">{data.recommendedTest.name}</h4>
                    <p className="text-sm text-slate-300 mt-1">{data.recommendedTest.rationale}</p>
                    <div className="flex justify-between mt-3 text-sm">
                        <span className="font-semibold text-slate-400">Potency: <span className="font-mono text-cyan-300">{data.recommendedTest.potency.toFixed(2)}</span></span>
                        <span className="font-semibold text-slate-400">InfoGain: <span className="font-mono text-cyan-300">{data.recommendedTest.informationGain.toFixed(2)}</span></span>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-sm">
        <p className="font-bold text-cyan-400">{data.name}</p>
        <p className="text-slate-300">Benefit: <span className="font-mono">{data.benefitMagnitude.toFixed(2)}</span></p>
        <p className="text-slate-300">Risk/Harm: <span className="font-mono">{data.riskHarmIndex.toFixed(2)}</span></p>
        <p className="text-slate-300">Utility: <span className="font-mono">{data.utility.toFixed(2)}</span></p>
      </div>
    );
  }
  return null;
};

export const Stratum4: React.FC<{ data: Stratum4Data }> = ({ data }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        <div className="lg:col-span-2 space-y-6">
             <Card title="Decision Nexus Visualizer" icon={icons.Action()}>
                 <div className="h-96 pr-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid stroke="#475569" strokeDasharray="3 3"/>
                            <XAxis type="number" dataKey="benefitMagnitude" name="Benefit Magnitude" stroke="#94a3b8" label={{ value: 'Benefit Magnitude', position: 'insideBottom', offset: -10, fill: '#94a3b8' }} />
                            <YAxis type="number" dataKey="riskHarmIndex" name="Risk/Harm Index" stroke="#94a3b8" label={{ value: 'Risk / Harm Index', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                            <ZAxis type="number" dataKey="utility" range={[100, 1000]} name="utility" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                            <Legend />
                            <Scatter name="Interventions" data={data.interventionVectors} fill="#22d3ee" />
                        </ScatterChart>
                    </ResponsiveContainer>
                 </div>
            </Card>
             <Card title="Decision & Regret Rationale" icon={icons.Action()}>
                 <h4 className="font-bold text-slate-200 mb-2">Decision Rationale</h4>
                 <p className="text-sm text-slate-300 italic">"{data.decisionRationale}"</p>
                 <div className="border-t border-slate-700 my-4"></div>
                 <h4 className="font-bold text-slate-200 mb-2">Regret Minimization</h4>
                 <p className="text-sm text-slate-300 italic">"{data.regretMinimizationRationale}"</p>
             </Card>
        </div>
        <div>
            <Card title="Urgency Gradient" icon={icons.Urgency()}>
                <div className="text-center my-4">
                    <div className="text-5xl font-bold text-red-400 font-mono">{(data.urgency.quotient * 100).toFixed(0)}</div>
                    <div className="text-sm text-slate-400">Urgency Quotient</div>
                </div>
                 <p className="text-sm"><span className="font-semibold text-slate-300">Window:</span> {data.urgency.window}</p>
                 <p className="text-sm"><span className="font-semibold text-slate-300">Velocity:</span> {data.urgency.velocity}</p>
            </Card>
        </div>
    </div>
);

export const Stratum5: React.FC<{ data: Stratum5Data }> = ({ data }) => (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        <Card title="Reasoning Auditor" icon={icons.Audit()}>
            <div className="space-y-4">
                <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-300 font-mono">{(data.reasoningCoherence*100).toFixed(1)}%</div>
                    <div className="mt-1 text-md text-slate-400">Reasoning Coherence</div>
                </div>
                 <div className="text-center">
                    <div className="text-4xl font-bold text-orange-400 font-mono">{data.closureFriction.toFixed(2)}</div>
                    <div className="mt-1 text-md text-slate-400">Closure Friction</div>
                </div>
                 {data.agnosiaAlert && (
                     <div className="border-t border-slate-700 pt-4 text-center">
                        <h4 className="font-bold text-yellow-400 flex items-center justify-center"><icons.Divergence/> <span className="ml-2">Agnosia Alert</span></h4>
                        <p className="text-sm text-yellow-300 italic mt-1">"{data.agnosiaAlert}"</p>
                    </div>
                )}
            </div>
        </Card>
        <Card title="Cognitive Bias Audit" icon={icons.Bias()}>
            <div className="text-center mb-4">
                <div className="text-4xl font-bold text-yellow-400 font-mono">{(data.biasRisk.score*100).toFixed(1)}%</div>
                <div className="mt-1 text-md text-slate-400">Overall Bias Risk Score</div>
            </div>
            <div className="space-y-3">
                <h4 className="font-semibold text-slate-200">Suspected Biases:</h4>
                {data.biasRisk.suspectedBiases.length > 0 ? (
                    <ul className="space-y-2">
                        {data.biasRisk.suspectedBiases.map(bias => (
                            <li key={bias.type} className="p-2 bg-slate-800/60 rounded-md">
                                <p className="font-bold text-yellow-300">{bias.type}</p>
                                <p className="text-xs text-slate-300 italic">Rationale: {bias.rationale}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-slate-400">No specific cognitive biases flagged at this time.</p>
                )}
            </div>
        </Card>

        <div className="md:col-span-2">
             <Card title="Metacognitive Checks" icon={icons.Audit()}>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-slate-200">BayesLoom Audit Summary</h4>
                        <p className="text-sm text-slate-300 italic">"{data.bayesLoomSummary}"</p>
                    </div>
                    <div className="border-t border-slate-700 pt-4">
                        <h4 className="font-bold text-slate-200">Contra-Pulse Hypothesis</h4>
                        <p className="text-slate-300 text-md italic leading-relaxed">"To challenge the leading hypothesis, consider this damaging counter-hypothesis: <span className="font-semibold text-cyan-300 not-italic">{data.contraPulse}</span>"</p>
                    </div>
                </div>
             </Card>
        </div>
    </div>
);

export const Stratum6: React.FC<{ data: Stratum6Data }> = ({ data }) => (
    <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Pathomechanistic Weave" icon={icons.Graph()}>
                <ul className="space-y-2">
                    {data.pathomechWeave.map((weave, i) => (
                        <li key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                            <span className="text-sm text-cyan-400">{weave.phenocluster}</span>
                            <svg className="w-8 h-8 text-slate-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 8l-4 4l4 4" />
                                <path d="M17 8l4 4l-4 4" />
                                <path d="M3 12l18 0" />
                            </svg>
                            <span className="text-sm text-lime-400">{weave.mechanism}</span>
                            <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded">Tension: {weave.tension.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </Card>
            <Card title="Crosstalk Tensor" icon={icons.Pathway()}>
                <p className="text-slate-300">Analysis of multi-organ system dynamics:</p>
                <p className="text-lg font-semibold text-center mt-4 text-cyan-300 italic">"{data.crosstalkTensor}"</p>
            </Card>
        </div>
        {data.mechanismAnchors && data.mechanismAnchors.length > 0 && (
            <Card title="Mechanism Anchors" icon={icons.Anchor()}>
                <p className="text-sm text-slate-400 mb-3">Key findings with high mechanistic specificity.</p>
                <ul className="space-y-2">
                    {data.mechanismAnchors.map((anchor, i) => (
                        <li key={i} className="p-2 bg-slate-800/50 rounded flex justify-between items-center">
                            <span className="font-semibold text-cyan-400">{anchor.name}</span>
                            <span className="text-sm text-slate-300 text-right">{anchor.specificity}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        )}
    </div>
);


export const Stratum7: React.FC<{ data: Stratum7Data }> = ({ data }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        <Card title="Kairós Window & Hinge Thresholds" icon={icons.Urgency()}>
            <h4 className="font-bold text-slate-200">Intervention Window (Kairós)</h4>
            <p className="mt-1 text-cyan-400 italic">"{data.kairosWindow}"</p>
            <div className="border-t border-slate-700 mt-4 pt-4">
                 <h4 className="font-bold text-slate-200">Dynamic Hinge Thresholds</h4>
                 <p className="mt-1 text-slate-300 italic">"{data.hingeThresholds}"</p>
            </div>
        </Card>
        <Card title="Regret Surface Analysis" icon={icons.Divergence()}>
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-slate-200">Regret if ACT (but wrong):</h4>
                    <p className="mt-1 text-sm text-yellow-400 italic">"{data.regretSurface.act}"</p>
                </div>
                 <div>
                    <h4 className="font-bold text-slate-200">Regret if DO NOT ACT (but should have):</h4>
                    <p className="mt-1 text-sm text-red-400 italic">"{data.regretSurface.notAct}"</p>
                </div>
            </div>
        </Card>
    </div>
);

export const Stratum8: React.FC<{ data: Stratum8Data }> = ({ data }) => (
    <div className="space-y-6 animate-fade-in">
        <Card title="Praxis Loop: System Learning & Calibration" icon={icons.Loop()}>
            <div className="space-y-4">
                <div className="p-3 bg-slate-800/40 rounded-lg">
                    <h4 className="font-semibold text-cyan-300">EvidentiaGraph Summary</h4>
                    <p className="text-sm text-slate-300 mt-1 italic">"{data.evidentiaGraphSummary}"</p>
                </div>
                <div className="p-3 bg-slate-800/40 rounded-lg">
                    <h4 className="font-semibold text-cyan-300">Guardrails Charter Check</h4>
                    <p className="text-sm text-slate-300 mt-1 italic">"{data.guardrailsCharterCheck}"</p>
                </div>
            </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Delta-Calibration Update" icon={icons.Loop()}>
                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Target Demographic</p>
                        <p className="font-medium text-cyan-400">{data.deltaCalibrationUpdate.targetDemographic}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Prior Adjustment</p>
                        <p className="font-medium text-cyan-400">{data.deltaCalibrationUpdate.priorAdjustment}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Rationale</p>
                        <p className="text-sm text-slate-300 italic">"{data.deltaCalibrationUpdate.rationale}"</p>
                    </div>
                </div>
            </Card>

            {data.driftSentinelAlert ? (
                <Card title="Drift Sentinel Alert" icon={icons.Divergence()} className="border-yellow-500/50">
                     <div className="space-y-3">
                        <div>
                            <p className="text-xs text-yellow-300 uppercase font-bold">Source</p>
                            <p className="font-medium text-yellow-400">{data.driftSentinelAlert.source}</p>
                        </div>
                        <div>
                            <p className="text-xs text-yellow-300 uppercase font-bold">Anomaly Detected (Confidence: {(data.driftSentinelAlert.confidence * 100).toFixed(0)}%)</p>
                            <p className="text-sm text-yellow-200 italic">"{data.driftSentinelAlert.anomaly}"</p>
                        </div>
                        <div>
                            <p className="text-xs text-yellow-300 uppercase font-bold">Recommendation</p>
                            <p className="font-medium text-yellow-400">{data.driftSentinelAlert.recommendation}</p>
                        </div>
                    </div>
                </Card>
            ) : (
                 <Card title="Drift Sentinel" icon={icons.Divergence()}>
                    <p className="text-slate-400 text-center py-8">No data drift detected in this analysis.</p>
                 </Card>
            )}
        </div>
    </div>
);

export const Stratum9: React.FC<{ data: Stratum9Data }> = ({ data }) => (
    <div className="space-y-6 animate-fade-in">
        <Card title="Immediate Actions" icon={icons.Action()}>
            <ul className="list-disc list-inside space-y-2 text-cyan-300">
                {data.immediateActions.map((action, i) => (
                    <li key={i}><span className="text-slate-200">{action}</span></li>
                ))}
            </ul>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Monitoring Plan" icon={icons.Urgency()}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-400 uppercase">
                            <tr>
                                <th className="py-2 pr-2">Parameter</th>
                                <th className="py-2 px-2">Frequency</th>
                                <th className="py-2 pl-2">Alert Threshold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.monitoringParameters.map((p, i) => (
                                <tr key={i} className="border-t border-slate-700">
                                    <td className="py-2 pr-2 font-semibold text-slate-200">{p.parameter}</td>
                                    <td className="py-2 px-2 text-slate-300">{p.frequency}</td>
                                    <td className="py-2 pl-2 text-yellow-400">{p.alertThreshold}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Card title="Escalation Triggers" icon={icons.Divergence()}>
                <ul className="list-disc list-inside space-y-2 text-red-400">
                    {data.escalationTriggers.map((trigger, i) => (
                        <li key={i}><span className="text-slate-200">{trigger}</span></li>
                    ))}
                </ul>
            </Card>
        </div>

        <Card title="Contingency Plans" icon={icons.Plan()}>
            <div className="space-y-4">
                {data.contingencyPlans.map((plan, i) => (
                    <div key={i} className="p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-sm font-semibold text-slate-300">
                            <span className="text-yellow-400 font-bold">IF:</span> {plan.ifCondition}
                        </p>
                        <p className="text-sm font-semibold text-slate-300 mt-1">
                             <span className="text-cyan-400 font-bold">THEN:</span> {plan.thenAction}
                        </p>
                    </div>
                ))}
            </div>
        </Card>
    </div>
);