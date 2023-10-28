export default function FormWrapper({
    children 
}:{
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col place-items-center place-self-center h-screen justify-center bg-yellow-50">
            <div className="text-slate-700 text-6xl font-extrabold my-20">
                <p>AItinero</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};