"use client";
import { ReactNode, createContext } from "react";
import ConvexClientProvider from "./ConvexClientProvider";

export default function RootWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return <ConvexClientProvider>
        {children}
    </ConvexClientProvider>
}