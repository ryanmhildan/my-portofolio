// Liveness check for the local preview tooling (and any host that pings /health).
export function GET() {
  return new Response("ok");
}
