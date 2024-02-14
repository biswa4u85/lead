"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { AiOutlineDoubleRight, AiFillHome } from "react-icons/ai";
import Image from "next/image";
import paypal from "../../../images/paypal.png"
import card from "../../../images/card.png"
import stripeImg from "../../../images/stripe.png"
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useFetch } from "@/contexts/useFetch";
import { toast } from 'react-toastify';
import language from "@/contexts/language";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

function InnerPage({ leads }: any) {
    const stripe: any = useStripe();
    const elements: any = useElements();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const calcTotal = (items: any, type = 'all') => {
        let total = 0
        for (let item of items) {
            if (type == 'all') {
                total += (item.qty && item.rate) ? Number(item.qty * item.rate) + Number(item.tax ?? 1 * Number(item.qty * item.rate) / 100) : 0
            } else {
                total += (item.qty && item.rate) ? Number(item.qty * item.rate) : 0
            }
        }
        return total
    }

    const handleUpdate = async () => {
        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            toast.error(submitError.message);
            return;
        }
        // Make Server Sessions
        const response: any = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: Number(leads?.invoice?.items ? calcTotal(leads?.invoice?.items) : 0),
                currency: 'usd',
                payment_method_types: ["card"]
            }),
        });
        const clientSecret = await response.json();
        if (!clientSecret?.error) {
            // Make Payment
            await stripe.confirmPayment({
                elements,
                clientSecret: clientSecret.data,
                confirmParams: {
                    return_url: `${origin}/${'success'}?id=${id}`,
                },
            });
        } else {
            toast.error(clientSecret.message)
        }
    }

    return (
        <>
            <div className="container p-10 mx-auto mb-10 md:mb-10">
                <div className="flex items-center pb-2">
                    <AiFillHome size="20" className="text-indigo-900" />
                    <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                    <p className="font-normal text-indigo-900 font-roboto text-2xs">{language.project}</p>
                    <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                    <p className="font-normal text-indigo-900 font-roboto text-2xs">{language.payment}</p>

                </div>
                <div className="grid md:grid-cols-3 gap-9">
                    <div className="text-black md:col-span-2 sm:col-span-1">
                        <p className="pb-2 font-semibold border-b border-gray-700 text-sm2 font-inter text-deep-black">{language.payment_method}</p>

                        <div className="grid gap-4 pt-6 md:grid-cols-4">
                            {/* <div className="md:col-span-1 flex flex-col justify-around items-center shadow-[0px_0px_10px_1px_#F2F6FB] rounded-sm py-6 ">
                                <Image
                                    alt=""
                                    width="50"
                                    height="29"
                                    src={card}
                                />
                                <p>Credit/Debit Card</p>
                            </div> */}
                            {/* <div className="flex flex-col justify-around items-center shadow-[0px_0px_10px_1px_#F2F6FB] rounded-sm py-6">
                                <Image
                                    alt=""
                                    width="41"
                                    height="50"
                                    src={paypal}
                                />
                                <p>Paypal</p>
                            </div> */}
                            <div className="flex flex-col justify-around items-center shadow-[0px_0px_10px_1px_#F2F6FB] rounded-sm py-6">
                                <Image
                                    alt=""
                                    width="50"
                                    height="20"
                                    src={stripeImg}
                                />
                                <p>{language.stripe}</p>
                            </div>
                        </div>

                        <div className="grid gap-4 pt-6 md:grid-cols-2">
                            <div>
                                <p className="mb-5 font-semibold text-indigo-900 text-sm1 font-inter">{language.cards_details}</p>
                                <div><PaymentElement /></div>
                                <button type="submit" onClick={() => handleUpdate()} className="w-full p-2 my-5 text-sm font-normal text-white bg-indigo-800 rounded-md font-poppins">
                                    {language.pay}
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-1">
                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] mt-7 p-3">
                            <p className="text-sm font-medium font-inter text-graylight-800">{language.profeional_details}</p>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.name}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{leads?.profeional?.firstName} {leads?.profeional?.lastName}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.company}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{leads?.profeional?.company}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.postal_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{leads?.profeional?.postalCode}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.phone_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{leads?.profeional?.phone}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.email_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{leads?.profeional?.email}</p>
                            </div>
                            <div className="flex items-start justify-between py-3">
                                <p className="w-1/2 text-sm font-normal text-gray-700">{language.address}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{leads?.profeional?.firstName} {leads?.profeional?.lastName}, {leads?.profeional?.company},  {leads?.profeional?.postalCode}</p>
                            </div>
                        </div>
                        <button type="submit" onClick={() => handleUpdate()} className="w-full p-2 my-5 text-sm font-normal text-white bg-indigo-800 rounded-md font-poppins">
                            {language.pay}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function Page() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    const [options, setOptions] = useState<any>({})
    const { data: leads } = useFetch({ url: "submit", query: JSON.stringify({ type, id }) });
    useEffect(() => {
        if (leads) {
            setOptions({
                mode: 'payment',
                amount: (type == "depannage" && leads?.data) ? Number(leads?.data?.depannageCategory?.price) : 100,
                payment_method_types: ["card"],
                currency: 'usd',
            })
        }
    }, [leads])

    if (!options?.mode) return <></>

    return <Elements stripe={stripePromise} options={options}>
        <InnerPage leads={leads?.data} />
    </Elements>
}