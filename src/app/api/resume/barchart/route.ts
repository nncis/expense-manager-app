import { NextRequest, NextResponse } from "next/server";
import { getAnnualExpenses } from '@/lib/data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");

  if (!year) {
    return NextResponse.json({ error: "Year required" }, { status: 400 });
  }

  const data = await getAnnualExpenses(year);
  return NextResponse.json(data);
};