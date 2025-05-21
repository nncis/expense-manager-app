import { getTotalAmountWeek } from '@/lib/data'
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const week = req.nextUrl.searchParams.get('week');

  if(week){
    const data = await getTotalAmountWeek(week);
    return NextResponse.json(data)
  } else {
    return NextResponse.json({ error: "Week required" }, { status: 400 });
  }
};