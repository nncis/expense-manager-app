'use server'
import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
console.log('Encabezado Authorization:', authHeader);
  console.log('Cookies recibidas:', request.cookies.getAll());
  // Obtén las cookies del request
  // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });
  console.log("Token obtenido:", token);

  // Define las rutas protegidas
  const protectedRoutes = ['/dashboard'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
);
console.log('Ruta solicitada:', request.nextUrl.pathname);
console.log('Es ruta protegida:', isProtectedRoute);
// Si la ruta es protegida y el usuario no está autenticado, redirige al login
// if (isProtectedRoute && !token) {
//   console.log('Usuario no autenticado, redirigiendo al login...');
//   return NextResponse.redirect(new URL('/login', request.url));
// }

  // Permitir el acceso si el usuario está autenticado o la ruta no es protegida
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};