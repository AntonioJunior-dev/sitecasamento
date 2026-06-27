import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h1 className="text-xl font-bold mb-6">💍 Casamento Admin</h1>

        <nav className="flex flex-col gap-3">
          <a href="/admin" className="hover:text-blue-600">
            Dashboard
          </a>
          <a href="/admin/presentes" className="hover:text-blue-600">
            Presentes
          </a>
          <a href="/admin/configuracoes" className="hover:text-blue-600">
            Configurações
          </a>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}