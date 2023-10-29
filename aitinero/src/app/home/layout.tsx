import { ModeToggle } from '@/components/ui/darkMode';
import FormProvider from '../providers/FormProvider';

export default function FormLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-row-reverse">
        <div className="mx-3">
          <ModeToggle />
        </div>
      </div>
      <FormProvider>{children}</FormProvider>
    </div>
  );
}
