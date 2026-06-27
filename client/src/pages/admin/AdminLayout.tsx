import { Link } from "wouter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">
          Administração
        </h2>

        <nav className="flex flex-col gap-3">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/fotos">Fotos</Link>
          <Link href="/admin/presentes">Presentes</Link>
          <Link href="/admin/pagamentos">Pagamentos</Link>
          <Link href="/admin/convidados">Convidados</Link>
          <Link href="/admin/configuracoes">
            Configurações
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}