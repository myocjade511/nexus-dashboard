export async function GET() {
  return Response.json({
    stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY || null,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY ? '•••• configured' : null,
    github: 'myocjade511',
    vercel: 'Connected'
  })
}
