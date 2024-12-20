import './globals.css';
import {twMerge} from "tailwind-merge";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
    title: 'TableScan',
    description: 'Generate a QR for your business.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={twMerge(dmSans.className, "antialiased bg-[#EAEEFE]")}>
                {children}
            </body>
        </html>
    );
}
