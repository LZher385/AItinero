import { useForm, DefaultValues } from 'react-hook-form';
import { FormValues } from '@/app/types/form';

export default function useAppForm(defaultValues?: DefaultValues<FormValues>) {
    return useForm<FormValues>({ defaultValues });
}