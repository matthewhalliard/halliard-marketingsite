export function Footer() {
  return (
    <footer className="bg-slate-900 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img
          src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
          alt="Halliard"
          className="h-5 w-auto opacity-50"
        />
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Halliard Media. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
