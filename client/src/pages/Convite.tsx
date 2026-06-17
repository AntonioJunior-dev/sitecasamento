import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, CheckCircle, Globe, Gift, Shirt } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Landing Page de Convite - Formato Formal
 * Design moderno com paleta de cores Golden Dusk (combinando com o site principal)
 */

export default function Convite() {
  const [, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const menuItems = [
    { id: "localizacao", label: "Localização", icon: MapPin },
    { id: "presenca", label: "Confirme sua presença", icon: CheckCircle },
    { id: "casamento", label: "Acesse nosso site de casamento", icon: Globe },
    { id: "presentes", label: "Lista de presentes", icon: Gift },
  ];

  const handleMenuClick = (id: string) => {
    if (id === "casamento") {
      setLocation("/celebracao");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    } else if (id === "presentes") {
      setLocation("/celebracao");
      setTimeout(() => {
        const element = document.getElementById("presentes");
        element?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else if (id === "presenca") {
      setLocation("/celebracao");
      setTimeout(() => {
        const element = document.getElementById("rsvp");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    } else if (id === "localizacao") {
      window.open(
        "https://maps.google.com/?q=Av.+da+Abolição,+3340,+Fortaleza",
        "_blank"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#2F2F2F] font-body overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#556B2F]/10 rounded-full blur-3xl" />
      </div>

      {/* Convite Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Convite Card - Modern Style */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden relative border border-[#D4AF37]/20">
            
            {/* Image Header */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src="/images/capa.jpeg"
                alt="Gilce e Wladimir"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="pb-12 px-8 md:px-12 text-center -mt-12 relative z-10">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-0.5 bg-[#D4AF37]/30" />
                  <Heart className="w-6 h-6 text-[#556B2F] fill-[#556B2F] animate-pulse" />
                  <div className="w-12 h-0.5 bg-[#D4AF37]/30" />
                </div>

                <p className="text-sm md:text-base font-heading text-[#D4AF37] mb-4 tracking-widest uppercase">
                  Você está convidado para celebrar
                </p>

                <h1 className="font-display text-6xl md:text-7xl mb-6 text-[#3A4A28]">
                  Gilce & Wladimir
                </h1>

                <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8" />
              </div>

              {/* Event Details */}
              <div className="bg-[#FAFAF7] rounded-xl p-6 mb-8 border border-[#D4AF37]/10 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-heading text-[#556B2F] uppercase tracking-widest mb-2">
                      Data
                    </p>
                    <p className="font-body text-sm md:text-base text-[#2F2F2F] font-semibold">
                      07 de Novembro
                      <br />
                      2026
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-heading text-[#D4AF37] uppercase tracking-widest mb-2">
                      Horário
                    </p>
                    <p className="font-body text-sm md:text-base text-[#2F2F2F] font-semibold">
                      11:30
                    </p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-xs font-heading text-[#3A4A28] uppercase tracking-widest mb-2">
                      Local
                    </p>
                    <p className="font-body text-xs md:text-sm text-[#2F2F2F] font-semibold">
                      Av. da Abolição, 3340
                      <br />
                      Fortaleza - CE
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Navegável */}
              <div className="space-y-3 mb-8">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleMenuClick(item.id);
                        setActiveSection(item.id);
                      }}
                      className={`w-full flex items-center justify-between px-6 py-4 rounded-lg border transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${
                        activeSection === item.id
                          ? "border-[#556B2F] bg-[#556B2F]/5"
                          : "border-[#D4AF37]/20 hover:border-[#556B2F] bg-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-[#556B2F]" />
                        <span className="font-heading text-sm md:text-base text-[#2F2F2F]">
                          {item.label}
                        </span>
                      </span>
                      <span className="text-[#D4AF37] text-xl">→</span>
                    </button>
                  );
                })}
              </div>

              {/* Dress Code */}
              <div className="bg-[#556B2F]/5 rounded-xl p-6 mb-8 border border-[#556B2F]/10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Shirt className="w-5 h-5 text-[#556B2F]" />
                  <p className="font-heading text-sm uppercase tracking-widest text-[#556B2F]">
                    Traje
                  </p>
                </div>
                <p className="font-body text-base md:text-lg text-[#2F2F2F] font-semibold">
                  Passeio Completo
                </p>
              </div>

              {/* Closing Message */}
              <div className="mb-4">
                <p className="font-body text-sm md:text-base text-[#2F2F2F]/70 italic">
                  Sua presença é o nosso maior presente
                </p>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-8">
            <p className="text-xs md:text-sm text-[#2F2F2F]/60 font-body">
              © 2026 Gilce & Wladimir. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .font-display {
          font-family: "Great Vibes", cursive;
        }
        
        .font-heading {
          font-family: "Cormorant Garamond", serif;
        }
        
        .font-body {
          font-family: "Lato", sans-serif;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
