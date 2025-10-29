import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Card } from '../ui/Card';
import type { ModelBenchmarkResults } from '../../types';

interface BenchmarkViewProps {
  results: ModelBenchmarkResults;
  baselineData: Omit<ModelBenchmarkResults, 'detailedResults'>[];
}

const icons = {
  Benchmark: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>,
  Table: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM4 8h5v2H4V8z" clipRule="evenodd" /></svg>,
};


export const BenchmarkView: React.FC<BenchmarkViewProps> = ({ results, baselineData }) => {
    
    const allModels = [
        ...baselineData,
        { modelName: results.modelName, summary: { ...results.summary } }
    ];

    const metrics = ['Overall Accuracy', 'Diagnostic Accuracy', 'Reasoning', 'Safety'];
    const radarData = metrics.map(metric => {
        const dataPoint: { subject: string, [key: string]: string | number } = { subject: metric };
        allModels.forEach(model => {
            let value;
            switch (metric) {
                case 'Overall Accuracy':
                    value = model.summary.accuracy;
                    break;
                case 'Diagnostic Accuracy':
                    value = model.summary.accuracyByCategory.diagnosis || 0;
                    break;
                case 'Reasoning':
                    value = model.summary.avgReasoningScore;
                    break;
                case 'Safety':
                    value = model.summary.safetyScore;
                    break;
                default:
                    value = 0;
            }
            dataPoint[model.modelName] = value;
        });
        return dataPoint;
    });
    
    const categoryData = Object.entries(results.summary.accuracyByCategory).map(([name, value]) => ({
        name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        Accuracy: value,
    }));


    const formatAccuracy = (value: number) => `${(value * 100).toFixed(0)}%`;
    const formatLatency = (value: number) => `${Math.round(value)}ms`;

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fade-in">
        <Card title={`Benchmark Results: ${results.modelName}`} icon={icons.Benchmark()}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                    <div className="text-3xl font-bold text-cyan-400">{formatAccuracy(results.summary.accuracy)}</div>
                    <div className="text-sm text-slate-400">Overall Accuracy</div>
                </div>
                 <div>
                    <div className="text-3xl font-bold text-cyan-400">{formatLatency(results.summary.avgLatency)}</div>
                    <div className="text-sm text-slate-400">Avg. Latency</div>
                </div>
                 <div>
                    <div className="text-3xl font-bold text-cyan-400">{results.summary.safetyScore.toFixed(3)}</div>
                    <div className="text-sm text-slate-400">Safety Score</div>
                </div>
                 <div>
                    <div className="text-3xl font-bold text-cyan-400">${results.summary.cost.toFixed(3)}</div>
                    <div className="text-sm text-slate-400">Avg. Cost/Case</div>
                </div>
            </div>
        </Card>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card title="Holistic Performance Comparison" icon={icons.Benchmark()}>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#475569" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} 
                                formatter={(value: number, name: string) => [`${(value * 100).toFixed(1)}%`, name]}
                            />
                            <Legend />
                            <Radar name="GPT-4 Turbo (Baseline)" dataKey="GPT-4 Turbo (Baseline)" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.2} />
                            <Radar name="Claude 3 Opus (Baseline)" dataKey="Claude 3 Opus (Baseline)" stroke="#f472b6" fill="#f472b6" fillOpacity={0.2} />
                            <Radar name={results.modelName} dataKey={results.modelName} stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card title="Performance by Category" icon={icons.Benchmark()}>
                 <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                            <XAxis type="number" domain={[0, 1]} tickFormatter={formatAccuracy} stroke="#94a3b8" />
                            <YAxis type="category" dataKey="name" stroke="#94a3b8" width={120} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                                formatter={(value: number) => formatAccuracy(value)}
                            />
                            <Bar dataKey="Accuracy" fill="#22d3ee" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>


        <Card title="Detailed Test Case Results" icon={icons.Table()}>
            <div className="overflow-x-auto max-h-[400px]">
                <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-cyan-300 uppercase bg-slate-800/60 sticky top-0">
                        <tr>
                            <th scope="col" className="px-4 py-3">Case ID</th>
                            <th scope="col" className="px-4 py-3">Model Diagnosis</th>
                            <th scope="col" className="px-4 py-3">Gold Standard</th>
                            <th scope="col" className="px-4 py-3">Reasoning</th>
                            <th scope="col" className="px-4 py-3">Hallucination</th>
                            <th scope="col" className="px-4 py-3">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.detailedResults.map(res => (
                            <tr key={res.testCase.id} className="border-b border-slate-700 hover:bg-slate-800/40">
                                <td className="px-4 py-2 font-mono text-slate-400">{res.testCase.id}</td>
                                <td className="px-4 py-2">{res.topDiagnosis}</td>
                                <td className="px-4 py-2 text-slate-400">{res.testCase.goldStandard.topDiagnosis}</td>
                                <td className="px-4 py-2 font-mono text-center">{(res.reasoningScore * 100).toFixed(0)}%</td>
                                <td className="px-4 py-2">
                                     {res.hallucinationCheck ? (
                                        <span className="px-2 py-1 font-semibold text-xs bg-green-500/20 text-green-300 rounded-full">Pass</span>
                                    ) : (
                                        <span className="px-2 py-1 font-semibold text-xs bg-red-500/20 text-red-300 rounded-full">Fail</span>
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {res.isCorrect ? (
                                        <span className="px-2 py-1 font-semibold text-xs bg-green-500/20 text-green-300 rounded-full">Correct</span>
                                    ) : (
                                        <span className="px-2 py-1 font-semibold text-xs bg-red-500/20 text-red-300 rounded-full">Incorrect</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
  );
};