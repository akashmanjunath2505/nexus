import React from 'react';
import { Card } from '../ui/Card';
import type { ModelBenchmarkResults, TestCaseResult } from '../../types';
import { BOOK_BENCHMARK_TEST_SUITE } from '../../data/bookBenchmarkData';

interface BookBenchmarkViewProps {
  results: TestCaseResult[];
  isLoading: boolean;
  finalSummary: ModelBenchmarkResults | null;
}

const icons = {
  Benchmark: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>,
  Table: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM4 8h5v2H4V8z" clipRule="evenodd" /></svg>,
};

export const BookBenchmarkView: React.FC<BookBenchmarkViewProps> = ({ results, isLoading, finalSummary }) => {
    const totalCases = BOOK_BENCHMARK_TEST_SUITE.length;
    const processedCases = results.length;
    const correctCount = results.filter(r => r.isCorrect).length;
    const progress = totalCases > 0 ? (processedCases / totalCases) * 100 : 0;
    const currentAccuracy = processedCases > 0 ? (correctCount / processedCases) * 100 : 0;

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fade-in">
        <Card title={`Benchmark: "100 Cases in Clinical Medicine"`} icon={icons.Benchmark()}>
            {isLoading && (
                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-cyan-300">Running Test Cases...</span>
                        <span className="text-sm font-medium text-cyan-300">{processedCases} / {totalCases}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <div className="bg-cyan-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                    <div className="text-3xl font-bold text-cyan-400">{correctCount} / {processedCases}</div>
                    <div className="text-sm text-slate-400">Correct Diagnoses</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-cyan-400">{currentAccuracy.toFixed(1)}%</div>
                    <div className="text-sm text-slate-400">Current Accuracy</div>
                </div>
                 <div>
                    <div className={`text-3xl font-bold ${isLoading ? 'text-slate-500' : 'text-cyan-400'}`}>
                        {isLoading ? '...' : `${(finalSummary?.summary.avgLatency ?? 0).toFixed(0)}ms`}
                    </div>
                    <div className="text-sm text-slate-400">Avg. Latency</div>
                </div>
            </div>
            {!isLoading && finalSummary && (
                 <div className="mt-4 text-center text-lg font-semibold text-green-400">
                    Benchmark Complete! Final Accuracy: {formatAccuracy(finalSummary.summary.accuracy)}
                </div>
            )}
        </Card>
        
        <Card title="Detailed Test Case Results" icon={icons.Table()}>
            <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-cyan-300 uppercase bg-slate-800/60 sticky top-0 backdrop-blur-sm">
                        <tr>
                            <th scope="col" className="px-4 py-3">Case ID</th>
                            <th scope="col" className="px-4 py-3">Model Diagnosis</th>
                            <th scope="col" className="px-4 py-3">Gold Standard</th>
                            <th scope="col" className="px-4 py-3">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(res => (
                            <tr key={res.testCase.id} className={`border-b border-slate-700 hover:bg-slate-800/40 ${res.isCorrect ? 'animate-flash-green' : 'animate-flash-red'}`}>
                                <td className="px-4 py-2 font-mono text-slate-400">{res.testCase.id}</td>
                                <td className="px-4 py-2">{res.topDiagnosis}</td>
                                <td className="px-4 py-2 text-slate-400">{res.testCase.goldStandard.topDiagnosis}</td>
                                <td className="px-4 py-2">
                                    {res.isCorrect ? (
                                        <span className="px-2 py-1 font-semibold text-xs bg-green-500/20 text-green-300 rounded-full">Correct</span>
                                    ) : (
                                        <span className="px-2 py-1 font-semibold text-xs bg-red-500/20 text-red-300 rounded-full">Incorrect</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                         {isLoading && (
                             <tr className="border-b border-slate-700">
                                <td colSpan={4} className="text-center p-4">
                                    <div className="flex items-center justify-center space-x-2 text-slate-400">
                                         <div className="w-4 h-4 border-2 border-t-cyan-400 border-slate-600 rounded-full animate-spin"></div>
                                         <span>Analyzing next case...</span>
                                    </div>
                                </td>
                            </tr>
                         )}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
  );
};

const formatAccuracy = (value: number) => `${(value * 100).toFixed(1)}%`;