import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Fishki" className={`inline-flex shrink-0 ${className}`.trim()}>
      <Image
        src="/images/logo.png"
        alt="Fishki"
        width={150}
        height={150}
        className="h-auto w-full"
        priority
      />
    </Link>
  );
}
