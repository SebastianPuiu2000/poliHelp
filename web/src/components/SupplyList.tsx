export default function SupplyList({ supplies }) {

    return (
    <div>
        {
            supplies.map(supply => 
                <div>
                    {supply.type}
                    {supply.quantity}
                </div>

            )
        };
    </div>);
}