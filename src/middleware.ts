import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Obtén el token de sesión
  const token = await getToken({ req: request });

  // Define las rutas protegidas
  const protectedRoutes = ["/dashboard"]; // Rutas que requieren autenticación

  // Verifica si la ruta actual está protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida, redirige al login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Permite el acceso si el usuario está autenticado o si la ruta no está protegida
  return NextResponse.next();
}

// Configura el middleware para que se ejecute en las rutas especificadas
export const config = {
  matcher: ["/dashboard/:path*"], // Rutas protegidas
};