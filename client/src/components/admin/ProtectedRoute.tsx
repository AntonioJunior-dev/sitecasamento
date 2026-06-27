import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);

  const authenticated =
    localStorage.getItem("admin-auth") === "true";

  useEffect(() => {
    if (!authenticated) {
      setLocation("/login");
    }
    setLoading(false);
  }, [authenticated, setLocation]);

  if (loading) return null;
  if (!authenticated) return null;

  return <>{children}</>;
}