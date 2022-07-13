import { NextRequest, NextResponse } from "next/server";

export async function middleware(req, ev) {
  const url = req.nextUrl.clone();
  const token = req.cookies["token"];
  if (token === undefined || token === null || token === "undefined") {
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
}
