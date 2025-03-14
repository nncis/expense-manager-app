import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const pinga = [{pinga: 123},{pinga: 1111}]

  return NextResponse.json(pinga);
};