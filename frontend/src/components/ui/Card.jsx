
export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-ink/10 bg-white p-6 ${className}`}
    >
      {children}
    </div>
  );
}
