"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/FormWrapper";
import useAppFormContext from "@/lib/hooks/useAppFormContext";
import  {useRouter} from "next/navigation";


export default function LocationForm() {
    const router = useRouter();
    const {register, trigger, formState} = useAppFormContext();
    const {isValid} = formState;
    const validateStep = async () => {
        await trigger();
        console.log("validating")
        if (isValid) {
            router.push('/home/duration');
        }
    }

    return (
        <FormWrapper>
            <div className="flex flex-col place-items-center">
                <div className="text-slate-700 text-xl font-semibold">
                <p><strong>Where</strong> do you want to go?</p>
                </div>
                <div className="text-white my-2">
                    <Input type="text" className="rounded-md p-2 w-96 bg-slate-800" {...register('location')}/>
                </div>
                <div className="place-self-end">
                    <Button type="button" onClick={validateStep}>
                        Next
                    </Button>
                </div>
            </div>
        </FormWrapper>
    )
}