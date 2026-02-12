import React, { useState, useEffect } from 'react';
import { Play, Trash2, Info, Clock, Zap, TrendingUp } from 'lucide-react';

const AlgorithmAnalyzer = () => {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('editor');

  // Example algorithms for quick start
  const examples = {
    bubbleSort: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    binarySearch: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    fibonacci: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`
  };

  const analyzeAlgorithm = () => {
    setAnalyzing(true);
    
    setTimeout(() => {
      const result = performAnalysis(code);
      setAnalysis(result);
      setAnalyzing(false);
      setSelectedTab('results');
    }, 800);
  };

  const performAnalysis = (code) => {
    const lines = code.split('\n').filter(line => line.trim());
    
    // Detect loops
    const forLoops = (code.match(/for\s*\(/g) || []).length;
    const whileLoops = (code.match(/while\s*\(/g) || []).length;
    const recursiveCalls = detectRecursion(code);
    
    // Determine complexity
    let timeComplexity = 'O(1)';
    let spaceComplexity = 'O(1)';
    let explanation = [];
    let steps = [];
    
    // Nested loops analysis
    if (forLoops >= 2 || whileLoops >= 2) {
      const nestedCount = Math.max(forLoops, whileLoops);
      if (nestedCount === 2) {
        timeComplexity = 'O(n²)';
        explanation.push('Detected nested loops: 2 levels of iteration');
        steps.push({
          step: 1,
          operation: 'Outer loop iteration',
          cost: 'n iterations',
          total: 'n'
        });
        steps.push({
          step: 2,
          operation: 'Inner loop iteration (per outer)',
          cost: 'n iterations',
          total: 'n × n = n²'
        });
      } else if (nestedCount === 3) {
        timeComplexity = 'O(n³)';
        explanation.push('Detected 3 levels of nested loops');
        steps.push({
          step: 1,
          operation: 'Triple nested iteration',
          cost: 'n × n × n',
          total: 'n³'
        });
      }
    } else if (forLoops === 1 || whileLoops === 1) {
      timeComplexity = 'O(n)';
      explanation.push('Single loop detected: linear time');
      steps.push({
        step: 1,
        operation: 'Loop iteration',
        cost: 'n iterations',
        total: 'n'
      });
    }
    
    // Recursion analysis
    if (recursiveCalls.isRecursive) {
      if (recursiveCalls.count >= 2) {
        timeComplexity = 'O(2ⁿ)';
        explanation.push('Multiple recursive calls detected (exponential)');
        steps.push({
          step: 1,
          operation: 'Recursive branching',
          cost: '2 calls per level',
          total: '2ⁿ (tree height n)'
        });
      } else {
        timeComplexity = 'O(n)';
        explanation.push('Single recursive call (linear recursion)');
        steps.push({
          step: 1,
          operation: 'Recursive call stack',
          cost: 'n levels deep',
          total: 'n'
        });
      }
      spaceComplexity = 'O(n)';
      explanation.push('Recursion uses call stack space');
    }
    
    // Binary search pattern
    if (code.includes('mid') && (code.includes('left') || code.includes('right'))) {
      timeComplexity = 'O(log n)';
      explanation.push('Binary search pattern: dividing search space');
      steps = [{
        step: 1,
        operation: 'Search space division',
        cost: 'Halves each iteration',
        total: 'log₂(n)'
      }];
    }
    
    // Arrays/space usage
    const arrayDeclarations = (code.match(/\[\]|new Array/g) || []).length;
    if (arrayDeclarations > 0) {
      spaceComplexity = 'O(n)';
      explanation.push(`${arrayDeclarations} array(s) allocated`);
    }
    
    // Calculate example values
    const exampleCalcs = calculateExamples(timeComplexity);
    
    return {
      timeComplexity,
      spaceComplexity,
      explanation,
      steps,
      exampleCalcs,
      linesOfCode: lines.length,
      loopCount: forLoops + whileLoops,
      recursiveDepth: recursiveCalls.isRecursive ? 'Yes' : 'No'
    };
  };

  const detectRecursion = (code) => {
    const functionName = code.match(/function\s+(\w+)/);
    if (!functionName) return { isRecursive: false, count: 0 };
    
    const name = functionName[1];
    const calls = code.match(new RegExp(name + '\\s*\\(', 'g')) || [];
    
    return {
      isRecursive: calls.length > 1,
      count: calls.length - 1
    };
  };

  const calculateExamples = (complexity) => {
    const sizes = [10, 100, 1000, 10000];
    return sizes.map(n => {
      let operations;
      switch(complexity) {
        case 'O(1)': operations = 1; break;
        case 'O(log n)': operations = Math.ceil(Math.log2(n)); break;
        case 'O(n)': operations = n; break;
        case 'O(n log n)': operations = n * Math.ceil(Math.log2(n)); break;
        case 'O(n²)': operations = n * n; break;
        case 'O(n³)': operations = n * n * n; break;
        case 'O(2ⁿ)': operations = n <= 20 ? Math.pow(2, n) : '> 1 million'; break;
        default: operations = n;
      }
      return { n, operations };
    });
  };

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  const getComplexityColor = (complexity) => {
    const colors = {
      'O(1)': 'from-emerald-400 to-teal-500',
      'O(log n)': 'from-green-400 to-emerald-500',
      'O(n)': 'from-blue-400 to-cyan-500',
      'O(n log n)': 'from-yellow-400 to-orange-500',
      'O(n²)': 'from-orange-400 to-red-500',
      'O(n³)': 'from-red-400 to-pink-500',
      'O(2ⁿ)': 'from-pink-500 to-purple-600'
    };
    return colors[complexity] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" style={{
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    }}>
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 150, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 150, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 150, 0.05) 2px, rgba(0, 255, 150, 0.05) 4px)',
        animation: 'scanline 8s linear infinite'
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&display=swap');
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(0, 255, 150, 0.5),
                       0 0 20px rgba(0, 255, 150, 0.3),
                       0 0 30px rgba(0, 255, 150, 0.2);
        }
        
        .glow-border {
          box-shadow: 0 0 15px rgba(0, 255, 150, 0.3),
                      inset 0 0 15px rgba(0, 255, 150, 0.1);
        }
        
        textarea:focus, input:focus {
          outline: none;
          box-shadow: 0 0 20px rgba(0, 255, 150, 0.4);
        }
        
        .terminal-text::before {
          content: '> ';
          color: #00ff96;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-bold mb-4 glow-text tracking-tight" style={{
            background: 'linear-gradient(to right, #00ff96, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}>
            ALGORITHM ANALYZER
          </h1>
          <p className="text-xl text-gray-400 tracking-wide">
            Real-time complexity analysis & performance metrics
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" style={{animation: 'pulse 2s infinite'}} />
            <span>SYSTEM ONLINE</span>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-gray-800">
          {['editor', 'results', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 font-semibold uppercase tracking-wider transition-all ${
                selectedTab === tab
                  ? 'text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Editor Tab */}
          {selectedTab === 'editor' && (
            <div className="animate-slide-in">
              <div className="bg-gray-900 border border-emerald-900/30 rounded-lg overflow-hidden glow-border">
                <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                  <span className="text-emerald-400 font-semibold flex items-center gap-2">
                    <Zap size={16} />
                    CODE INPUT
                  </span>
                  <button
                    onClick={() => setCode('')}
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    CLEAR
                  </button>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste your algorithm here...
function example(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}"
                  className="w-full h-96 bg-black text-gray-100 p-6 font-mono resize-none border-none focus:outline-none"
                  style={{ fontSize: '14px', lineHeight: '1.6' }}
                />
              </div>

              {/* Quick Examples */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setCode(examples.bubbleSort)}
                  className="bg-gray-900 border border-gray-700 hover:border-emerald-500 p-4 rounded-lg transition-all text-left"
                >
                  <div className="text-emerald-400 font-semibold mb-2">Bubble Sort</div>
                  <div className="text-gray-500 text-sm">O(n²) - Nested loops</div>
                </button>
                <button
                  onClick={() => setCode(examples.binarySearch)}
                  className="bg-gray-900 border border-gray-700 hover:border-emerald-500 p-4 rounded-lg transition-all text-left"
                >
                  <div className="text-emerald-400 font-semibold mb-2">Binary Search</div>
                  <div className="text-gray-500 text-sm">O(log n) - Divide & conquer</div>
                </button>
                <button
                  onClick={() => setCode(examples.fibonacci)}
                  className="bg-gray-900 border border-gray-700 hover:border-emerald-500 p-4 rounded-lg transition-all text-left"
                >
                  <div className="text-emerald-400 font-semibold mb-2">Fibonacci</div>
                  <div className="text-gray-500 text-sm">O(2ⁿ) - Exponential</div>
                </button>
              </div>

              {/* Analyze Button */}
              <button
                onClick={analyzeAlgorithm}
                disabled={!code.trim() || analyzing}
                className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-3 text-lg"
              >
                {analyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <Play size={20} />
                    ANALYZE ALGORITHM
                  </>
                )}
              </button>
            </div>
          )}

          {/* Results Tab */}
          {selectedTab === 'results' && analysis && (
            <div className="animate-slide-in space-y-6">
              {/* Complexity Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 glow-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-emerald-400" size={24} />
                    <h3 className="text-xl font-semibold text-gray-300">Time Complexity</h3>
                  </div>
                  <div className={`text-5xl font-bold bg-gradient-to-r ${getComplexityColor(analysis.timeComplexity)} bg-clip-text text-transparent`}>
                    {analysis.timeComplexity}
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 glow-border">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="text-cyan-400" size={24} />
                    <h3 className="text-xl font-semibold text-gray-300">Space Complexity</h3>
                  </div>
                  <div className={`text-5xl font-bold bg-gradient-to-r ${getComplexityColor(analysis.spaceComplexity)} bg-clip-text text-transparent`}>
                    {analysis.spaceComplexity}
                  </div>
                </div>
              </div>

              {/* Analysis Details */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="text-emerald-400" size={24} />
                  <h3 className="text-xl font-semibold">Analysis Details</h3>
                </div>
                <div className="space-y-2">
                  {analysis.explanation.map((exp, idx) => (
                    <div key={idx} className="terminal-text text-gray-300">
                      {exp}
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                  <div>
                    <div className="text-gray-500 text-sm">Lines of Code</div>
                    <div className="text-2xl font-bold text-emerald-400">{analysis.linesOfCode}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Loop Count</div>
                    <div className="text-2xl font-bold text-emerald-400">{analysis.loopCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Recursive</div>
                    <div className="text-2xl font-bold text-emerald-400">{analysis.recursiveDepth}</div>
                  </div>
                </div>
              </div>

              {/* Calculation Steps */}
              {analysis.steps.length > 0 && (
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">Calculation Steps</h3>
                  <div className="space-y-4">
                    {analysis.steps.map((step, idx) => (
                      <div key={idx} className="bg-black border border-gray-800 rounded p-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-500 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold mb-1">{step.operation}</div>
                            <div className="text-gray-400 text-sm mb-2">Cost: {step.cost}</div>
                            <div className="text-emerald-400 font-mono">Total: {step.total}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Examples */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Performance Examples</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Input Size (n)</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.exampleCalcs.map((calc, idx) => (
                        <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <td className="py-3 px-4 font-mono text-emerald-400">{calc.n.toLocaleString()}</td>
                          <td className="py-3 px-4 font-mono text-cyan-400">{formatNumber(calc.operations)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'results' && !analysis && (
            <div className="text-center py-20 text-gray-500">
              <Info size={48} className="mx-auto mb-4 opacity-50" />
              <p>No analysis results yet. Analyze an algorithm first.</p>
            </div>
          )}

          {/* Examples Tab */}
          {selectedTab === 'examples' && (
            <div className="animate-slide-in">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-6 text-emerald-400">Common Algorithm Complexities</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Constant Time', complexity: 'O(1)', example: 'Array access, hash table lookup', color: 'emerald' },
                    { name: 'Logarithmic', complexity: 'O(log n)', example: 'Binary search, balanced tree operations', color: 'green' },
                    { name: 'Linear', complexity: 'O(n)', example: 'Array traversal, linear search', color: 'blue' },
                    { name: 'Linearithmic', complexity: 'O(n log n)', example: 'Merge sort, heap sort, quick sort (avg)', color: 'yellow' },
                    { name: 'Quadratic', complexity: 'O(n²)', example: 'Bubble sort, selection sort, nested loops', color: 'orange' },
                    { name: 'Cubic', complexity: 'O(n³)', example: 'Matrix multiplication, triple nested loops', color: 'red' },
                    { name: 'Exponential', complexity: 'O(2ⁿ)', example: 'Fibonacci (naive), subsets generation', color: 'pink' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-black border border-gray-800 rounded-lg p-4 hover:border-emerald-500/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-lg text-white mb-1">{item.name}</div>
                          <div className="text-gray-400 text-sm">{item.example}</div>
                        </div>
                        <div className={`text-3xl font-bold text-${item.color}-400`}>
                          {item.complexity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p>Built with React • Analyze any algorithm complexity in real-time</p>
        </footer>
      </div>
    </div>
  );
};

export default AlgorithmAnalyzer;