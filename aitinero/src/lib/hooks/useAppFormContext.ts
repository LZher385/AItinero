import { useFormContext } from 'react-hook-form';
import { FormValues } from '@/app/types/form';

export default function useAppFormContext() {
  return useFormContext<FormValues>();
}
