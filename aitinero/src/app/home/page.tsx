
export default function HomePage() {
    return (
        <div className="flex flex-col place-items-center place-self-center h-screen justify-center bg-yellow-50">
            <div className="text-slate-700 text-6xl font-extrabold my-20">
                <p>AItinero</p>
            </div>
            <div className="text-slate-700 text-xl font-semibold">
                <p><strong>Where</strong> do you want to go?</p>
            </div>
            <div>
                <input type="text" className="border-2 border-gray-300 rounded-md p-2 w-96 bg-slate-800" />
            </div>
        </div>
    );
};