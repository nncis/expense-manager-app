import { NextRequest, NextResponse } from "next/server";
import { getWeekExpenses, getMonthExpenses } from '@/lib/data'


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if(date === 'month'){
    const data = await getWeekExpenses();
    return NextResponse.json(data)
  } else {
    const data = await getMonthExpenses();
    return NextResponse.json(data)
  }
};