
export default function PageSection({
  title,
  lead,
  children,
  className = "",
}) {
  return (
    <section
      className={`mx-auto max-w-6xl px-6 pt-10 ${className}`}
    >
      <h1 className="text-4xl font-black tracking-tight md:text-6xl">
        {title}
      </h1>

      {lead && (
        <p className="mt-4 max-w-2xl text-lg text-ink/70">
          {lead}
        </p>
      )}

      <div className="mt-10">{children}</div>
    </section>
  );
}
