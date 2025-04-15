import { NextResponse } from "next/server";
import { getFirstAndLastExpensesDates } from '@/lib/data'

export async function GET() {

  const dates = await getFirstAndLastExpensesDates()

  return NextResponse.json(dates);
};