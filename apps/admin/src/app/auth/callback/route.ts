import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')

  console.log('AUTH CALLBACK CODE:', code)

  if (code) {

    const supabase = await createClient()

    const { data, error } =
      await supabase.auth.exchangeCodeForSession(code)

    console.log('EXCHANGE RESULT:', {
      user: data.user?.email,
      error
    })

    if (!error) {
      return NextResponse.redirect(
        'https://admin.mobilsiap.com/reset-password'
      )
    }
  }

  return NextResponse.redirect(
    'https://admin.mobilsiap.com/login'
  )
}
