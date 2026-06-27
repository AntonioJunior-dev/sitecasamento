import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Gift, ChevronLeft, ChevronRight, Copy, Check, CreditCard, Smartphone, ShoppingBag, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "@/components/ui/carousel";

// ============================================================
// LISTA DE PRESENTES - EDITE AQUI OS ITENS E VALORES
// ============================================================
const GIFT_LIST = [
  {
    id: 1,
    name: "Jogo de Panelas Antiaderente",
    description: "Conjunto completo para a cozinha",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
    category: "Cozinha",
  },
  {
    id: 2,
    name: "Liquidificador",
    description: "Liquidificador potente 1000W",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80",
    category: "Cozinha",
  },
  {
    id: 3,
    name: "Air Fryer",
    description: "Fritadeira elétrica sem óleo",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80",
    category: "Eletrodomésticos",
  },
  {
    id: 4,
    name: "Micro-ondas",
    description: "Micro-ondas 30 litros",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80",
    category: "Eletrodomésticos",
  },
  {
    id: 5,
    name: "Cafeteira Elétrica",
    description: "Cafeteira com timer programável",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    category: "Cozinha",
  },
  {
    id: 6,
    name: "Aspirador de Pó",
    description: "Aspirador vertical sem fio",
    price: 380,
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
    category: "Eletrodomésticos",
  },
  {
    id: 7,
    name: "Jogo de Cama Queen",
    description: "Jogo completo 400 fios",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    category: "Quarto",
  },
  {
    id: 8,
    name: "Jogo de Toalhas",
    description: "Kit 8 peças felpudo premium",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80",
    category: "Banheiro",
  },
  {
    id: 9,
    name: "Batedeira Planetária",
    description: "Batedeira 5 velocidades 1000W",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
    category: "Cozinha",
  },
  {
    id: 10,
    name: 'Smart TV 43"',
    description: "Televisão 4K com Wi-Fi",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
    category: "Eletrônicos",
  },
];
// ============================================================
// DADOS DO PIX - EDITE AQUI
// ============================================================
const PIX_DATA = {
  key: "85994329899",
  keyType: "Celular",
  name: "Gilce & Wladimir",
  bank: "C6 Bank",
};

// ============================================================

type GiftItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function GiftModal({
  gift,
  onClose,
}: {
  gift: GiftItem;
  onClose: () => void;
}) {
const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
const [copied, setCopied] = useState(false);
const customValue = gift.price;
const [cardSuccess, setCardSuccess] = useState(false);

  const pixMessage = `Presente: ${gift.name} - ${formatCurrency(gift.price)}`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_DATA.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppPix = () => {
    const msg = encodeURIComponent(
      `Olá! Quero presentear vocês com: ${gift.name} no valor de ${formatCurrency(gift.price)}.\nVou enviar o Pix para a chave: ${PIX_DATA.key} (${PIX_DATA.keyType}) - ${PIX_DATA.bank}`
    );
    window.open(`https://wa.me/5585994329899?text=${msg}`, "_blank");
  };

const handleCardSubmit = () => {
  console.log("Abrindo Mercado Pago. ID:", gift.id);

  if (gift.id === 1) {
    window.location.href = "https://mpago.la/11ncz82";
    return;
  }

  alert(
    `Pagamento por cartão ainda não configurado para "${gift.name}". ID: ${gift.id}`
  );
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
         <div className="flex items-center gap-4">
  <img
    src={gift.image}
    alt={gift.name}
    className="w-20 h-20 rounded-xl object-cover"
  />

  <div>
    <h3 className="font-heading text-lg text-[#2F2F2F]">
      {gift.name}
    </h3>

    <p className="text-sm text-gray-500">
      {gift.description}
    </p>
  </div>
</div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Valor fixo */}
          <div className="mb-6 text-center bg-[#FAFAF7] rounded-xl p-5 border border-[#3A4A28]/20">
  <p className="text-sm text-gray-500 mb-2">
    Valor do presente
  </p>

  <p className="text-4xl font-bold text-[#556B2F]">
    {formatCurrency(gift.price)}
  </p>

  <p className="text-xs text-gray-400 mt-2">
    O valor deste presente é fixo.
  </p>
</div>
          {/* Seleção de método de pagamento */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setPaymentMethod("pix")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-heading text-sm transition-all ${
                paymentMethod === "pix"
                  ? "border-[#556B2F] bg-[#556B2F]/10 text-[#556B2F]"
                  : "border-gray-200 text-gray-500 hover:border-[#556B2F]/40"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Pix
            </button>
            <button
              onClick={() => setPaymentMethod("card")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-heading text-sm transition-all ${
                paymentMethod === "card"
                  ? "border-[#556B2F] bg-[#556B2F]/10 text-[#556B2F]"
                  : "border-gray-200 text-gray-500 hover:border-[#556B2F]/40"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Cartão
            </button>
          </div>

          {/* PIX */}
          {paymentMethod === "pix" && (
            <div className="space-y-2">
              <div className="bg-[#FAFAF7] rounded-xl p-5 border border-[#3A4A28]/20">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#556B2F]/10 rounded-full mb-3">
                    <Smartphone className="w-8 h-8 text-[#556B2F]" />
                  </div>
                  <p className="text-sm text-gray-500 font-body">Chave Pix ({PIX_DATA.keyType})</p>
                  <p className="text-xl font-bold text-[#2F2F2F] mt-1">{PIX_DATA.key}</p>
                  <p className="text-sm text-gray-400">{PIX_DATA.name} • {PIX_DATA.bank}</p>
                </div>

                <button
                  onClick={handleCopyPix}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-heading text-sm transition-all ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-[#556B2F] hover:bg-[#3A4A28] text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> Chave copiada!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copiar chave Pix
                    </>
                  )}
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800 font-body text-center">
                  Após concluir o pagamento, clique abaixo para nos enviar a confirmação pelo WhatsApp.
                </p>
              </div>

              <button
                onClick={handleWhatsAppPix}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-heading text-sm transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Confirmar pagamento pelo WhatsApp
              </button>
            </div>
          )}
{/* CARTÃO */}
{paymentMethod === "card" && (
  <div className="space-y-4">
    {cardSuccess ? (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="w-8 h-8 text-green-500" />
        </div>

        <p className="font-heading text-lg text-[#2F2F2F]">
          Redirecionando para o pagamento...
        </p>
      </div>
    ) : (
      <>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800 font-body text-center">
            Clique abaixo para ir para o pagamento com cartão.
          </p>
        </div>

        <div className="bg-[#FAFAF7] rounded-xl p-3 border border-[#3A4A28]/20 text-center">
  <CreditCard className="w-10 h-10 text-[#556B2F] mx-auto mb-2" />

  <p className="font-heading text-sm text-[#2F2F2F]">
    Pagamento via Cartão
  </p>

  <p className="text-xs text-gray-500">
    Aceitamos crédito e débito
  </p>

  <p className="text-base font-bold text-[#556B2F] mt-2">
    {formatCurrency(gift.price)}
  </p>
</div>

        <button
          type="button"
          onClick={() => {
            window.open(
              "https://mpago.la/11ncz82",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-heading text-sm transition-all"
        >
          <CreditCard className="w-5 h-5" />
          Pagar com Cartão
        </button>
      </>
    )}
  </div>
)}      </div>
    </div>
  </div>
);
}


function GiftsSection() {
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [filter, setFilter] = useState("Todos");

  const categories = ["Todos", ...Array.from(new Set(GIFT_LIST.map((g) => g.category)))];
  const filtered = filter === "Todos" ? GIFT_LIST : GIFT_LIST.filter((g) => g.category === filter);

  return (
    <section id="presentes" className="py-16 md:py-24 bg-[#FAFAF7]">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-[#556B2F]" />
            <h2 className="font-heading text-4xl md:text-5xl text-[#2F2F2F]">
              Lista de Presentes
            </h2>
          </div>
<p className="text-gray-500 font-body max-w-2xl mx-auto leading-relaxed">
  Sua presença é o nosso maior presente. Porém, se desejar participar da
  construção do nosso novo lar, escolha um dos itens abaixo. Cada presente
  possui valor fixo e pode ser pago via <strong>Pix</strong> ou <strong>Cartão</strong>.
</p>
        </div>

        {/* Filtro por categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-heading transition-all ${
                filter === cat
                  ? "bg-[#556B2F] text-white shadow-md"
                  : "bg-white text-[#556B2F] border border-[#556B2F]/30 hover:bg-[#556B2F]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de presentes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((gift) => (
            <div
              key={gift.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#3A4A28]/10 p-5 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedGift(gift)}
            >
             <div className="relative mb-4">
  <img
    src={gift.image}
    alt={gift.name}
    className="w-full h-52 object-cover rounded-2xl"
  />

  <span className="absolute top-3 right-3 text-xs font-heading bg-white/95 backdrop-blur-sm text-[#556B2F] px-3 py-1 rounded-full shadow-sm">
    {gift.category}
  </span>
</div>
              <h3 className="font-heading text-xl text-[#2F2F2F] mb-2">{gift.name}</h3>
              <p className="text-sm text-gray-500 font-body mb-5 flex-1 leading-relaxed">{gift.description}</p>
             <div className="flex items-center justify-between mt-auto">
  <span className="text-2xl font-bold text-[#556B2F]">
    {formatCurrency(gift.price)}
  </span>

  <button
    className="flex items-center gap-2 bg-[#556B2F] group-hover:bg-[#3A4A28] text-white text-sm font-heading px-5 py-2 rounded-full transition-all shadow-md"
  >
    <ShoppingBag className="w-4 h-4" />
    Presentear
  </button>
</div>
            </div>
          ))}
        </div>

        {/* Bloco Pix direto */}
        <div className="bg-white rounded-2xl shadow-md border border-[#3A4A28]/20 p-8 text-center max-w-md mx-auto">
          <Smartphone className="w-10 h-10 text-[#556B2F] mx-auto mb-4" />
          <h3 className="font-heading text-2xl text-[#2F2F2F] mb-2">
  Presente via Pix
</h3>
          <p className="text-sm text-gray-500 font-body mb-4 leading-relaxed">
          Caso prefira contribuir espontaneamente, utilize nossa chave Pix abaixo.
          </p>
          <div className="bg-[#FAFAF7] rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-400 mb-1">{PIX_DATA.keyType} • {PIX_DATA.bank}</p>
            <p className="text-lg font-bold text-[#2F2F2F]">{PIX_DATA.key}</p>
            <p className="text-sm text-gray-500">{PIX_DATA.name}</p>
          </div>
          <PixCopyButton />
        </div>
      </div>

      {/* Modal */}
      {selectedGift && (
        <GiftModal gift={selectedGift} onClose={() => setSelectedGift(null)} />
      )}
    </section>
  );
}

function PixCopyButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_DATA.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button
      onClick={handleCopy}
      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading text-sm transition-all ${
        copied ? "bg-green-500 text-white" : "bg-[#556B2F] hover:bg-[#3A4A28] text-white"
      }`}
    >
      {copied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar chave Pix</>}
    </button>
  );
}

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const FORM_ID = "1FAIpQLSfrtWBJb1jk-drtn_tb4fR_SXhXacv-WoYrMk-CM-gzfanhiQ";
    const urlGoogleForms = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    const params = new URLSearchParams();
    params.append("entry.1205599893", formData.nome);
    params.append("entry.1982052751", formData.telefone);
    params.append("entry.556055127", formData.acompanhantes);

    try {
      await fetch(urlGoogleForms, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      setFormData({ nome: "", telefone: "", acompanhantes: "1" });

      const mensagem = encodeURIComponent(
        `Olá!\n\nMeu nome é ${formData.nome}\nConfirmo minha presença no casamento de Gilce e Wladimir.\nQuantidade de pessoas: ${formData.acompanhantes}\nTelefone: ${formData.telefone}`
      );

      window.open(`https://wa.me/5585986772240?text=${mensagem}`, "_blank");
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#3A4A28]/30 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-2xl text-[#556B2F] hover:text-[#3A4A28] transition-smooth">
            G & W
          </a>
          <nav className="hidden md:flex gap-8">
            <a href="#historia" className="text-sm font-heading text-[#2F2F2F] hover:text-[#556B2F]">Nossa História</a>
            <a href="#presentes" className="text-sm font-heading text-[#2F2F2F] hover:text-[#556B2F]">Presentes</a>
            <a href="#rsvp" className="text-sm font-heading text-[#2F2F2F] hover:text-[#556B2F]">RSVP</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/images/capa.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#3A4A28]/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-display text-7xl md:text-8xl mb-4">Gilce & Wladimir</h1>
          <p className="text-2xl md:text-3xl font-heading mb-8">07 de Novembro de 2026 • 16:00</p>
          <a href="#historia">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#3A4A28] text-white rounded-full px-8 py-6 text-lg">
              Ver Convite
            </Button>
          </a>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 bg-white text-center">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl mb-12">Faltam</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Dias", value: countdown.days },
              { label: "Horas", value: countdown.hours },
              { label: "Minutos", value: countdown.minutes },
              { label: "Segundos", value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-lg p-6 shadow-md border border-[#3A4A28]/30">
                <div className="text-3xl md:text-5xl font-bold text-[#556B2F] mb-2">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-sm font-heading">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section id="historia" className="py-16 bg-[#FAFAF7]">
        <div className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          <div className="order-2 md:order-1">
            <h2 className="font-heading text-4xl mb-8">Nossa História</h2>
            <p className="text-lg mb-6 leading-relaxed">
              Nossa história começou com um encontro que transformou dois caminhos em uma única jornada.
              Agora chegou o momento de celebrar nossa união ao lado das pessoas que mais amamos.
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src="/images/restaurante.jpeg" 
              alt="Nossa história" 
              className="w-full max-w-md h-[400px] object-cover rounded-2xl shadow-xl border-4 border-white" 
            />
          </div>
        </div>
      </section>

      {/* Galeria - Carrossel CORRIGIDO */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-center">
            Momentos Especiais
          </h2>
          <MomentsCarousel />
        </div>
      </section>

      {/* Nosso Grande Dia */}
      <section className="py-16 md:py-24 bg-[#FAFAF7]">
        <div className="container max-w-4xl mx-auto text-center px-4">
          <h2 className="font-heading text-4xl md:text-5xl mb-8">Nosso Grande Dia</h2>
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg border border-[#3A4A28]/30 mb-8">
            <p className="text-2xl md:text-3xl font-heading text-[#556B2F] mb-6">07/11/2026 às 11:30</p>
            <p className="text-lg mb-8 leading-relaxed">
              Local da cerimônia: Av. da Abolição, 3340
Fortaleza - CE
              <br />
              Horário: 11:30
              <br /><br />
              
                           
            </p>
            <a href="https://maps.google.com/?q=Av.+da+Abolição,+3340,+Fortaleza" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#556B2F] hover:bg-[#3A4A28] text-white rounded-full px-8 py-6 text-lg font-semibold">
                Ver Localização
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Lista de Presentes */}
      <GiftsSection />

      {/* RSVP */}
      <section id="rsvp" className="py-16 md:py-24 bg-white">
        <div className="container max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-center">Confirmar Presença</h2>
          <form onSubmit={handleConfirm} className="bg-white rounded-lg p-8 shadow-lg border border-[#3A4A28]/30">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-heading mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleFormChange}
                  placeholder="Seu nome"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#3A4A28]/30 focus:outline-none focus:border-[#556B2F]"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleFormChange}
                  placeholder="(85) 98677-2240"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#3A4A28]/30 focus:outline-none focus:border-[#556B2F]"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">Quantidade de Pessoas (Incluindo você)</label>
                <select
                  name="acompanhantes"
                  value={formData.acompanhantes}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#3A4A28]/30 bg-white focus:outline-none focus:border-[#556B2F]"
                >
                  <option value="1">1 Pessoa</option>
                  <option value="2">2 Pessoas</option>
                  <option value="3">3 Pessoas</option>
                  <option value="4">4 Pessoas</option>
                  <option value="5">5 Pessoas</option>
                </select>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#556B2F] hover:bg-[#3A4A28] text-white rounded-lg py-3 text-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Confirmando..." : "Confirmar via WhatsApp"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#556B2F] py-8 text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-heading text-lg">Gilce & Wladimir</span>
          <Heart className="w-5 h-5 fill-white" />
        </div>
        <p className="text-sm opacity-75">07 de Novembro de 2026 • Fortaleza - CE</p>
      </footer>
    </div>
  );
}

// ============================================================
// CARROSSEL DE MOMENTOS - CORRIGIDO (usa todas as 11 fotos)
// ============================================================
function MomentsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Array unificado com todas as 11 fotos (extensão .jpeg correta)
  const images = [
    { src: "/images/caminhada.jpeg", alt: "Caminhada" },
    { src: "/images/escadaria.jpeg", alt: "Escadaria" },
    { src: "/images/fim-tarde.jpeg", alt: "Fim de Tarde" },
    { src: "/images/fonte.jpeg", alt: "Fonte" },
    { src: "/images/gramado.jpeg", alt: "Gramado" },
    { src: "/images/gramado2.jpeg", alt: "Gramado 2" },
    { src: "/images/neve.jpeg", alt: "Neve" },
    { src: "/images/por-do-sol.jpeg", alt: "Pôr do Sol" },
    { src: "/images/praia.jpeg", alt: "Praia" },
    { src: "/images/restaurante.jpeg", alt: "Restaurante" },
    { src: "/images/ski.jpeg", alt: "Ski" },
  ];

  useEffect(() => {
    if (!api) return;

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

  // Autoplay a cada 5 segundos
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
        opts={{ align: "center", loop: true }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="flex items-center justify-center px-2">
                <div className="relative w-full overflow-hidden rounded-xl shadow-xl">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-heading text-base md:text-lg">{img.alt}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#2F2F2F] border-0" />
        <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#2F2F2F] border-0" />
      </Carousel>

      {/* Indicadores de slide */}
      <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
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
