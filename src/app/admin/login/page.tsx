'use client'

import { createBrowserClient } from '@supabase/ssr'

export default function AdminLoginPage() {
  console.log("Checking URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  // Initialize the Supabase client using your environment variables
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

  )

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // This tells Google where to send the user after they authenticate
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <button 
        onClick={handleGoogleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with MCNUS Email
      </button>
    </div>
  )
}   