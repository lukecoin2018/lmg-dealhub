import { Tooltip } from "./Tooltip";

interface InfoIconProps {
  content: string;
}

export function InfoIcon({ content }: InfoIconProps) {
  return (
    <Tooltip content={content}>
      <span className="inline-flex items-center justify-center ml-1 text-brand-blue hover:text-brand-yellow transition-colors cursor-help">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 11.5V7.5M8 4.5H8.005"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Tooltip>
  );
}