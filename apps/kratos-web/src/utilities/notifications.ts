type NotificationConfig = {
    body?: string;
    title: string;
};

export async function sendNotification(config: NotificationConfig): Promise<void> {
    if (!('Notification' in window)) {
        console.error('Browser does not support notifications.');
        return;
    }

    if (Notification.permission === 'denied') {
        console.error('Notification are not permitted.');
        return;
    }

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        setTimeout(
            () => {
                new Notification(config.title, {
                    body: config.body,
                });
            },
            500,
        );
    }
}
