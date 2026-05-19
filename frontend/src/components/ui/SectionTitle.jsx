export default function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`text-xl font-semibold text-slate-100 ${className}`}
    >
      {children}
    </h2>
  );
}