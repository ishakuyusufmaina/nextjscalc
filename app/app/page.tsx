se client";

import { useState } from "react"; import { FaBackspace, FaDivide, FaEquals, FaMinus, FaPercentage, FaPlus, FaTimes, } from "react-icons/fa";

const buttons = [ ["C", "%", "⌫", "/"], ["7", "8", "9", "*"], ["4", "5

const iconMap = { "/": <FaDivide className="text-lg" />, "*": <FaTimes className="text-lg" />, "-": <FaMinus className="text-lg" />, "+": <FaPlus className="text-lg" />, "=": <FaEquals className="text-lg" />, "%": <FaPercentage className="text-base" />, "⌫": <FaBackspace className="text-lg" />, };

const safeEval = (expr) => { try { if (!expr) return "0"; const sanitized = expr.replace(/×/g, "*").replace(/÷/g, "/"); // eslint-disable-next-line no-new-func const value = Function(return ${sanitized})(); if (value === Infinity || Number.isNaN(value)) return "Error"; return Number.isInteger(value) ? String(value) : String(N

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

                const getButtonStyle = (btn) => { if (["/", "*", "-", "+", "="].includes(btn)) { return "bg-gradient-to-br from-fuchsia-500 to-purple-600 tm                                                                                    className={`h-16 rounded-2xl text-xl font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-95 flex items-center justify-c                         