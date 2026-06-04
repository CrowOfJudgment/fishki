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
  const width = horizontal ? 1228 : 150;
  const height = horizontal ? 453 : 150;

  return (
    <Link href="/" aria-label="Fishki" className={`inline-flex shrink-0 ${className}`.trim()}>
      <Image
        src={src}
        alt="Fishki"
        width={width}
        height={height}
        className="h-auto w-full"
        priority
      />
    </Link>
  );
}
