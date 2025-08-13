import findCoffeeByConcoctionId from "../databases/coffees.js";
import findIngredientsByConcoctionId from "../databases/ingredients.js";
import { findConcoctionsByUserId, findConcoctionById } from "../databases/concoctions.js";

async function getConcoctions(req, res) {
    let status;

    try {
        const userConcoctions = await findConcoctionsByUserId(req.userId);
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
    let status;

    try {
        const { id } = req.params;
        const userConcoction = await findConcoctionById(id);

        if (!userConcoction) {
            status = 404;
            res.status(status).json({ status, errorMessage: 'This concoction does not exist.' });
            return;
        }

        if (userConcoction.userId != req.userId) {
            status = 403;
            res.status(status).json({ status, errorMessage: 'You are not allowed to access this concoction!' });
            return;
        }

        const { instructions, notes } = userConcoction;
        
        const coffee = await findCoffeeByConcoctionId(id);
        if (!coffee) throw new Error('Unable to find any coffee for this concoction.'); // Edge case

        const ingredients = await findIngredientsByConcoctionId(id);
        if (ingredients.length === 0) throw new Error('Unable to find any ingredients for this concoction.'); // Edge case

        status = 200;
        res.status(status).json({ status, concoction: { instructions, notes }, coffee, ingredients });
    } catch (error) {
        console.error(error);
        status = 500;
        res.status(status).json({ status, errorMessage: "There was an error while searching for this concoction. Please try again later." });
    }
}

export { getConcoctions, getConcoction };