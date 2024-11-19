import Link from "next/link";

function Navbar() {
    return(
        <nav className="bg-zinc-900 text-fuchsia-600 py-3 mb-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                <h3 className="text-3xl"> NextMySQL </h3>
                </Link>
                <ul>
                    <li>
                        <Link href="/new" className="text-sky-500 hover:text-sky-400">
                            AGREGAR
                        </Link>

                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;