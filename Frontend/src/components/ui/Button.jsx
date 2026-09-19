export function Button({
  as = "button",
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}) {
  const Tag = as;
  const cls = `btn ${variant} ${className}`.trim();
  if (Tag === "a") {
    return (
      <a className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  );
}

export function Arrow() {
  return (
    <span className="arrow" aria-hidden>
      ↗
    </span>
  );
}
