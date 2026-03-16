import { formatDateEn, formatRelativeTime, formatTimeEn } from "@/utils/formatDate";

function NotificationCard({ notification }) {
    const relativeTime = formatRelativeTime(notification.createdAt);
    return (
        <div className="flex flex-row w-full gap-[12px]">
            <img
                src={notification.avatar}
                className="w-[48px] h-[48px] rounded-full object-cover"
                alt="profile image"
            />

            <div className="flex flex-col">
                <div>
                    <span className="text-[16px] font-bold text-neutral-600">
                        {notification.author}
                    </span>{" "}
                    <span className="text-[16px] text-neutral-400">
                        {notification.action}
                    </span>
                </div>

                <span className="text-body-3 text-brand-orange">                   
                    {relativeTime ?? `${formatDateEn(notification.createdAt)} at ${formatTimeEn(notification.createdAt)}`}
                </span>
                
            </div>
        </div>
    );
}


export default NotificationCard