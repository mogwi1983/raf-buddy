export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} CareAlign CDI. Empowering accurate clinical
          documentation.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="transition hover:text-sky-700"
            aria-label="Read our privacy policy"
          >
            Privacy
          </a>
          <a
            href="#"
            className="transition hover:text-sky-700"
            aria-label="Read our terms of use"
          >
            Terms
          </a>
          <a
            href="mailto:support@carealign.ai"
            className="transition hover:text-sky-700"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

