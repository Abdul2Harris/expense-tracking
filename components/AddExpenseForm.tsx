"use client";

import { Form, Input, Select, DatePicker, Button } from "antd";
import { PlusCircle, X } from "lucide-react";
import dayjs from "dayjs";
import { useState } from "react";
import { AddExpenseFormProps } from "@/types/types";

const { Option } = Select;



interface Props {
  onAdd: (expense: AddExpenseFormProps) => void;
}

const CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
];

export default function AddExpenseForm({ onAdd }: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: {
    amount: string;
    category: string;
    date: dayjs.Dayjs;
    description: string;
  }) => {
    if (loading) return;

    setLoading(true);

    const requestId = crypto.randomUUID();
    onAdd({
      date: values.date.toDate(),
      description: values.description,
      category: values.category,
      amount: parseFloat(values.amount),
      requestId,
    });

    setLoading(false);

    form.resetFields();
    form.setFieldsValue({ date: dayjs() });
  };

  const handleClear = () => {
    form.resetFields();
    form.setFieldsValue({ date: dayjs() });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-5 mb-4 shadow-sm">
      <p className="text-[11px] font-medium uppercase tracking-widest text-text3 mb-4">
        Add New Expense
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ date: dayjs() }}
        className="expense-form"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Form.Item
            name="amount"
            label={<span className="text-xs text-text2">Amount (₹)</span>}
            rules={[
              { required: true, message: "Enter amount" },
              {
                validator: (_, value) => {
                  if (value === undefined || value === null || value === "") {
                    return Promise.resolve();
                  }
                  if (Number(value) < 0) {
                    return Promise.reject("Amount cannot be negative");
                  }
                  return Promise.resolve();
                },
              },
            ]}
            className="!mb-0"
          >
            <Input
              type="number"
              placeholder="0.00"
              prefix={<span className="text-text3 text-sm">₹</span>}
              className="expense-input"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label={<span className="text-xs text-text2">Category</span>}
            rules={[{ required: true, message: "Pick category" }]}
            className="!mb-0"
          >
            <Select placeholder="Select..." className="expense-select">
              {CATEGORIES.map((c) => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label={<span className="text-xs text-text2">Date</span>}
            rules={[{ required: true, message: "Pick date" }]}
            className="!mb-0"
          >
            <DatePicker
              format="DD MMM YYYY"
              className="expense-input !w-full"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="text-xs text-text2">Description</span>}
            // rules={[{ required: true, message: "Enter description" }]}
            className="!mb-0"
          >
            <Input placeholder="e.g. Zomato lunch" className="expense-input" />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={handleClear}
            className="expense-btn-secondary"
            icon={<X size={14} />}
          >
            Clear
          </Button>
          <Button
            htmlType="submit"
            className="expense-btn-primary"
            icon={<PlusCircle size={14} />}
            loading={loading}
          >
            Add Expense
          </Button>
        </div>
      </Form>
    </div>
  );
}
