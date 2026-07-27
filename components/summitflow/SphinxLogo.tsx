import Image from 'next/image';
import { LOGO_PATH, APP_NAME, COMPANY_NAME } from '@/lib/summitflow/constants';

type SummitFlowLogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
};

export function SummitFlowLogo({ size = 72, showText = true, className = '' }: SummitFlowLogoProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className="relative rounded-full overflow-hidden ring-2 ring-[#22c55e]/30 shadow-lg shadow-[#22c55e]/10 bg-[#0a1628]"
        style={{ width: size, height: size }}
      >
        <Image
          src={LOGO_PATH}
          alt={`${COMPANY_NAME} logo`}
          width={size}
          height={size}
          className="object-cover w-full h-full"
          priority
        />
      </div>
      {showText && (
        <div className="text-center">
          <div className="text-xl font-bold text-[var(--ops-text,#f1f5f9)]">{APP_NAME}</div>
          <div className="text-xs text-[#22c55e] font-medium tracking-wide mt-0.5">{COMPANY_NAME}</div>
        </div>
      )}
    </div>
  );
}
