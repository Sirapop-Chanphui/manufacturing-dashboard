const MOBILE_BREAKPOINT_PX = 768;
const MOBILE_USER_AGENT_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/**
 * Returns true when the app is used on a phone/mobile device (UA or viewport).
 * Used to restrict admin access to desktop only.
 * Temporary mobile detection.
 * Used to hide desktop-only features while mobile UI is under development.
 *
 * Note: Not used for security purposes.
 */
export function isMobile() {
    if (typeof window === "undefined") return false;
    // const smallViewport = window.innerWidth <= MOBILE_BREAKPOINT_PX;
    const mobileUA = MOBILE_USER_AGENT_REGEX.test(navigator.userAgent);
    // return smallViewport || mobileUA;
    return mobileUA;
}
