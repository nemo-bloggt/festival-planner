export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-500 text-white",

    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-100",

    success:
      "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
  };

  return (
    <button
      className={`
        rounded-lg px-4 py-2 text-sm font-semibold transition
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}