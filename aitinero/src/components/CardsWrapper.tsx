export default function CardsWrapper({
    children
}: {children: React.ReactNode;}) {
    return  (
        <div className="flex flex-col place-items-center place-self-center justify-center space-y-16">
            {children}
        </div>
    );
}