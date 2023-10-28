import ConvexClientProvider from "../providers/ConvexClientProvider";
import FormProvider from "../providers/FormProvider"

export default function FormLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <FormProvider>
            <ConvexClientProvider>
                {children}
            </ConvexClientProvider>
        </FormProvider>
    )
}