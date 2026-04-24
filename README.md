# 💸 Expense Tracker

A simple full-stack expense tracking application built with Next.js, Prisma, and Ant Design.
Users can add, view, and manage daily expenses with proper backend persistence and idempotent API handling.

---

## 🚀 Features

* ➕ Add new expenses (amount, category, date, description)
* 📊 View all expenses in a structured table
* 🔢 Automatic total calculation
* 🏷️ Category-based grouping
* 📅 Sort expenses by date (newest first)
* ❌ Delete expenses
* 🔁 Idempotent API handling (prevents duplicate submissions)
* 🚫 Validation for invalid inputs (e.g., negative amounts)

---

## 🧱 Tech Stack

### Frontend

* Next.js (App Router)
* React
* Ant Design (UI components)
* Day.js (date handling)

### Backend

* Next.js Route Handlers (API routes)
* Prisma ORM

### Database

* PostgreSQL (or your DB, update if needed)

---

## 🧠 Key Concepts Implemented

### 1. Idempotent API Design

* Each request includes a `requestId`
* Backend enforces uniqueness using a database constraint
* Duplicate requests return existing data instead of creating new records

### 2. Proper Data Handling

* Prisma `Decimal` converted to number before sending to frontend
* Dates stored as `DateTime` and formatted in UI
* Clear separation between:

  * Input data (form)
  * Database entity (backend response)

### 3. Clean State Management

* Data fetched from backend using `fetch`
* UI updated using server response as source of truth

### 4. Validation & UX

* Prevent negative amounts
* Loading states for better user experience
* Form reset after submission

---

## 📂 Project Structure

```
/app
  /api/expenses        # API routes
/components            # Reusable UI components
/constants             # Static data (categories)
/types                 # TypeScript types
```

---

## 🔌 API Endpoints

### POST /api/expenses

Create a new expense

**Request Body:**

```
{
  amount: number,
  category: string,
  description?: string,
  date: string,
  requestId: string
}
```

---

### GET /api/expenses

Fetch all expenses

---

### DELETE /api/expenses/:id

Delete an expense

---

## ⚙️ Setup Instructions

1. Clone the repository

```
git clone <your-repo-url>
cd expense-tracker
```

2. Install dependencies

```
npm install
```

3. Setup environment variables

```
DATABASE_URL=your_database_url
```

4. Run Prisma migrations

```
npx prisma migrate dev
```

5. Start development server

```
npm run dev
```

---

## 💡 Future Improvements

* Filtering by date (weekly/monthly)
* Category-wise charts
* Pagination for large datasets
* Authentication & user-specific data

---

## ✅ Notes

* Sorting is based on **expense date**, not creation time
* Backend ensures **data consistency and idempotency**
* UI is kept simple and responsive using Ant Design

---

## 👨‍💻 Author

Built as part of a technical assignment to demonstrate full-stack development skills.
