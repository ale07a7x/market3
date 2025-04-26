import { useEffect, useState } from "react";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import axios from "axios";
import off from "../assets/10off.png";

export default function Pay() {
  const [pedido, setPedido] = useState([]);
  const [tab, setTab] = useState("tarjeta");
  const [nombre, setNombre] = useState("");
  const [nombreValido, setNombreValido] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const aliasTransferencia = "mi.alias.bancario";

  useEffect(() => {
    const data = localStorage.getItem("pedido");
    if (data) {
      setPedido(JSON.parse(data));
    }
  }, []);

  const total = pedido.reduce((acc, item) => acc + item.subtotal, 0);
  const totalConDescuento = (total * 0.9).toFixed(2);

  const handleConfirmar = async () => {
    try {
      const response = await axios.post("/api/create_preference", {
        items: pedido,
        nombre,
      });
      window.location.href = response.data.init_point;
    } catch (error) {
      console.error("Error al iniciar el pago", error);
    }
  };

  const copyAlias = () => {
    navigator.clipboard.writeText(aliasTransferencia);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleNombreChange = (e) => {
    const value = e.target.value;
    setNombre(value);

    const parts = value.trim().split(/\s+/);
    const isValid = parts.length >= 2 && parts.every((p) => p.length >= 2);
    setNombreValido(isValid);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-xl mx-auto bg-white/70 shadow-xl rounded-xl p-6 space-y-6">
        <div className="flex justify-center gap-10">
          <button
            className={`px-4 py-2 rounded-t-lg transition-all ${
              tab === "tarjeta"
                ? "border-b-2 border-violet-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setTab("tarjeta")}
          >
            Tarjeta
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg transition-all ${
              tab === "transferencia"
                ? "border-b-2 border-green-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setTab("transferencia")}
          >
            Transferencia
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold underline text-center">
            Resumen de tu pedido:
          </h2>
          <ul className="space-y-10 text-md">
            {pedido.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.nombre}</span>
                <span>
                  {item.cantidad} x ${item.subtotal / item.cantidad}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-10">
          <Input
            type="text"
            label="Ingresa tu nombre para agendar el pedido"
            value={nombre}
            onChange={handleNombreChange}
            isInvalid={!nombreValido && nombre.length > 0}
            errorMessage={
              !nombreValido && nombre.length > 0
                ? "Ingrese nombre y apellido válidos"
                : ""
            }
            variant="bordered"
          />

          {tab === "tarjeta" && (
            <>
              <div className="text-center space-y-1">
                <h3 className="text-xl font-semibold">Total a pagar:</h3>
                <p className="text-2xl text-gray-800">${total}</p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleConfirmar}
                  disabled={!nombreValido}
                  className={`uppercase px-6 py-2 rounded-lg font-semibold transition ${
                    nombreValido
                      ? "bg-verdeClaro hover:bg-green-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Confirmar Pago
                </button>
              </div>
            </>
          )}

          {tab === "transferencia" && (
            <div className="text-center space-y-4">
              <Image alt="10% Off" src={off} width={100} />
              <p className="text-2xl text-green-600">${totalConDescuento}</p>
              <div className="flex flex-col items-center gap-2">
                <span className="font-semibold">{aliasTransferencia}</span>
                <button
                  onClick={copyAlias}
                  disabled={!nombreValido}
                  className={`px-4 py-2 rounded-lg uppercase text-sm font-medium transition ${
                    nombreValido
                      ? "bg-verdeClaro hover:bg-green-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Copiar Alias
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          Alias copiado al portapapeles!
        </div>
      )}
    </div>
  );
}
