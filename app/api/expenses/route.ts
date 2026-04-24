import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const { requestId, amount, category, description, date } =
    await request.json();

  console.log({ requestId, amount, category, description, date });

  if (!requestId) {
    return Response.json({ error: "requestId is required" }, { status: 400 });
  }

  try {
    const expense = await prisma.expense.create({
      data: {
        requestId,
        amount: new Prisma.Decimal(amount),
        category,
        description,
        date: new Date(date),
      },
    });

    return Response.json(
      {
        ...expense,
        amount: expense.amount.toNumber(),
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const existing = await prisma.expense.findUnique({
        where: { requestId },
      });

      return Response.json(
        {
          ...existing,
          amount: existing?.amount.toNumber(),
        },
        { status: 201 },
      );
    }

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  const expenses = await prisma.expense.findMany();

  const formatted = expenses.map((e) => ({
    ...e,
    amount: e.amount.toNumber(),
  }));

  return Response.json(formatted, { status: 200 });
}
