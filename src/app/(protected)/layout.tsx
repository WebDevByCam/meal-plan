import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import SimpleNavigation from '@/components/layout/SimpleNavigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user profile is available (disable Selena for now)
  if (user.username === 'selena') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Perfil No Disponible</h1>
          <p className="text-gray-600 mb-4">
            El perfil de Selena está en construcción y estará disponible próximamente.
          </p>
          <a 
            href="/api/auth/logout" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Volver al login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavigation userName={user.name} userRole={user.role} />
      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
