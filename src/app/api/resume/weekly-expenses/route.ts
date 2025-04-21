import { NextRequest, NextResponse } from "next/server";
import { getExpensesByWeek } from '@/lib/data'


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("week");

  if(date){
    const data = await getExpensesByWeek(date);
    return NextResponse.json(data)
  } else {
    return NextResponse.json({ error: "Week required" }, { status: 400 });
  }
};