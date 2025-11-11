import Link from "next/link";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Support", href: "mailto:support@rafbuddy.com" },
];

export function AppFooter() {
  return (
    <footer className="border-t border-[--color-border] bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-500 md:flex-row md:px-8 lg:px-12">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} RAF Buddy. Built for value-based care
          teams.
        </p>
        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-[--color-primary-700]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

