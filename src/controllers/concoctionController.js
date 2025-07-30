const concoctions = [
    { id: 1, userId: 3, name: 'Mocha', created: '2025-07-20 09:14:25' },
    { id: 2, userId: 2, name: 'Basic Instant Coffee', created: '2025-07-21 10:11:12' },
    { id: 3, userId: 5, name: 'Pumpkin Spice Latte', created: '2025-07-21 12:11:10' },
    { id: 4, userId: 1, name: 'Basic Espresso', created: '2025-07-23 13:01:55' },
    { id: 5, userId: 2, name: 'Cocoa Cinnamon Coffee', created: '2025-07-25 08:05:03' },
    { id: 6, userId: 1, name: 'Cappuccino', created: '2025-07-28 14:22:33' },
    { id: 7, userId: 3, name: 'Perfect Dark Roast Coffee', created: '2025-07-28 07:22:56' },
    { id: 8, userId: 1, name: 'Iced Latte', created: '2025-07-29 15:30:15' }
];

// TODO (on the database side): Order these by date created descending (i.e. newest first)
export async function getConcoctions(req, res) {
    let status;

    try {
        const userConcoctions = concoctions.filter(concoction => concoction.userId === req.userId)
            .map(conc => ({
                id: conc.id, name: conc.name, created: conc.created
            }));
        status = 200;

        if (userConcoctions.length === 0) {
            res.status(status).json({ status, message: "You don't have any concoctions! Click 'New Concoction' to create one." });
        } else {
            res.status(status).json({ status, message: "Here are your concoctions!", concoctions: userConcoctions });
        }
    } catch (error) {
        console.error(error);
        status = 500;
        res.status(status).json({ status, message: "There was an error while fetching your concoctions. Please try again later." });
    }
};