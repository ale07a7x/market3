import { useState } from "react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

const options = [
  { key: "option1", label: "Medallones de lentejas (x4)", price: 1200 },
  { key: "option2", label: "Medallones de porotos (x4)", price: 1500 },
  { key: "option3", label: "Medallones de garbanzos (x4)", price: 2000 },
];

export default function SelectorDeOpciones() {
  const [counts, setCounts] = useState({
    option1: 0,
    option2: 0,
    option3: 0,
  });

  const total = options.reduce((acc, option) => {
    const cantidad = counts[option.key];
    return acc + cantidad * option.price;
  }, 0);

  const increase = (key) => {
    setCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const decrease = (key) => {
    setCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] - 1),
    }));
  };

  const handleBuy = () => {
    const resumen = options
      .filter((option) => counts[option.key] > 0)
      .map((option) => ({
        nombre: option.label,
        cantidad: counts[option.key],
        subtotal: counts[option.key] * option.price,
      }));

    localStorage.setItem("pedido", JSON.stringify(resumen));
  };

  return (
    <div className="space-y-4 max-w-md mx-auto mt-14">
      <p className="text-center underline mb-4 text-xl">Nuestras variedades:</p>
      <div className="border p-4 rounded-xl space-y-4">
        {options.map((option) => (
          <div
            key={option.key}
            className="flex items-center justify-between p-4 border-b last:border-b-0"
          >
            <div>
              <span className="font-bold text-lg">{option.label}</span>
              <p className="text-sm text-gray-500">${option.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrease(option.key)}
                className="px-2 py-1 bg-gray-300 rounded-md"
              >
                -
              </button>
              <span>{counts[option.key]}</span>
              <button
                onClick={() => increase(option.key)}
                className="px-2 py-1 bg-violet-600 text-white rounded-md"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-10">
        <section className="text-xl mt-10">Total: ${total}</section>
        <Link to="/pay">
          <Button
            className="bg-verdeClaro text-white w-56 uppercase text-xl"
            onPress={handleBuy}
          >
            Prepara Pedido
          </Button>
        </Link>
      </div>
    </div>
  );
}
