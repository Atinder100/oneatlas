import Link from "next/link";

const navigationItems = [
  { label: "Search", href: "/search" },
  { label: "Models", href: "/models" },
  { label: "Compare", href: "/compare" },
  { label: "Rankings", href: "/rankings" },
  { label: "AI Labs", href: "/labs" },
  { label: "Providers", href: "/providers" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-16 w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
          aria-label="OneAtlas home"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white"
          >
            OA
          </span>
          <span className="text-lg font-semibold tracking-tight">OneAtlas</span>
        </Link>

        <div className="order-2 flex w-full items-center gap-1 overflow-x-auto border-t border-slate-100 pt-2 sm:order-none sm:w-auto sm:border-0 sm:pt-0">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
