import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-center justify-center gap-6 px-5 py-24 text-center">
      <h1 className="font-[family-name:var(--font-archivo-black)] text-2xl text-black">Page not found</h1>
      <p className="text-slate-600">That path does not exist on this site.</p>
      <Link href="/" className="text-blue-600 underline">
        Back to home
      </Link>
    </div>
  );
}
