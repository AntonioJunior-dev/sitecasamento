import { Route, Switch } from "wouter";

import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Fotos from "./pages/admin/Fotos";
import Presentes from "./pages/admin/Presentes";
import Pagamentos from "./pages/admin/Pagamentos";
import Convidados from "./pages/admin/Convidados";
import Configuracoes from "./pages/admin/Configuracoes";

import ProtectedRoute from "./components/admin/ProtectedRoute";

// páginas públicas (ajuste se tiver)
import Convite from "./pages/Convite";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function Router() {
  return (
    <Switch>
      {/* 🌐 Públicas */}
      <Route path="/" component={Convite} />
      <Route path="/celebracao" component={Home} />
      <Route path="/login" component={Login} />

      {/* 🔐 ADMIN */}
      <Route path="/admin">
        <ProtectedRoute>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/fotos">
        <ProtectedRoute>
          <AdminLayout>
            <Fotos />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/presentes">
        <ProtectedRoute>
          <AdminLayout>
            <Presentes />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/pagamentos">
        <ProtectedRoute>
          <AdminLayout>
            <Pagamentos />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/convidados">
        <ProtectedRoute>
          <AdminLayout>
            <Convidados />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/configuracoes">
        <ProtectedRoute>
          <AdminLayout>
            <Configuracoes />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      {/* ❌ fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}