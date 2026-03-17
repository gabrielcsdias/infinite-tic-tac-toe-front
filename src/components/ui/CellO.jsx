export default function CellO({ color = "#3B82F6", className = "" }) {
  return (
    <svg
      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 ${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 10 A40 40 0 0 1 90 40"
        stroke={color}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M90 60 A40 40 0 0 1 60 90"
        stroke={color}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 90 A40 40 0 0 1 10 60"
        stroke={color}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10 40 A40 40 0 0 1 40 10"
        stroke={color}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
