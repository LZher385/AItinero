'use client';

import useAppForm from "@/lib/hooks/useAppForm";
import { SubmitHandler, FormProvider as ReactHookFormProvider } from "react-hook-form";
import { FormValues } from "../types/form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// BE imports
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function FormProvider({ children }: FormProviderProps) {
    const route = useRouter();
    const methods = useAppForm({
        location: '',
        startDate: undefined,
        endDate: undefined
    });
    const createTrip = useMutation(api.trips.create);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const isValid = await methods.trigger();
        if (isValid) {
            const id = await createTrip({
                body: {
                    location: data.location,
                    start_date: data.startDate.toISOString(),
                    end_date: data.endDate.toISOString(),
                    name: `${data.location}-${data.startDate}`
                }
            });
            
            route.push('/home')
        } else {
            route.replace('/home')
        }
    };

    useEffect(() => {
        if (methods.formState.isSubmitSuccessful) {
            methods.reset({ location: '', startDate: undefined, endDate: undefined});
        }
    });

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