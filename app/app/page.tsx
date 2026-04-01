                                                                                                                                                                                                            <div className="mb-5 rounded-3xl bg-black/20 border border-white/10 p-5 min-h-[170px] flex flex-col justify-end">
  "use client";

import { useState } from "react";
import {
  FaBackspace,
  FaDivide,
  FaEquals,
  FaMinus,
  FaPercentage,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const buttons = [
  ["C", "%", "⌫", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export default function CalculatorApp() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  const iconMap = {
    "/": <FaDivide className="text-lg" />,
    "*": <FaTimes className="text-lg" />,
    "-": <FaMinus className="text-lg" />,
    "+": <FaPlus className="text-lg" />,
    "=": <FaEquals className="text-lg" />,
    "%": <FaPercentage className="text-base" />,
    "⌫": <FaBackspace className="text-lg" />,
  };

  const safeEval = (expr) => {
    try {
      if (!expr) return "0";
      const sanitized = expr.replace(/×/g, "*").replace(/÷/g, "/");
      const value = Function(`return ${sanitized}`)();
      if (value === Infinity || Number.isNaN(value)) return "Error";
      return Number.isInteger(value)
        ? String(value)
        : String(Number(value.toFixed(8)));
    } catch {
      return "Error";
    }
  };

  const handleClick = (value) => {
    if (value === "C") {
      setExpression("");
      setResult("0");
      return;
    }

    if (value === "⌫") {
      const updated = expression.slice(0, -1);
      setExpression(updated);
      setResult(safeEval(updated));
      return;
    }

    if (value === "=") {
      const finalResult = safeEval(expression);
      setResult(finalResult);
      if (finalResult !== "Error") setExpression(finalResult);
      return;
    }

    const updated = expression + value;
    setExpression(updated);
    setResult(safeEval(updated));
  };

  const getButtonStyle = (btn) => {
    if (["/", "*", "-", "+", "="].includes(btn)) {
      return "bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-lg shadow-fuchsia-500/30";
    }
    if (["C", "%", "⌫"].includes(btn)) {
      return "bg-white/10 text-rose-200 border border-white/10";
    }
    return "bg-white/5 text-white border border-white/10";
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#312e81,_#0f172a_45%,_#020617_100%)] flex items-center justify-center px-4 py-10 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <section className="relative w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-black/30 p-5">
        <div className="mb-5 rounded-3xl bg-black/20 border border-white/10 p-5 min-h-[170px] flex flex-col justify-end">
          <p className="text-right text-slate-300 text-sm break-all min-h-[24px]">
            {expression || "0"}
          </p>
          <h1 className="text-right text-white text-5xl font-bold tracking-tight break-all mt-3">
            {result}
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn, index) => (
            <button
              key={index}
              onClick={() => handleClick(btn)}
              className={`h-16 rounded-2xl text-xl font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-95 flex items-center justify-center ${getButtonStyle(
                btn
              )} ${btn === "0" ? "col-span-2" : ""}`}
            >
              {iconMap[btn] || btn}
            </button>
          ))}
        </div>

        <div className="mt-5 text-center text-xs text-slate-300">
          Built with Next.js + Tailwind + React Icons
        </div>
      </section>
    </main>
  );
}                                                                                                                                                                                                                                                                                                                                                    <p className="text-right text-slate-300 text-sm break-all min-h-[24px]">
                                                                                                                                                                                                                                                                                                                                                                  {expression || "0"}
                                                                                                                                                                                                                                                                                                                                                                            </p>
                                                                                                                                                                                                                                                                                                                                                                                      <h1 className="text-right text-white text-5xl font-bold tracking-tight break-all mt-3">
                                                                                                                                                                                                                                                                                                                                                                                                  {result}
                                                                                                                                                                                                                                                                                                                                                                                                            </h1>
                                                                                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                                                                                            <div className="grid grid-cols-4 gap-3">
                                                                                                                                                                                                                                                                                                                                                                                                                                      {buttons.flat().map((btn, index) => (
                                                                                                                                                                                                                                                                                                                                                                                                                                                  <button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                key={index}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              onClick={() => handleClick(btn)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            className={`h-16 rounded-2xl text-xl font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-95 flex items-center justify-center ${getButtonStyle(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            btn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          )} ${btn === "0" ? "col-span-2" : ""}`}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    {iconMap[btn] || btn}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <div className="mt-5 text-center text-xs text-slate-300">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Built with Next.js + Tailwind + React Icons
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </section>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
