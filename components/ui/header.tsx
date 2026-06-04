import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl 
      bg-white/95 px-3 shadow-md backdrop-blur-md border border-gray-200">

      <div className="flex flex-1 items-center">
        <Logo />
      </div>

      <ul className="flex flex-1 items-center gap-3">
        {/* <li>
          <Link
            href="/signin"
            className="btn-sm bg-white text-gray-900 shadow-sm hover:bg-gray-100"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className="btn-sm bg-gray-900 text-white shadow-sm hover:bg-gray-800"
          >
            Register
          </Link>
        </li> */}
      </ul>
    </div>
  </div>
</header>
  );
}
