import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Shopper | Login",
    description: "Welcome to my app",
};

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}