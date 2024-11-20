import ObraCard from '@/components/ObraCard'
import axios from "axios";


async function loadObras() {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/obras`)
    return data;
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