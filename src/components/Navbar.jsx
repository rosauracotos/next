import Link from "next/link";

function Navbar() {
    return(
        <nav className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 py-4 mb-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <h4 className="text-white font-bold text-2xl italic bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent hover:underline transition duration-300">
                        Inicio
                    </h4>
                </Link>

                <h3 className="text-white font-extrabold text-5xl tracking-wide bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent shadow-lg">
                    BookStore+
                </h3>

                <ul>
                    <li>
                        <Link
                            href="/new"
                            className="bg-yellow-400 text-zinc-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 hover:text-zinc-800 transition duration-300"
                        >
                            Añadir Nuevo Libro
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar;