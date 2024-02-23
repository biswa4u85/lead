import { AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import laburimg from "../../../images/laburimg.png"
import constuction from "../../../images/constuction.png"
import constuction2 from "../../../images/constuction2.png"
import { Metadata } from "next";
import language from "@/contexts/language";


export const metadata: Metadata = {
    title: "Professionnel",
    description: "Create Professionnel",
};

export default function Page() {
    return (
        <>
            <div className="bg-custom-blue">
                <div className="container flex flex-col mx-auto md:flex-row md:justify-between md:items-center">
                    <div className="flex-none md:w-1/2">
                        <p className="py-5 font-medium leading-tight text-black whitespace-pre-wrap text-title-xl2 md:text-6xl mx-5 md:mx-0">Augmentez vos revenus et votre performance avec nos <span className="font-bold text-indigo-800 border-b" >services</span></p>
                        <button className="flex items-center justify-between flex-initial px-4 py-4 my-6 text-xs font-semibold text-white bg-indigo-800 rounded-md w-60 hover:bg-blue-700 ml-5 md:ml-0">
                            <Link href={"/espace-pro-detail"} className="flex items-center justify-between">
                                Inscription <AiOutlineRight className="mt-1" />
                            </Link>
                        </button>
                    </div>
                    <div className="pt-5 md:pt-6">
                        <Image
                            alt=""
                            width="384"
                            height="514"
                            src={laburimg}
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="my-10">
                    <h2 className="mb-6 text-lg font-semibold text-center text-black md:xl">Venez tester nos offres pour booster votre <p className="font-bold text-indigo-800 underline break-all">activité de construction</p> </h2>
                    <h3 className="mb-6 text-sm font-semibold text-center text-black md:xl">Des solutions simples conçues pour votre activité </h3>

                    <div className="grid  md:grid-cols-4 sm:grid-cols-1 gap-8">
                        <div className="py-8 px-8 bg-gray-4 text-center rounded-[16px]">
                            <p className="text-lg font-bold text-indigo-800">1</p>
                            <p className="py-5 text-md font-medium text-black">Vous postulez en ligne via notre formulaire intuitif (moins de 2min)</p>
                        </div>
                        <div className="py-8 px-8 bg-gray-4 text-center rounded-[16px]">
                            <p className="text-lg font-bold text-indigo-800">2</p>
                            <p className="py-5 text-md font-medium text-black">Nous analysons votre candidature</p>
                        </div>
                        <div className="py-8 px-8 bg-gray-4 text-center rounded-[16px]">
                            <p className="text-lg font-bold text-indigo-800">3</p>
                            <p className="py-5 text-md font-medium text-black">Vous êtes recontactés sous 7 jours maximum</p>
                        </div>
                        <div className="py-8 px-8 bg-gray-4 text-center rounded-[16px]">
                            <p className="text-lg font-bold text-indigo-800">4</p>
                            <p className="py-5 text-md font-medium text-black">Vous intégrez notre réseau !</p>
                        </div>

                    </div>

                </div>
            </div>


            <div className="bg-custom-blue">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 py-14">
                        <div className="md:col-span-2 mx-5 md:mx-0">
                            <p className="py-1 text-lg font-semibold text-black">{`Comment trouver des projet de dépannage en tant qu'artisan du bâtiment avec Dépannage - Travaux`}</p>
                            <p className="py-1 text-xs leading-7 text-gray md:leading-normal">{`Les raisons qui poussent un artisan indépendant à chercher de nouveaux projet de dépannage auprès de particuliers ou de sociétés sont multiples. Que vous soyez au début de votre activité ou que votre entreprise ait déjà de nombreuses années d'expérience et cherche à élargir sa clientèle, la recherche de nouveaux projet est un défi constant pour les artisans du bâtiment. Dépannage - Travaux est là pour simplifier le processus. Notre société de services a pour vocation de mettre en relation les entreprises du bâtiment avec des particuliers ou des sociétés cherchant à obtenir un devis pour un projet de travaux. Notre plateforme offre un moyen efficace et transparent de trouver de nouveaux chantiers. 2 Nous analysons votre candidature 3 Vous êtes recontactés sous 7 jours maximum 4 Vous intégrez notre réseau ! Des solutions simples conçues pour votre activité Les raisons qui poussent un artisan indépendant à chercher de nouveaux chantiers auprès de particuliers ou de sociétés sont multiples. Que vous soyez au début de votre activité ou que votre entreprise ait déjà de nombreuses années d'expérience et cherche à élargir sa clientèle, la recherche de nouveaux chantiers est un défi constant pour les artisans du bâtiment.`}</p>
                            <p className="py-1 text-xs leading-7 text-gray md:leading-normal">{`Dépannage - Travaux est là pour simplifier le processus. Notre société de services a pour vocation de mettre en relation les entreprises du bâtiment avec des particuliers ou des sociétés cherchant à obtenir un devis pour un projet de travaux. Notre plateforme offre un moyen efficace et transparent de trouver de nouveaux projet.`}</p>
                            {/* <button className="flex items-center justify-between flex-initial px-4 my-6 text-xs font-semibold text-indigo-800 rounded-md w-35 hover:bg-blue-700">
                                Learn more
                                <AiOutlineRight className="mt-1" />
                            </button> */}
                        </div>
                        <div className="...">
                            <Image
                                alt=""
                                width="510"
                                height="439"
                                src={constuction}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 py-14">
                    <div className="...">
                        <Image
                            alt=""
                            width="510"
                            height="439"
                            src={constuction2}
                        />
                    </div>
                    <div className="col-span-2 mx-5 md:mx-0">
                        <p className="py-1 text-lg font-semibold text-black">{`Alors, comment trouver des projets de travaux lorsque vous êtes un artisan du bâtiment avec Dépannage - Travaux ?`} </p>
                        <p className="py-1 text-xs leading-7 text-gray md:leading-normal">{`Plusieurs méthodes se sont révélées efficaces, notamment le bouche-à-oreille et la prospection de proximité. De plus, une solide réputation en ligne constitue un atout indéniable pour les artisans en quête de nouveaux travaux. Il est à noter qu’en France, la demande de travaux émanant des particuliers est abondante et constante. Tout ce qu'il vous faut, c'est savoir où chercher pour développer rapidement votre entreprise et renforcer votre réputation.`}</p>
                        <p className="py-1 text-xs leading-7 text-gray md:leading-normal">{`Quel que soit votre domaine de spécialité (plombier-chauffagiste, électricien, peintre, maçon, couvreur, carreleur, etc.), il est essentiel de cultiver votre réseau.`} </p>
                        {/* <button className="flex items-center justify-between flex-initial px-4 my-6 text-xs font-semibold text-indigo-800 rounded-md w-35 hover:bg-blue-700">
                            Learn more
                            <AiOutlineRight className="mt-1" />
                        </button> */}
                    </div>

                </div>
            </div>


            <div className="flex items-center justify-center w-full text-center" style={{
                backgroundImage: 'url("/images/add-bg.png")',
                backgroundRepeat: "no-repeat",
                height: "644px",
                backgroundSize: 'cover'
            }}>
                <div className="container mx-5 md:mx-auto">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h2 className="py-2 text-xl text-white"> De <span className="text-indigo-800 ">Plus</span> </h2>
                        <p className="py-4 text-xs text-white md:text-title-sm">{`Nous avons mis en place une solution d'adhésion pour les entreprises du bâtiment, offrant un accès à de nombreux services : des leads qualifiés, des rendez-vous pour le chiffrage de devis, la possibilité de déposer une annonce pour la recherche de profils à embaucher, ainsi que des offres spéciales en partenariat avec nos organismes de formation.`}</p>
                        <p className="py-4 text-xs text-white md:text-title-sm">{`Le concept est simple : une adhésion mensuelle à 199€, vous donnant droit à une page web de présentation et 12 points à dépenser chaque mois. Un lead qualifié coûte 2 points, un rendez-vous qualifié coûte 4 points, et une annonce pour un profil recherché requiert 10 points. Les points non utilisés au cours des 3 derniers mois sont cumulables et réutilisables. Si un adhérent n'a plus de points et souhaite utiliser un service, il a la possibilité d'acheter des points supplémentaires au prix unitaire de 15 € ou un pack de 10 points pour 120 €.`}</p>
                        <p className="py-2 text-xs text-white md:text-title-sm">{`Avec Dépannage - Travaux, vous avez l'opportunité de maximiser votre visibilité, d'accéder à des projets de qualité et de développer votre entreprise avec une efficacité inégalée.`}</p>
                    </div>
                </div>

            </div>


            <div className="container  mx-auto">
                <div className="py-10  mx-5 md:mx-0">
                    <h2 className="mb-6 text-lg font-semibold text-center text-black md:text-xl">Avantages de <span className="font-bold text-indigo-800 underline">Dépannage-Travaux</span> </h2>
                    <p className="py-5 text-sm font-semibold text-center whitespace-normal text-black-light md:whitespace-normal md:text-title-sm">{`Les avantages à passer par Dépannage - Travaux pour trouver des projets de dépannage ou travaux`}</p>
                    <p className="text-sm font-normal text-center whitespace-normal text-black-light md:whitespace-normal">{`Lorsque vous êtes un artisan à la recherche de nouveaux projets, Dépannage-Travaux est là pour simplifier votre démarche. Notre plateforme offre une solution efficace pour trouver rapidement des travaux auprès de particuliers, avec des profils d'artisans qui reflètent la qualité de leurs services, certifiée par les avis clients publiés sur Dépannage-Travaux. Grâce à des informations précises et vérifiées, votre profil présentera la meilleure image de votre entreprise aux particuliers à la recherche de professionnels fiables et compétents.`}</p>
                    <p className="py-5 text-sm font-semibold text-center whitespace-normal text-black-light md:whitespace-normal md:text-title-sm">{`Passer par Dépannage-Travaux offre plusieurs avantages aux artisans cherchant à décrocher des travaux rapidement :`}</p>
                </div>
            </div>


            <div className="flex flex-col items-start md:flex-row md:justify-center">
                <div className="py-8 px-4 text-center w-full  md:w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">1</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">Des offres adaptées à vos attentes </p>
                    <p className="text-xs font-semibold text-black-light">{`Contrairement aux réseaux sociaux ou aux sites non spécialisés, Dépannage-Travaux vous fait parvenir des offres de dépannage ou travaux spécifiquement liées à votre activité.`}</p>
                </div>
                <div className="py-8 px-4 text-center w-full  md:w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">2</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">Une communication simplifiée</p>
                    <p className="text-xs font-semibold text-black-light">{`Avec notre plateforme, le contact direct avec les particuliers est facilité, vous permettant ainsi d"interagir plus aisément.`}</p>
                </div>
                <div className="py-8 px-4 text-center w-full  md:w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">3</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">De nombreuses offres de travaux</p>
                    <p className="text-xs font-semibold text-black-light">{`Notre service étant entièrement gratuit pour les particuliers, ceux-ci sont nombreux à rechercher des artisans sur Dépannage-Travaux, vous offrant ainsi un large éventail d'opportunités.`}</p>
                </div>

            </div>
        </>
    );
}