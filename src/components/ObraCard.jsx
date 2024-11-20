import Link from "next/link";

function ObraCard({obra}){
    return(
        <Link className="bg-white rounded-lg border-gray-800  mb-3  hover:bg-gray-100 hover:cursor-pointer"
              href={`/obras/${obra.id}`}
        >
            {
                obra.imagen && (
                    <img src={obra.imagen} className='w-full  rounded-t-lg' alt="" />
                )
            }
            <div className="p-4">
                <h1 className="text-xl font-bold text-gray-800 mb-2">{obra.nombre}</h1>
                <h1 className="text-sm text-gray-500 mb-1"><span className="italic">De </span> {obra.autor}</h1>
                <h1 className="text-sm text-gray-400 mb-2 capitalize">{obra.categoria}</h1>
                <h1 className="text-2xl font-bold text-blue-600"> S/ {obra.price.toFixed(2)}</h1>

            </div>


        </Link>

    )
}

export default ObraCard;