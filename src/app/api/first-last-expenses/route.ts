import { getFirstAndLastExpensesDates } from '@/lib/data';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const data = await getFirstAndLastExpensesDates();

    if(data){
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: "get first and last expenses" }, { status: 400 });
    }

};