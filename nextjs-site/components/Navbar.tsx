import Link from "next/link";

const navItems = [
  { href: "/how-halliard-works", label: "How it works" },
  { href: "/principles", label: "Principles" },
  { href: "/guide/media-planning-guide", label: "Resources" }, // using guide as resources entry for now
  { href: "/pricing", label: "Pricing" },
  { href: "/login", label: "Login" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-sm font-medium">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span>Halliard</span>
        </Link>
        <ul className="hidden md:flex gap-6 text-gray-800">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/signup"
              className="rounded bg-primary px-4 py-1.5 text-white hover:bg-secondary"
            >
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
} 