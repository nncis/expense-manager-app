// import { NextRequest, NextResponse } from "next/server";
// import { expenseByMonth } from '@/lib/data'


// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const date = searchParams.get("month");

//   if(date){
//     const data = await expenseByMonth(date);
//     return NextResponse.json(data)
//   } else {
//     return NextResponse.json({ error: "Month required" }, { status: 400 });
//   }
// };