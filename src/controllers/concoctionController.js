const concoctions = [
    { id: 8, userId: 1, name: 'Iced Latte', created: '2025-07-29 15:30:15', instructions: 'Mix together the instant coffee, cold water, sweetener, and creamer. Then carefully add the ice cube to avoid a big splash. Wait about a minute for the coffee to get cold. Enjoy!', notes: 'Perfect for a hot summer day!' },
    { id: 6, userId: 1, name: 'Cappuccino', created: '2025-07-28 14:22:33', instructions: 'First, make the espresso by mixing the hot water and coffee. Then, add in the steamed milk. Spoon foamed milk on top and create a fun shape with it. Serve.', notes: 'Optionally, add a dusting of cinnamon or cocoa powder on top.' },
    { id: 7, userId: 3, name: 'Perfect Dark Roast Coffee', created: '2025-07-28 07:22:56', instructions: 'Steep coffee in boiling water for 15 minutes. Dump out the coffee grounds. Add sugar and creamer and mix well. Enjoy!', notes: 'I prefer using a French press to limit the coffee grounds at the bottom of the cup.' },
    { id: 5, userId: 2, name: 'Cocoa Cinnamon Coffee', created: '2025-07-25 08:05:03', instructions: 'Add coffee powder, cocoa powder, sugar, and cinnamon to hot milk. Stir it all together and serve.', notes: 'This is REALLY good around Christmastime!' },
    { id: 4, userId: 1, name: 'Basic Espresso', created: '2025-07-23 13:01:55', instructions: 'Steep coffee in boiling water for 5-10 minutes, or to desired strength. Enjoy!' },
    { id: 3, userId: 5, name: 'Pumpkin Spice Latte', created: '2025-07-21 12:11:10', instructions: 'Mix together the hot water, sugar, and pumpkin spice. Then add the creamer and stir. Serve hot.', notes: 'It is easier to mix in the pumpkin spice BEFORE the creamer instead of AFTER.' },
    { id: 2, userId: 2, name: 'Basic Instant Coffee', created: '2025-07-21 10:11:12', instructions: 'Add instant coffee, sweetener, and creamer to hot water. Mix well and serve.', notes: 'You can add in an optional pinch of cinnamon. Very good around the holidays! Just be aware that the cinnamon may clump and sink to the bottom.' },
    { id: 1, userId: 3, name: 'Mocha', created: '2025-07-20 09:14:25', instructions: 'Mix well. Serve warm. Enjoy!', notes: 'You can substitute water for milk, if you want it to be less sweet.' }
];

// TODO (on the database side): Order these by date created descending (i.e. newest first)
async function getConcoctions(req, res) {
    let status;

    try {
        const userConcoctions = concoctions.filter(concoction => concoction.userId === req.userId)
            .map(conc => ({
                id: conc.id, name: conc.name, created: conc.created
            }));
        status = 200;

        if (userConcoctions.length === 0) {
            res.status(status).json({ status, noConcoctionsMessage: "You don't have any concoctions! Click 'New Concoction' to create one." });
        } else {
            res.status(status).json({ status, concoctions: userConcoctions });
        }
    } catch (error) {
        console.error(error);
        status = 500;
        res.status(status).json({ status, message: "There was an error while fetching your concoctions. Please try again later." });
    }
}

async function getConcoction(req, res) {
    const { userId } = req;
    const id = parseInt(req.params.id); // TODO: I may need to remove parseInt when searching from a database
    let status;

    try {
        const userConcoction = concoctions.find((concoction) => concoction.id === id);

        if (!userConcoction) {
            status = 404;
            res.status(status).json({ status, errorMessage: 'This concoction does not exist.' });
            return;
        }

        if (userConcoction.userId != userId) {
            status = 403;
            res.status(status).json({ status, errorMessage: 'You are not allowed to access this concoction!' });
            return;
        }

        status = 200;
        // TODO: Make sure this doesn't return the user id!
        res.status(status).json({ status, concoction: userConcoction });
    } catch (error) {
        console.error(error);
        status = 500;
        res.status(status).json({ status, errorMessage: "There was an error while searching for this concoction. Please try again later." });
    }
}

export { getConcoctions, getConcoction };