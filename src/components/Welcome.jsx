import { Image } from "@heroui/image";
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"
import Selectproducts from "../components/Selectproducts"

export default function Welcome() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-center my-2 mt-10 text-4xl">Hamburguesas Vegetarianas!</h1>

      <div className="flex items-center justify-between my-4 mt-10">
        <Image
          alt="HeroUI hero Image"
          src={image1}
          width={100}
        />

        <Image
          alt="HeroUI hero Image"
          src={image2}
          width={100}
        />

        <Image
          alt="HeroUI hero Image"
          src={image1}
          width={100}
        />
      </div>
      <Selectproducts />
    </div>
  );
}
