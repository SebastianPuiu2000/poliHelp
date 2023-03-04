import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

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

export default function SupplyList({ supplies }) {
    const supplys = [{type: "egg", quantity: "5"}, {type: "water", quantity: "20"}, {type: "bread", quantity: "10"}];
    return (
    <div className="flex flex-col">
        {
            supplys.map((supply) => 

                <div className="flex">

                    
                    <div className="bg-pink-600 w-20 text-center">
                        {SupplyNameMap[supply.type]}
                    </div>

                    <div className="bg-blue-600 w-2 text-center">
                        -
                    </div>
                    
                    <div className="bg-orange-600 w-10 text-center">
                        {supply.quantity}
                    </div>
                    
                </div>

            )
        }
    </div>);
}