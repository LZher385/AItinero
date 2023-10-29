"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/FormWrapper";
import useAppFormContext from "@/lib/hooks/useAppFormContext";
import  {useRouter} from "next/navigation";
import { DatePicker } from "@/components/ui/datePicker";
import { Controller } from "react-hook-form";

export default function DateForm() {
    const router = useRouter();
    const {control, trigger, formState} = useAppFormContext();
    const {isValid} = formState;

    return (
        <FormWrapper>
            <div className="flex flex-col place-items-center">
                <div className="text-xl font-semibold">
                <p><strong>When</strong> do you want to go?</p>
                </div>
                <div className="my-2 flex flex-row px-2">
                    <div className="mx-2">
                        <Controller
                            control={control} 
                            name = "startDate"
                            rules = {{required: true}}
                            render = {( {field: {onChange, value, ref}}) => (
                        <DatePicker
                        onChange={onChange}
                        placeholder="Start Date"
                        selected = {value}/>
                            )}
                        />
                    </div>
                    <div className="mx-2">
                        <Controller
                            control={control}
                            name = "endDate"
                            rules = {{required: true}}
                            render = {({field: {onChange, onBlur, value, ref,}}) => (
                            <DatePicker
                            onChange={onChange}
                            placeholder="End Date"
                            selected = {value}/>)}
                        />
                    </div>
                </div>
                <div className="flex flex-row my-5">
                    <div mx-10 className="mx-20">
                        <Button type="button" onClick={() => router.push('/home/location')}>
                            Back
                        </Button>
                    </div>
                    <div className="mx-20">
                        <Button type="submit">
                            Next
                        </Button>
                    </div>
                </div>

            </div>
        </FormWrapper>
    )
}