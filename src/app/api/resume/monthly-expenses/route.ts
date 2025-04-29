import { NextRequest, NextResponse } from "next/server";
import { getExpenseByMonth } from '@/lib/data'


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("month");

  if(date){
    const data = await getExpenseByMonth(date);
    return NextResponse.json(data)
  } else {
    return NextResponse.json({ error: "Month required" }, { status: 400 });
  }
};