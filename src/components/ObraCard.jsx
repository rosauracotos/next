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
                <h1 className="text-lg font-bold">{obra.nombre}</h1>
                <h1 className="text-lg font-bold">{obra.autor}</h1>
                <h1 className="text-lg font-bold">{obra.categoria}</h1>
                <h1 className="text-2xl text-slate-600">{obra.price}</h1>

            </div>


        </Link>

    )
}

export default ObraCard;