export default function FormWrapper({
    children 
}:{
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col place-items-center place-self-center h-screen justify-center">
            <div className="text-6xl font-extrabold my-20">
                <p>AItinero</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};