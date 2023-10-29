'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormWrapper from '@/components/FormWrapper';
import useAppFormContext from '@/lib/hooks/useAppFormContext';
import { useRouter } from 'next/navigation';

export default function LocationForm() {
  const router = useRouter();
  const { register, trigger, formState } = useAppFormContext();
  const validateStep = async () => {
    let isValid = await trigger('preferences');
    if (isValid) {
      router.push('/home/duration');
    }
  };

  return (
    <FormWrapper>
      <div className="flex flex-col place-items-center">
        <div className="text-xl font-semibold">
          <p>
            <strong>What</strong> kind of trip do you like?
          </p>
        </div>
        <div className="my-2">
          <Input
            type="text"
            className="rounded-md p-2 w-96"
            {...register('preferences', {
              validate: (value) =>
                value?.length > 0 && /^[a-zA-Z ]*$/.test(value)
            })}
          />
        </div>
        <div className="flex flex-row my-5">
          <div mx-10 className="mx-20">
            <Button type="button" onClick={() => router.push('/home/location')}>
              Back
            </Button>
          </div>
          <div className="mx-20">
            <Button type="button" onClick={validateStep}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
