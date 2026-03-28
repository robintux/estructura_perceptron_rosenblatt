import React, { useState } from 'react';
import { Info, Zap, Sigma, ArrowRight, Settings } from 'lucide-react';

const PerceptronDiagram = () => {
  const [hoveredPart, setHoveredPart] = useState(null);

  const components = {
    inputs: {
      title: "Unidades de Entrada (Input Units)",
      desc: "Reciben las señales del entorno ($x_1, x_2, ..., x_n$). No procesan, solo distribuyen.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    weights: {
      title: "Pesos Sinápticos ($w_i$)",
      desc: "Representan la fuerza de la conexión. Multiplican cada entrada antes de la suma.",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    bias: {
      title: "Sesgo o Bias ($b$)",
      desc: "Parámetro que desplaza la función de activación, actuando como un umbral ajustable.",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    sum: {
      title: "Función de Suma",
      desc: "Calcula la combinación lineal: $z = \\sum (w_i x_i) + b$.",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    activation: {
      title: "Función de Activación",
      desc: "Transforma la suma en la salida final. Tradicionalmente es la función escalón de Heaviside.",
      color: "text-rose-600",
      bg: "bg-rose-50"
    },
    output: {
      title: "Salida ($y$)",
      desc: "El resultado final de la clasificación o decisión de la neurona.",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans text-slate-800">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="p-8 text-center bg-slate-900 text-white">
          <h1 className="text-3xl font-bold mb-2">Estructura del Perceptrón</h1>
          <p className="text-slate-400">La forma más simple de red neuronal artificial</p>
        </div>

        <div className="p-8">
          {/* SVG Diagram Area */}
          <div className="relative w-full h-[400px] mb-8 flex items-center justify-center bg-white rounded-xl">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              {/* Lines / Connections */}
              <g stroke="#94a3b8" strokeWidth="2">
                {/* Connections from Inputs to Sum */}
                <path d="M150 100 L380 180" strokeDasharray={hoveredPart === 'weights' ? '5,5' : '0'} className={hoveredPart === 'weights' ? 'animate-pulse stroke-amber-500' : ''} />
                <path d="M150 200 L380 200" strokeDasharray={hoveredPart === 'weights' ? '5,5' : '0'} className={hoveredPart === 'weights' ? 'animate-pulse stroke-amber-500' : ''} />
                <path d="M150 300 L380 220" strokeDasharray={hoveredPart === 'weights' ? '5,5' : '0'} className={hoveredPart === 'weights' ? 'animate-pulse stroke-amber-500' : ''} />
                
                {/* Connection from Bias to Sum */}
                <path d="M400 80 L400 160" className={hoveredPart === 'bias' ? 'stroke-purple-500' : ''} />
                
                {/* Connection Sum to Activation */}
                <path d="M420 200 L540 200" />
                
                {/* Connection Activation to Output */}
                <path d="M620 200 L720 200" />
              </g>

              {/* Input Nodes */}
              {[100, 200, 300].map((y, i) => (
                <g key={i} onMouseEnter={() => setHoveredPart('inputs')} onMouseLeave={() => setHoveredPart(null)} className="cursor-help">
                  <circle cx="150" cy={y} r="25" fill="#3b82f6" className="transition-all duration-300 hover:r-[28]" />
                  <text x="150" y={y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">x{i+1}</text>
                  {i === 1 && <text x="100" y={y + 5} textAnchor="end" className="text-xs fill-slate-500 font-medium">Entradas</text>}
                </g>
              ))}

              {/* Weights Labels */}
              {[140, 200, 260].map((y, i) => (
                <g key={i} onMouseEnter={() => setHoveredPart('weights')} onMouseLeave={() => setHoveredPart(null)}>
                  <rect x="230" y={y - 10} width="35" height="20" rx="4" fill="white" stroke="#d97706" />
                  <text x="247" y={y + 5} textAnchor="middle" className="fill-amber-700 text-[12px] font-bold">w{i+1}</text>
                </g>
              ))}

              {/* Bias Node */}
              <g onMouseEnter={() => setHoveredPart('bias')} onMouseLeave={() => setHoveredPart(null)} className="cursor-help">
                <circle cx="400" cy="60" r="25" fill="#a855f7" className="transition-all duration-300 hover:r-[28]" />
                <text x="400" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">b</text>
                <text x="400" y="30" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Sesgo</text>
              </g>

              {/* Summation Node (Combined with Activation) */}
              <g onMouseEnter={() => setHoveredPart('sum')} onMouseLeave={() => setHoveredPart(null)} className="cursor-help">
                <circle cx="400" cy="200" r="40" fill="#10b981" />
                <text x="400" y="208" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">∑</text>
                <text x="400" y="255" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Suma Lineal</text>
              </g>

              {/* Activation Node */}
              <g onMouseEnter={() => setHoveredPart('activation')} onMouseLeave={() => setHoveredPart(null)} className="cursor-help">
                <rect x="540" y="160" width="80" height="80" rx="12" fill="#f43f5e" />
                {/* Step Function Icon */}
                <path d="M555 220 L580 220 L580 180 L605 180" fill="none" stroke="white" strokeWidth="3" />
                <text x="580" y="255" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Activación</text>
              </g>

              {/* Output Arrow & Node */}
              <g onMouseEnter={() => setHoveredPart('output')} onMouseLeave={() => setHoveredPart(null)} className="cursor-help">
                <path d="M720 200 L740 190 L740 210 Z" fill="#6366f1" />
                <text x="750" y="205" className="fill-indigo-700 font-bold text-lg">y</text>
                <text x="740" y="235" textAnchor="middle" className="text-xs fill-slate-500 font-medium">Salida</text>
              </g>
            </svg>
          </div>

          {/* Info Panel */}
          <div className={`p-6 rounded-xl transition-all duration-300 ${hoveredPart ? components[hoveredPart].bg : 'bg-slate-100'}`}>
            {hoveredPart ? (
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full bg-white shadow-sm ${components[hoveredPart].color}`}>
                  {hoveredPart === 'inputs' && <Zap size={24} />}
                  {hoveredPart === 'weights' && <Settings size={24} />}
                  {hoveredPart === 'bias' && <Info size={24} />}
                  {hoveredPart === 'sum' && <Sigma size={24} />}
                  {hoveredPart === 'activation' && <Zap size={24} />}
                  {hoveredPart === 'output' && <ArrowRight size={24} />}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${components[hoveredPart].color}`}>
                    {components[hoveredPart].title}
                  </h3>
                  <p className="text-slate-600 mt-1">{components[hoveredPart].desc}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-slate-400 italic py-4">
                Pasa el cursor sobre los elementos del diagrama para explorar sus funciones
              </div>
            )}
          </div>
        </div>

        <div className="px-8 pb-8 flex flex-wrap gap-2">
          {Object.keys(components).map((key) => (
            <button
              key={key}
              onMouseEnter={() => setHoveredPart(key)}
              onMouseLeave={() => setHoveredPart(null)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                hoveredPart === key 
                  ? `${components[key].bg} ${components[key].color.replace('text-', 'border-')}` 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-slate-500 text-sm flex gap-4">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Señal</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Aprendizaje</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Procesamiento</div>
      </div>
    </div>
  );
};

export default PerceptronDiagram;
