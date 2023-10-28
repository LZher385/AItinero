import FormProvider from "../providers/FormProvider"

export default function FormLayout({
    children,
}: { 
        children : React.ReactNode; 
}) {

    return(
        <FormProvider>
            {children}
        </FormProvider>
    )
}