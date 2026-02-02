function AdminNotification() {
    const notifications = [
        {
            id: 1,
            user: "Jacob Lash",
            type: "comment",
            articleTitle:
                "The Fascinating World of Cats: Why We Love Our Furry Friends",
            message:
                "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
            time: "4 hours ago",
            avatar: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 2,
            user: "Jacob Lash",
            type: "like",
            articleTitle:
                "The Fascinating World of Cats: Why We Love Our Furry Friends",
            time: "4 hours ago",
            avatar: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (
        <div className="flex bg-neutral-100 min-h-screen">

            <main className="flex-1 flex-col">
                {/* Header */}
                <div className="flex flex-row h-[96px] justify-between items-center px-[60px] py-[24px] border-b border-neutral-300 ">
                    <h2 className="text-headline-3 font-semibold">Notification</h2>
                </div>

                {/* Content */}
                <div className="flex flex-col pt-[40px] px-[60px] pb-[120px]">
                    {notifications.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-start justify-between py-6 border-b border-neutral-300"
                        >
                            <div className="flex gap-4">
                                <img
                                    src={item.avatar}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />

                                <div className="text-sm text-gray-700">
                                    <p>
                                        <span className="font-medium">{item.user}</span>{" "}
                                        {item.type === "comment" ? "commented on" : "liked"} your
                                        article:{" "}
                                        <span className="font-medium">
                                            {item.articleTitle}
                                        </span>
                                    </p>

                                    {item.type === "comment" && (
                                        <p className="text-gray-500 mt-1">
                                            “{item.message}”
                                        </p>
                                    )}

                                    <p className="text-xs text-orange-400 mt-2">
                                        {item.time}
                                    </p>
                                </div>
                            </div>

                            <button className="text-sm text-gray-700 hover:underline">
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </main>


        </div>
    );
}

export default AdminNotification;
