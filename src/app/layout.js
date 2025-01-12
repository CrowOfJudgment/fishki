import './globals.css';
import {twMerge} from "tailwind-merge";
import { DM_Sans } from "next/font/google";
import { CSPostHogProvider } from './providers'

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
    title: 'TableScan',
    description: 'Generate a QR for your business.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <CSPostHogProvider>
                <body className={twMerge(dmSans.className, "antialiased bg-[#EAEEFE]")}>
                {children}
                </body>
            </CSPostHogProvider>
        </html>
    );
}
