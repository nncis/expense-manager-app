import { getTotalAmountPreviousCurrentMonth } from '@/lib/data'
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const month = req.nextUrl.searchParams.get('month');

  if(month){
    const data = await getTotalAmountPreviousCurrentMonth(month);
    return NextResponse.json(data)
  } else {
    return NextResponse.json({ error: "Month required" }, { status: 400 });
  }
};