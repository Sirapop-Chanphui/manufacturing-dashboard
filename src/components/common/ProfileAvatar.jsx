import { UserRound } from "lucide-react";

const PRESETS = {
  40: {
    box: "h-[40px] w-[40px] min-h-[40px] min-w-[40px]",
    icon: "h-[20px] w-[20px]",
  },
  44: {
    box: "h-[44px] w-[44px] min-h-[44px] min-w-[44px]",
    icon: "h-[22px] w-[22px]",
  },
  48: {
    box: "h-[48px] w-[48px] min-h-[48px] min-w-[48px]",
    icon: "h-[24px] w-[24px]",
  },
  120: {
    box: "h-[120px] w-[120px] min-h-[120px] min-w-[120px]",
    icon: "h-[56px] w-[56px]",
  },
};

/**
 * Shows profile image when `imageUrl` is set; otherwise a neutral circle with UserRound (no stock photo).
 * @param {{ imageUrl?: string | null, alt: string, size?: 40 | 44 | 48 | 120, className?: string }} props
 */
function ProfileAvatar({ imageUrl, alt, size = 48, className = "" }) {
  const preset = PRESETS[size] ?? PRESETS[48];
  const hasPic = Boolean(imageUrl && String(imageUrl).trim() !== "");

  if (hasPic) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        className={`rounded-full object-cover ${preset.box} ${className}`.trim()}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-400 ${preset.box} ${className}`.trim()}
      role="img"
      aria-label={alt}
    >
      <UserRound className={preset.icon} strokeWidth={1.5} aria-hidden />
    </div>
  );
}

export default ProfileAvatar;
