import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

import Image from "next/image";
import food from "../../public/food.png";
import drop from "../../public/drop.png";
import shirt from "../../public/shirt.png";

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
    'soap': shirt,
    'toothpaste': shirt,
    'jacket': shirt,
    'socks': shirt,
    'shirt': shirt,
    'tomato': food
}

export default function SupplyList({ supplies }) {

    return (
        <div className="flex flex-col">
            {
                supplies.map((supply) =>

                    <div className="flex">

                        <div className="flex items-center justify-center bg-red-600 w-20 text-center text-green-600">
                            <Image src={SupplyIconMap[supply.type]} alt="" width={20} height={20}></Image>
                        </div>

                        {supply.quantity > 0 ?
                            <div className="bg-blue-600 w-20 text-center text-green-600">
                                {SupplyNameMap[supply.type]}
                            </div>
                            :
                            <div className="bg-blue-600 w-20 text-center text-red-600">
                                {SupplyNameMap[supply.type]}
                            </div>
                        }

                        {supply.quantity > 0 ?

                            <div className="bg-blue-600 w-2 text-center text-green-600">
                                :
                            </div>
                            :
                            <div className="bg-blue-600 w-2 text-center text-red-600">
                                :
                            </div>}

                        {supply.quantity > 0 ?
                            <div className="bg-blue-600 w-14 text-center text-green-600">
                                {supply.quantity}
                            </div>
                            :
                            <div className="bg-blue-600 w-14 text-center text-red-600">
                                {supply.quantity}
                            </div>
                        }

                    </div>

                )
            }
        </div>);
}