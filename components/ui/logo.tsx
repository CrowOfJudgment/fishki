import Link from "next/link";
import Image from "next/image";

export default function Logo({
  className = "",
  horizontal = false,
}: {
  className?: string;
  horizontal?: boolean;
}) {
  const src = horizontal ? "/images/logo_horizontal.png" : "/images/logo.png";
  const aspectClass = horizontal ? "aspect-[1228/453]" : "aspect-square";

  return (
    <Link href="/" aria-label="Fishki" className={`inline-flex shrink-0 ${className}`.trim()}>
      <span className={`relative block w-full ${aspectClass}`}>
        <Image
          src={src}
          alt="Fishki"
          fill
          sizes={horizontal ? "(min-width: 1024px) 160px, 118px" : "150px"}
          className="object-contain"
          priority
        />
      </span>
    </Link>
  );
}
