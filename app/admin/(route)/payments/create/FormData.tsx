import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'
import { InputBox, SelectBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFetch } from "@/contexts/useFetch";
import { usePost } from "@/contexts/usePost";
import { usePathname } from 'next/navigation'
import { MdAccountBalanceWallet } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
const options: any = {
    mode: 'payment',
    amount: 100,
    payment_method_types: ["card"],
    currency: 'usd',
};

const initialData = {
    userId: "",
    type: "",
    amount: 0,
    refId: "",
}

function Form({ resource, router }: any) {
    const pathname = usePathname()
    const stripe: any = useStripe();
    const elements: any = useElements();
    const searchParams = useSearchParams()
    const info: any = searchParams.get('info')
    const payment_intent = searchParams.get('payment_intent')

    useEffect(() => {
        let body = JSON.parse(info)
        create(resource, { ...body, refId: payment_intent })
    }, [info, payment_intent])

    const validationSchema = Yup.object().shape({
        userId: Yup.string().required("User required"),
        type: Yup.string().required("Type is required"),
        amount: Yup.number().required("Amount is required"),
    });

    const { data: users } = useFetch({ url: "users", query: JSON.stringify({ "role": "user" }) });
    const userOptions = users?.data ? users.data.map((item: any) => {
        return { label: `${item?.name}`, value: item?.id }
    }) : []

    const { create, data: respond, loading } = usePost();
    const handleUpdate = (body: any) => {
        create(resource, body)
    }
    if (respond) {
        toast.success(`New ${resource} add successfully`);
        router.push('/admin/payments')
    }

    return (
        <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                if (values?.type == "card") {

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
                            amount: Number(values.amount),
                            currency: 'usd',
                            payment_method_types: ["card"]
                        }),
                    });
                    const clientSecret = await response.json();
                    if (!clientSecret?.error) {
                        // Make Payment
                        await stripe.confirmPayment({
                            elements,
                            clientSecret,
                            confirmParams: {
                                return_url: `${origin}${pathname}?info=${JSON.stringify(values)}`,
                            },
                        });
                    } else {
                        toast.error(clientSecret.message)
                    }
                } else {
                    handleUpdate(values)
                }
            }}>
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                return <div className="p-3 mx-50">
                    <div className="mb-4">
                        <SelectBox
                            required={true}
                            options={userOptions}
                            name="userId"
                            label="User"
                            placeholder="Select User"
                        />
                    </div>
                    <div className="mb-4">
                        <SelectBox
                            required={true}
                            options={[{ label: "COD", value: "cod" }, { label: "CARD", value: "card" }]}
                            name="type"
                            label="Type"
                            placeholder="Select Type"
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="amount"
                            label="Amount"
                            placeholder="Enter Amount"
                            type="number"
                            icon={<MdAccountBalanceWallet />}
                        />
                        {values?.type == "card" && (<div className='mt-5'><PaymentElement /></div>)}
                    </div>
                    <div className="mb-4">
                        <Buttons value={"Add new"} isLoading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            }}
        </Formik>
    );
}

export const FormData = ({ resource, router }: any) => (
    <Elements stripe={stripePromise} options={options}>
        <Form resource={resource} router={router} />
    </Elements>
);