import Image from "next/image";
import food from "../../public/food.png";
import drop from "../../public/drop.png";
import shirt from "../../public/shirt.png";
import paper from "../../public/toilet-paper.png";

const SupplyNameMap = {
  'egg': 'Eggs',
  'bread': 'Bread',
  'cheese': 'Cheese',
  'water': 'Water',
  'pants': 'Pants',
  'blanket': 'Blankets',
  'soap': 'Soap',
  'toothpaste': 'Toothpaste',
  'jacket': 'Jackets',
  'socks': 'Socks',
  'shirt': 'Shirts',
  'tomato': 'Tomatoes'
}

const SupplyIconMap = {
  'egg': food,
  'bread': food,
  'cheese': food,
  'water': drop,
  'pants': shirt,
  'blanket': shirt,
  'soap': paper,
  'toothpaste': paper,
  'jacket': shirt,
  'socks': shirt,
  'shirt': shirt,
  'tomato': food
}

export default function SupplyList({ supplies, request }) {
  return (
    <div className="flex flex-col w-full">
      {
        supplies.map((supply) =>
          <div key={supply.type} className="flex border-2 border-mantis-300 rounded items-center justify-between my-1">

            <div className="flex items-center justify-center w-20 pl-4 text-center h-6 text-lg">
              <Image src={SupplyIconMap[supply.type]} alt="" width={20} height={20}></Image>

              <div className="w-20 text-center text-mantis-800 pl-2">
                {SupplyNameMap[supply.type]}
              </div>
            </div>

            {request ?
              <div className="flex flex-col justify-center text-center text-xl w-10 text-mahogany-500">
                {supply.quantity}
              </div>
              :
              <div className="flex flex-col justify-center text-center text-xl w-10 text-mantis-700">
                {supply.quantity}
              </div>
            }

          </div>
        )
      }
    </div>
  );
}
