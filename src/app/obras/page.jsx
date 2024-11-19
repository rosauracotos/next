import ObraCard from '@/components/ObraCard'
import axios from "axios";


async function loadObras() {
    const {data} = await axios.get("http://localhost:3000/api/obras")
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