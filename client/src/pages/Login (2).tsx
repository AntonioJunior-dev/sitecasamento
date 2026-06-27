import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, navigate] = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      email === "admin@casamento.com" &&
      password === "123456"
    ) {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin");
      return;
    }

    alert("E-mail ou senha inválidos.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-heading text-center mb-2">
          Portal Administrativo
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Faça login para continuar
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#556B2F] hover:bg-[#3A4A28] text-white py-3 rounded-xl"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}