export default function CardsWrapper({
    children
}: {children: React.ReactNode;}) {
    return  (
        <div className="flex flex-col place-items-center place-self-center h-screen justify-center">
            <div>
                {children}
            </div>
        </div>
    );
}