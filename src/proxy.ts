// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name : string) { 
            return request.cookies.get(name)?.value 
        },
        set(name : string, value : string, options : CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name : string, options : CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  const isAdminRoute = path.startsWith('/admin')
  const isLoginRoute = path === '/login'

  if (isAdminRoute) {
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (isLoginRoute && user?.email === process.env.ADMIN_EMAIL) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/login',        
  ],
}