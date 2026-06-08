import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin'

  if (code) {
    const cookieStore = cookies()
    
    // The variables here must match your .env.local exactly
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (data?.session?.user?.email) {
      const userEmail = data.session.user.email
      
      const isAuthorized = userEmail === 'nus.myanmarcommunity@gmail.com' 
      
      if (!isAuthorized) {
        await supabase.auth.signOut()
        return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`)
      }
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}