import Link from "next/link";
import Image from "next/image";
import constuction3 from "../../../images/constuction3.png"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professionnel",
    description: "Create Professionnel",
};

export default function Page() {
    return (
        <div className="container flex flex-col mx-auto my-10 md:my-30 md:flex-row md:justify-between md:items-center">
            <div className="flex-none md:w-1/2 mx-5 md:mx-0">
                <p className="text-sm font-medium md:text-title-sm text-gray">ÉTAPE 1</p>
                <p className="py-5 font-semibold leading-tight text-black whitespace-pre-wrap text-title-xl2 md:text-xl">Découvrir de nouvelles opportunités sur les projets de construction et dépannage</p>
                <p className="text-black text-title-sm">Si vous êtes un professionnel de la construction ou en dépannage à la recherche de nouveaux projets, il vous suffit de saisir votre code postal pour accéder aux projets proposés par les particuliers de votre région.</p>
                <button className="py-4 my-6 text-xs font-semibold text-white bg-indigo-800 rounded-md w-60 hover:bg-blue-700">
                    <Link href={"/signup-espace"}>Remplir le formulaire</Link>
                </button>
            </div>
            <div className="pt-5 md:pt-6">
                <Image
                    alt=""
                    width="585"
                    height="439"
                    src={constuction3}
                />
            </div>
        </div>
    );
}