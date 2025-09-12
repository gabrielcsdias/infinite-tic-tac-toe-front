export default function CellO({ color = "#3B82F6", className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 10 A40 40 0 0 1 90 40"
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M90 60 A40 40 0 0 1 60 90"
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 90 A40 40 0 0 1 10 60"
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10 40 A40 40 0 0 1 40 10"
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
