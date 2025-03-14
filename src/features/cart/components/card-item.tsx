export function CardItem({ className, children, ...props }) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}
