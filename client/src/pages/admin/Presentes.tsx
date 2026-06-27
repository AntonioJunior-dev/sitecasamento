import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getGifts,
  createGift,
  updateGift,
  deleteGift,
} from "../../services/giftsService";

type Gift = {
  id: number;
  name: string;
  price: number;
  payment_link?: string;
  status?: "available" | "reserved" | "bought";
};

export default function Presentes() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Gift | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    payment_link: "",
  });

  const load = async () => {
    const data = await getGifts();
    setGifts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const openModal = (gift?: Gift) => {
    if (gift) {
      setEditing(gift);
      setForm({
        name: gift.name,
        price: String(gift.price),
        payment_link: gift.payment_link || "",
      });
    } else {
      setEditing(null);
      setForm({ name: "", price: "", payment_link: "" });
    }
    setModal(true);
  };

  const save = async () => {
    if (editing) {
      await updateGift(editing.id, form);
    } else {
      await createGift(form);
    }

    setModal(false);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Deseja remover este presente?")) return;
    await deleteGift(id);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">🎁 Presentes</h1>

        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Novo presente
        </button>
      </div>

      {/* GRID SAAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gifts.map((g) => (
          <div
            key={g.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="font-bold">{g.name}</h2>
            <p className="text-gray-500">R$ {g.price}</p>

            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
              {g.status || "available"}
            </span>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openModal(g)}
                className="text-sm px-3 py-1 bg-yellow-400 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => remove(g.id)}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL SAAS */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-lg font-bold mb-4">
              {editing ? "Editar presente" : "Novo presente"}
            </h2>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Nome"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-2"
              placeholder="Preço"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-4"
              placeholder="Link pagamento"
              value={form.payment_link}
              onChange={(e) =>
                setForm({ ...form, payment_link: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModal(false)}
                className="px-3 py-1"
              >
                Cancelar
              </button>

              <button
                onClick={save}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}