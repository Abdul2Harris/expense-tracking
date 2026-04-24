"use client";

import { useEffect, useState } from "react";
import { Wallet, TrendingUp, Hash } from "lucide-react";
import AddExpenseForm, {
  
} from "@/components/AddExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import { Spin } from "antd";
import { AddExpenseFormProps, Expense } from "@/types/types";

function getHighestCategory(expenses: Expense[]) {
  if (!expenses.length) return "—";
  const totals: Record<string, number> = {};
  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] ?? 0) + e.amount;
  });
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const handleAdd = async (expense: AddExpenseFormProps) => {
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...expense,
          date: expense.date.toISOString(),
        }),
      });

      const data = await res.json();

      setExpenses((prev) => [data, ...prev]);
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  console.log("expenses:", expenses);

  const totalAmount = expenses.reduce((s, e) => s + e.amount, 0);
  const highestCategory = getHighestCategory(expenses);
  const entryCount = expenses.length;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("/api/expenses");
        const data = await res.json();

        setExpenses(data);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-text1 tracking-tight">
              Expense Tracker
            </h1>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {/* Total */}
          <div className="bg-surface2 rounded-lg p-4 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={14} className="text-text3" />
              <span className="text-xs text-text3 uppercase tracking-widest font-medium">
                Total Amount
              </span>
            </div>
            <p className="text-[22px] font-semibold text-text1 font-mono leading-none">
              ₹{totalAmount.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Highest Category */}
          <div className="bg-surface2 rounded-lg p-4 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-text3" />
              <span className="text-xs text-text3 uppercase tracking-widest font-medium">
                Highest category
              </span>
            </div>
            <p className="text-[22px] font-semibold text-amber leading-none">
              {highestCategory}
            </p>
          </div>

          {/* Entry Count */}
          <div className="bg-surface2 rounded-lg p-4 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Hash size={14} className="text-text3" />
              <span className="text-xs text-text3 uppercase tracking-widest font-medium">
                No. of entries
              </span>
            </div>
            <p className="text-[22px] font-semibold text-green leading-none">
              {entryCount}
            </p>
          </div>
        </div>

        {/* Add Expense Form */}
        <AddExpenseForm onAdd={handleAdd} />

        {/* Expense Table */}
        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
}
