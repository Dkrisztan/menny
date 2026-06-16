import { auth } from '../auth.ts'

const email = process.env.ADMIN_EMAIL ?? 'admin@menny.hu'
const password = process.env.ADMIN_PASSWORD ?? 'menny-admin-2026'
const name = process.env.ADMIN_NAME ?? 'Admin'

const ctx = await auth.api.signUpEmail({
  body: { email, password, name },
})

console.log('Admin user created:', ctx.user.email)
process.exit(0)
