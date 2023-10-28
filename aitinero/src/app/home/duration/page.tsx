"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/FormWrapper";
import useAppFormContext from "@/lib/hooks/useAppFormContext";
import  {useRouter} from "next/navigation";


export default function DateForm() {
    const router = useRouter();
    const {register, trigger, formState} = useAppFormContext();
    const {isValid} = formState;

    return (
        <FormWrapper>
            <div className="flex flex-col place-items-center">
                <div className="text-slate-700 text-xl font-semibold">
                <p><strong>When</strong> do you want to go?</p>
                </div>
                <div className="text-white my-2 flex flex-row">
                    <Input type="date" className="rounded-md p-2 w-24 bg-slate-800 mx-2" {...register('startDate')}/>
                    <Input type="date" className="rounded-md p-2 w-24 bg-slate-800 mx-2" {...register('endDate')}/>
                </div>
                <div className="place-self-end">
                    <Button type="submit">
                        Next
                    </Button>
                </div>
            </div>
        </FormWrapper>
    )
}