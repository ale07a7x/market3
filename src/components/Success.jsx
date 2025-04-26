import {Image} from "@heroui/image";
import thankyou from "../assets/gracias.png"

export default function Success() {
  return (
    <div className="min-h-screen bg-fondo flex justify-center items-center">
      <Image
      alt="HeroUI hero Image"
      src={thankyou}
      width={300}
    />
    </div>
  );
}
