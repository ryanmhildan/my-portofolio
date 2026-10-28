import { NextResponse, type NextRequest } from "next/server";

// Sends "/" to the language the visitor picked last time, else English.
export function proxy(request: NextRequest) {
  const saved = request.cookies.get("lang")?.value;
  const lang = saved === "id" ? "id" : "en";
  return NextResponse.redirect(new URL(`/${lang}`, request.url));
}

export const config = {
  matcher: ["/"],
};
