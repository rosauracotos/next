import ObraCard from '@/components/ObraCard'

async function loadObras() {
    const response = await fetch("http://localhost:3000/api/obras", {
        cache: 'no-store', // Esto evita la reutilización de datos cacheados en entornos estáticos
    });

    if (!response.ok) {
        throw new Error("Error al cargar las obras");
    }

    return response.json();
}

 async function ObrasPage(){
    const obras = await loadObras();
    console.log(obras);
    return(
        <div className="grid gap-4 grid-cols-4">
            {obras.map(obra => (
                <ObraCard obra={obra} key={obra.id}/>
                )
                )}

            </div>
    )
}

export default ObrasPage;