import Link from "next/link";

function ObraCard({obra}){
    return(
        <Link className="p-4 shadow-md hover:shadow-lg rounded-lg transition-shadow duration-300 max-w-xs mx-auto"
              href={`/obras/${obra.id}`}
        >
            {
                obra.imagen && (
                    <div className="aspect-w-1 aspect-h-1">
                        <img
                            src={obra.imagen}
                            className="w-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                            alt=""
                        />
                    </div>
                )
            }
            <div className="p-4">
                <h1 className="text-lg font-bold text-gray-900">{obra.nombre}</h1>
                <h1 className="text-sm italic text-gray-600"><span className="italic">De :  </span> {obra.autor}</h1>
                <h1 className="text-sm text-purple-500 font-medium uppercase tracking-wide">{obra.categoria}</h1>
                <h1 className="text-2xl font-bold text-blue-600">
                    <span className="bg-blue-100 px-2 py-1 rounded-full">S/ {obra.price.toFixed(2)}</span></h1>

            </div>


        </Link>

)
}

export default ObraCard;