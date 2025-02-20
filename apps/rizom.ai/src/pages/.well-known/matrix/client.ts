export const prerender = false;

export async function GET() {
  return new Response(null, {
    status: 301,
    headers: {
      'Location': 'https://matrix.rizom.ai/.well-known/matrix/client'
    }
  });
}
