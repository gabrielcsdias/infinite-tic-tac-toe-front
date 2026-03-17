export default function CellX({ color = "#EF4444", className = "" }) {
  return (
    <svg
      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 ${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="10"
        y1="10"
        x2="90"
        y2="90"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <line
        x1="90"
        y1="10"
        x2="10"
        y2="90"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}
