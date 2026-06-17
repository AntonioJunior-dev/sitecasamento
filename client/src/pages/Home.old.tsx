import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "@/components/ui/carousel";

export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    acompanhantes: "1",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date("2026-11-07T16:00:00").getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const FORM_ID = "1FAIpQLSfrtWBJb1jk-drtn_tb4fR_SXhXacv-WoYrMk-CM-gzfanhiQ"; 
    const urlGoogleForms = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    const params = new URLSearchParams( );
    params.append('entry.1205599893', formData.nome);          
    params.append('entry.1982052751', formData.telefone);      
    params.append('entry.556055127', formData.acompanhantes);

    try {
      await fetch(urlGoogleForms, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      // --- ADICIONE ESTAS LINHAS AQUI PARA LIMPAR ---
      setFormData({
        nome: "",
        telefone: "",
        acompanhantes: "1",
      });
      // ----------------------------------------------

      const mensagem = encodeURIComponent(
        `Olá!\n\nMeu nome é ${formData.nome}\nConfirmo minha presença no casamento de Gilce e Wladimir.\nQuantidade de pessoas: ${formData.acompanhantes}\nTelefone: ${formData.telefone}`
      );

      window.open(`https://wa.me/5585986772240?text=${mensagem}`, '_blank' );
      
      // Opcional: avisar o usuário
      alert("Presença confirmada com sucesso!");

    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#2F2F2F] font-body">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#3A4A28]/30 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-2xl text-[#556B2F] hover:text-[#3A4A28] transition-smooth">G & W</a>
          <nav className="hidden md:flex gap-8">
            <a href="#historia" className="text-sm font-heading text-[#2F2F2F] hover:text-[#556B2F]">Nossa História</a>
            <a href="#presentes" className="text-sm font-heading text-[#2F2F2F] hover:text-[#556B2F]">Presentes</a>
            <a href="#rsvp" className="text-sm font-heading text-[#2F2F2F] hover:text-[#556B2F]">RSVP</a>
          </nav>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ backgroundImage: "url('/images/capa.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-[#3A4A28]/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-display text-7xl md:text-8xl mb-4">Gilce & Wladimir</h1>
          <p className="text-2xl md:text-3xl font-heading mb-8">07 de Novembro de 2026 • 16:00</p>
          <a href="#historia"><Button size="lg" className="bg-[#556B2F] hover:bg-[#3A4A28] text-white rounded-full px-8 py-6 text-lg">Ver Convite</Button></a>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl mb-12">Faltam</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ label: "Dias", value: countdown.days }, { label: "Horas", value: countdown.hours }, { label: "Minutos", value: countdown.minutes }, { label: "Segundos", value: countdown.seconds }].map((item) => (
              <div key={item.label} className="bg-white rounded-lg p-6 shadow-md border border-[#3A4A28]/30">
                <div className="text-3xl md:text-5xl font-bold text-[#556B2F] mb-2">{String(item.value).padStart(2, "0")}</div>
                <div className="text-sm font-heading">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="historia" className="py-16 bg-[#FAFAF7]">
        <div className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-4xl mb-8">Nossa História</h2>
            <p className="text-lg mb-6 leading-relaxed">Nossa história começou com um encontro que transformou dois caminhos em uma única jornada. Agora chegou o momento de celebrar nossa união ao lado das pessoas que mais amamos.</p>
          </div>
          <img src="/images/restaurante.jpeg" alt="Nossa história" className="w-full rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Gallery Section - Rotating Carousel */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-center section-title">
            Momentos Especiais
          </h2>

          <MomentsCarousel />
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 md:py-24 bg-[#FAFAF7]">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl mb-8 section-title">
            Nosso Grande Dia
          </h2>

          <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg border border-[#3A4A28]/30 mb-8">
            <p className="text-2xl md:text-3xl font-heading text-[#556B2F] mb-6">
              07/11/2026 às 16:00
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              Local da cerimônia: preencher depois
              <br />
              Horário: preencher depois
              <br /><br />
              Local da recepção: preencher depois
              <br />
              Horário: preencher depois
              <br />
              Meireles - Fortaleza - CE
            </p>

            <a
              href="https://maps.google.com/?q=Av.+da+Abolição,+3340,+Fortaleza"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#556B2F] hover:bg-[#3A4A28] text-white rounded-full px-8 py-6 text-lg font-semibold transition-smooth">
                Ver Localização
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Gifts Section */}
      <section id="presentes" className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-center section-title">
            Lista de Presentes
          </h2>

          <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg border border-[#3A4A28]/30">
            <div className="flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-[#556B2F] mr-3" />
              <h3 className="font-heading text-2xl text-[#2F2F2F]">
                PIX e Mercado Pago
              </h3>
            </div>

            <p className="text-center text-slate-600 mb-8 font-body">
              Sua presença é o nosso maior presente.
              Mas, caso deseje nos presentear, disponibilizamos as opções abaixo.
            </p>

            <div className="space-y-6 text-center">
            <div>
            <h4 className="font-heading text-xl mb-2">PIX</h4>

             <p>Nome: preencher depois</p>
              <p>Banco: preencher depois</p>
               <p>Chave PIX: preencher depois</p>
                </div>

            <div>
             <h4 className="font-heading text-xl mb-2">
              Mercado Pago
             </h4>

            <p>Link: preencher depois</p>
             </div>
                </div>

            <p className="text-center text-sm text-slate-500 mt-6 font-body">
              Link da lista de presentes será disponibilizado em breve.
            </p>
          </div>
        </div>
      </section>

      <section id="rsvp" className="py-16 md:py-24 bg-white">
        <div className="container max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-center">Confirmar Presença</h2>
          <form onSubmit={handleConfirm} className="bg-white rounded-lg p-8 shadow-lg border border-[#3A4A28]/30">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-heading mb-2">Nome</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleFormChange} placeholder="Seu nome" required className="w-full px-4 py-3 rounded-lg border border-[#3A4A28]/30 focus:outline-none focus:border-[#556B2F]" />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">Telefone</label>
                <input type="tel" name="telefone" value={formData.telefone} onChange={handleFormChange} placeholder="(85) 98677-2240" required className="w-full px-4 py-3 rounded-lg border border-[#3A4A28]/30 focus:outline-none focus:border-[#556B2F]" />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">Quantidade de Pessoas (Incluindo você)</label>
                <select name="acompanhantes" value={formData.acompanhantes} onChange={handleFormChange} required className="w-full px-4 py-3 rounded-lg border border-[#3A4A28]/30 bg-white focus:outline-none focus:border-[#556B2F]">
                  <option value="1">1 Pessoa</option>
                  <option value="2">2 Pessoas</option>
                  <option value="3">3 Pessoas</option>
                  <option value="4">4 Pessoas</option>
                  <option value="5">5 Pessoas</option>
                </select>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-[#556B2F] hover:bg-[#3A4A28] text-white rounded-lg py-3 text-lg font-semibold disabled:opacity-50">
                {loading ? 'Confirmando...' : 'Confirmar via WhatsApp'}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-[#556B2F] py-8 text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-heading text-lg">Gilce & Wladimir</span>
          <Heart className="w-5 h-5 fill-white" />
        </div>
        <p className="text-sm opacity-75">07 de Novembro de 2026 • Fortaleza - CE</p>
      </footer>
    </div>
  );
}function MomentsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
const galleryImages = [
  "/images/caminhada.jpeg",
  "/images/escadaria.jpeg",
  "/images/fim-tarde.jpeg",
  "/images/fonte.jpeg",
  "/images/gramado.jpeg",
  "/images/gramado2.jpeg",
  "/images/neve.jpeg",
  "/images/por-do-sol.jpeg",
  "/images/praia.jpeg",
  "/images/restaurante.jpeg",
  "/images/ski.jpeg",
];
  const images = [
    {
      src: "/images/caminhada.jpg",
      alt: "Caminhada",
    },
    { src: "/images/capa.jpeg", alt: "Beijo" },
    {
      src: "/images/escadaria.jpg",
      alt: "Escadaria",
    },
    {
      src: "/images/restaurante.jpg",
      alt: "Restaurante",
    },
  ];
  

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Autoplay - rotaciona a cada 5 segundos
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="basis-full md:basis-1/2 lg:basis-full">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-2xl overflow-hidden rounded-xl shadow-xl">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-96 md:h-[500px] object-cover"
                  />
                  {/* Overlay com informação */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <p className="text-white font-heading text-lg md:text-xl">{img.alt}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#2F2F2F] border-0" />
        <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#2F2F2F] border-0" />
      </Carousel>

      {/* Indicador de Slide */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => api?.scrollTo(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === idx + 1
                ? "bg-[#556B2F] w-8"
                : "bg-[#3A4A28]/50 w-2 hover:bg-[#3A4A28]"
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Contador */}
      <p className="text-center mt-4 text-sm text-[#2F2F2F]/60 font-body">
        {current} de {count}
      </p>
    </div>
  );
}
