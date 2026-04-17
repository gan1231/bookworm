import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/login
 * TODO: PostgreSQL-тай холбосны дараа бодит хэрэгжүүлэлт нэмнэ
 */
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'И-мэйл болон нууц үг шаардлагатай' }, { status: 400 });
  }

  // TODO: DB-с хэрэглэгч хайх, bcrypt-р нууц үг шалгах, JWT үүсгэх
  return NextResponse.json({
    user: { id: 'demo', name: 'Demo', email },
    token: 'demo-jwt-token',
  });
}
