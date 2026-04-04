"use client";

import { useState } from "react";
import {BorderTimer} from "@/components/BorderTimer";
import type { ReactNode } from "react";
import {
  FaBackspace,
  FaDivide,
  FaEquals,
  FaMinus,
  FaPercentage,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

type ButtonValue =
  | "C"
  | "%"
  | "⌫"
  | "/"
  | "7"
  | "8"
  | "9"
  | "*"
  | "4"
  | "5"
  | "6"
  | "-"
  | "1"
  | "2"
  | "3"
  | "+"
  | "0"
  | "."
  | "=";

type Operator = "/" | "*" | "-" | "+" | ".";

type IconKey = "/" | "*" | "-" | "+" | "=" | "%" | "⌫";

const buttons: ButtonValue[][] = [
  ["C", "%", "⌫", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const operators: Operator[] = ["/", "*", "-", "+", "."];

const iconMap: Record<IconKey, ReactNode> = {
  "/": <FaDivide className="text-lg" />,
  "*": <FaTimes className="text-lg" />,
  "-": <FaMinus className="text-lg" />,
  "+": <FaPlus className="text-lg" />,
  "=": <FaEquals className="text-lg" />,
  "%": <FaPercentage className="text-base" />,
  "⌫": <FaBackspace className="text-lg" />,
};

const isOperator = (value: string): value is Operator => {
  return operators.includes(value as Operator);
};

const isIconKey = (value: string): value is IconKey => {
  return value in iconMap;
};

export default function CalculatorApp() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("0");

  const formatNumber = (num: number): string => {
    if (!Number.isFinite(num)) return "Error";

    const rounded = Number(num.toFixed(10));

    return rounded.toString();
  };

  const applyPercent = (expr: string): string => {
    // Converts trailing number into percentage
    // Example: "50" -> "0.5"
    // Example: "200+10" -> "200+0.1"
    const match = expr.match(/(\d+(\.\d+)?)$/);

    if (!match) return expr;

    const numberPart = match[0];
    const startIndex = match.index ?? expr.length - numberPart.length;
    const before = expr.slice(0, startIndex);
    const percentValue = (parseFloat(numberPart) / 100).toString();

    return before + percentValue;
  };

  const sanitizeExpression = (expr: string): string => {
    return expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\s+/g, "");
  };

  const safeEval = (expr: string): string => {
    try {
      if (!expr.trim()) return "0";

      const sanitized = sanitizeExpression(expr);

      // Only allow numbers, operators, dots, and parentheses
      if (!/^[0-9+\-*/().]+$/.test(sanitized)) {
        return "Error";
      }

      // Prevent invalid endings like 5+, 7*, 9.
      if (/[+\-*/.]$/.test(sanitized)) {
        return result;
      }

      // Prevent expressions starting badly (except minus for negatives)
      if (/^[*/.+]/.test(sanitized)) {
        return "Error";
      }

      const evaluated = Function(
        `"use strict"; return (${sanitized})`
      )() as number;

      if (!Number.isFinite(evaluated)) {
        return "Error";
      }

      return formatNumber(evaluated);
    } catch {
      return "Error";
    }
  };

  const handleClick = (value: ButtonValue): void => {
    if (value === "C") {
      setExpression("");
      setResult("0");
      return;
    }

    if (value === "⌫") {
      const updated = expression.slice(0, -1);
      setExpression(updated);
      setResult(updated ? safeEval(updated) : "0");
      return;
    }

    if (value === "%") {
      if (!expression) return;

      const updated = applyPercent(expression);
      setExpression(updated);
      setResult(safeEval(updated));
      return;
    }

    if (value === "=") {
      const finalResult = safeEval(expression);
      setResult(finalResult);

      if (finalResult !== "Error") {
        setExpression(finalResult);
      }

      return;
    }

    const lastChar = expression.slice(-1);

    // Prevent starting with invalid operators
    if (expression === "" && ["/", "*", "+", "."].includes(value)) {
      return;
    }

    // Allow negative start
    if (expression === "" && value === "-") {
      setExpression("-");
      setResult("0");
      return;
    }

    // Prevent duplicate operators like ++, **, /+, ..
    if (isOperator(value) && isOperator(lastChar)) {
      const updated = expression.slice(0, -1) + value;
      setExpression(updated);
      setResult(safeEval(updated));
      return;
    }

    const updated = expression + value;
    setExpression(updated);
    setResult(safeEval(updated));
  };

  const getButtonStyle = (btn: ButtonValue): string => {
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
     <BorderTimer size={40} startTime={15} onStart={() => console.log("start")} 
       onFinish={() => console.log("done")}
      />
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
              key={`${btn}-${index}`}
              onClick={() => handleClick(btn)}
              className={`h-16 rounded-2xl text-xl font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-95 flex items-center justify-center ${getButtonStyle(
                btn
              )} ${btn === "0" ? "col-span-2" : ""}`}
            >
              {isIconKey(btn) ? iconMap[btn] : btn}
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
