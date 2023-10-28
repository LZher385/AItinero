'use client';

import useAppForm from "@/lib/hooks/useAppForm";
import { SubmitHandler, FormProvider as ReactHookFormProvider } from "react-hook-form";
import { FormValues } from "../types/form";
import { useRouter } from "next/navigation";

export default function FormProvider({ children }: FormProviderProps) {
    const route = useRouter();
    const methods = useAppForm({
        location: '',
        startDate: undefined,
        endDate: undefined
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const isValid = true;
        if (isValid) {
            console.log(data)
        } else {
            route.replace('/home')
        }
    };

    console.log(methods)

    return (
        <ReactHookFormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </ReactHookFormProvider>
    )
}

interface FormProviderProps {
    children: React.ReactNode;
}