"use client";

import { useState } from "react";
import { Table, Select, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Filter, ArrowUpDown } from "lucide-react";
import { Expense } from "@/types/types";
import { CATEGORIES, CATEGORY_COLORS } from "@/constants/constants";

const { Option } = Select;

interface Props {
  expenses: Expense[];
//   onDelete: (key: string) => void;
}

const PAGE_SIZE = 5;

export default function ExpenseTable({ expenses }: Props) {
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered =
    filterCategory === "All"
      ? expenses
      : expenses.filter((e) => e.category === filterCategory);

  const sorted = [...filtered].sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();

    if (sortOrder === "newest") return bTime - aTime;
    if (sortOrder === "oldest") return aTime - bTime;
    if (sortOrder === "high") return b.amount - a.amount;

    return a.amount - b.amount;
  });

  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const columns: ColumnsType<Expense> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 90,
      render: (v: string) => {
        const formatted = new Date(v).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        });

        return <span className="text-text3 text-[13px]">{formatted}</span>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (v: string) => (
        <span className="text-text1 text-sm font-medium">{v ?? "-"}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 140,
      render: (cat: string) => {
        const style = CATEGORY_COLORS[cat] ?? CATEGORY_COLORS["Other"];
        return (
          <span
            className={`inline-block px-3 py-0.5 rounded-pill text-[12px]
              font-medium ${style.bg} ${style.text}`}
          >
            {cat}
          </span>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      width: 110,
      render: (v: number) => (
        <span className="font-semibold text-text1 text-sm font-mono">
          ₹{v.toLocaleString("en-IN")}
        </span>
      ),
    },
    // {
    //   title: "",
    //   key: "action",
    //   width: 44,
    //   render: (_: unknown, record: Expense) => (
    //     <button
    //       onClick={() => onDelete(record.id)}
    //       className="text-text3 hover:text-red transition-colors p-1 rounded-sm"
    //       aria-label="Delete expense"
    //     >
    //       <Trash2 size={14} />
    //     </button>
    //   ),
    // },
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-5 shadow-sm">
      {/* Header: title + filters */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <p className="text-[11px] font-medium uppercase tracking-widest text-text3">
          All Expenses
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={13} className="text-text3" />
          <Select
            value={filterCategory}
            onChange={(v) => {
              setFilterCategory(v);
              setCurrentPage(1);
            }}
            className="expense-select-sm"
            popupMatchSelectWidth={false}
          >
            <Option value="All">All categories</Option>
            {CATEGORIES.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>

          <ArrowUpDown size={13} className="text-text3 ml-1" />
          <Select
            value={sortOrder}
            onChange={(v) => {
              setSortOrder(v);
              setCurrentPage(1);
            }}
            className="expense-select-sm"
            popupMatchSelectWidth={false}
          >
            <Option value="newest">Newest first</Option>
            <Option value="oldest">Oldest first</Option>
            <Option value="high">Highest amount</Option>
            <Option value="low">Lowest amount</Option>
          </Select>
        </div>
      </div>

      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={paginated}
        pagination={false}
        rowKey="key"
        className="expense-table"
        locale={{
          emptyText: (
            <div className="py-10 text-center text-text3 text-sm">
              No expenses yet. Add one above ↑
            </div>
          ),
        }}
      />

      {/* Footer: totals */}
      <div className="flex items-center justify-between pt-4 mt-1 border-t border-border flex-wrap gap-3">
        <span className="text-text2 text-sm">
          Total{" "}
          <span className="text-text3 text-xs">
            ({filtered.length} expense{filtered.length !== 1 ? "s" : ""})
          </span>
        </span>
        <span className="text-text1 font-semibold text-lg font-mono">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Ant Design Pagination — only shown when > PAGE_SIZE rows */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex justify-end mt-3">
          <Pagination
            current={currentPage}
            total={filtered.length}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
            size="small"
            showSizeChanger={false}
            className="expense-pagination"
          />
        </div>
      )}
    </div>
  );
}
