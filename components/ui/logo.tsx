import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" aria-label="Fishki" className="inline-flex">
      <Image
        src="/images/logo.png"
        alt="Fishki"
        width={150}
        height={150}
        priority
      />
    </Link>
  );
}