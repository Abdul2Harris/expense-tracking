# 💸 Expense Tracker

A full-stack expense tracking application built using Next.js, Prisma, and Ant Design.
Users can add, view, and manage expenses with proper backend persistence and idempotent API handling.

---

## 🚀 Features

* ➕ Add new expenses (amount, category, date, description)
* 📊 View expenses in a table
* 🔢 Total expense calculation
* 📅 Sort by date (newest first)
* 🏷️ Category tracking
* ❌ Delete expenses
* 🔁 Idempotent API (prevents duplicate submissions)
* 🚫 Validation for invalid inputs (e.g., negative amounts)

---

## 🧱 Tech Stack

### Frontend

* Next.js (App Router)
* React
* Ant Design
* Day.js
* Tailwind CSS

### Backend

* Next.js Route Handlers
* Prisma ORM

### Database

* PostgreSQL (or configured DB)

---

## 📂 Project Structure

```id="structure"
app/
  api/expenses/route.ts   # API routes (GET, POST)
  globals.css
  layout.tsx
  page.tsx

components/
  AddExpenseForm.tsx
  ExpenseTable.tsx

constants/
  constants.ts

lib/
  prisma.ts

prisma/
  schema.prisma

types/
  types.ts

# Root config files
.env
.env.example
.eslintrc.json
.gitignore
next-env.d.ts
next.config.mjs
package.json
package-lock.json
postcss.config.mjs
tailwind.config.ts
tsconfig.json
README.md
```

---

## 🔌 API Endpoints

### POST /api/expenses

Create a new expense

```id="post"
{
  "amount": number,
  "category": string,
  "description": string,
  "date": string,
  "requestId": string
}
```

* Uses `requestId` to ensure idempotency
* Prevents duplicate entries on retries

---

### GET /api/expenses

Fetch all expenses

* Converts Prisma `Decimal` → number before sending response

---

## 🧠 Key Implementations

### ✅ Idempotency Handling

* Unique `requestId` per request
* Enforced via database constraint
* Duplicate requests return existing data

---

### ✅ Data Handling

* Prisma `Decimal` → converted to number
* Dates stored as `DateTime` and formatted in UI
* Separation of:

  * Form input
  * API response
  * Database model

---

### ✅ UI/UX Improvements

* Loading states using Ant Design
* Form validation (no negative values)
* Clean and responsive UI

---

## ⚙️ Setup Instructions

1. Clone the repository

```id="clone"
git clone <your-repo-url>
cd expense-tracker
```

2. Install dependencies

```id="install"
npm install
```

3. Setup environment variables

```id="env"
DATABASE_URL=your_database_url
```

4. Run Prisma migrations

```id="migrate"
npx prisma migrate dev
```

5. Start the development server

```id="run"
npm run dev
```

---

## 💡 Future Improvements

* Date filters (weekly/monthly)
* Category-wise charts
* Pagination for large datasets
* Authentication

---

## 👨‍💻 Author

Built as part of a technical assignment to demonstrate full-stack development skills.
