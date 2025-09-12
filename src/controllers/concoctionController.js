import { findCoffeeByConcoctionId, createCoffee } from "../databases/coffees.js";
import { findIngredientsByConcoctionId, createIngredient } from "../databases/ingredients.js";
import { findConcoctionsByUserId, findConcoctionById, createConcoction, deleteConcoction } from "../databases/concoctions.js";
import { handleServerError, handleUserError, handleUserErrors } from "../utils/errorHandlers.js";

async function getConcoctions(req, res) {
    const status = 200;

    try {
        const userConcoctions = await findConcoctionsByUserId(req.userId);

        if (userConcoctions.length === 0) {
            res.status(status).json({ status, noConcoctionsMessage: "You don't have any concoctions! Click 'New Concoction' to create one." });
        } else {
            res.status(status).json({ status, concoctions: userConcoctions });
        }
    } catch (error) {
        handleServerError(error, "There was an error while fetching your concoctions. Please try again later.", res);
    }
}

async function getConcoction(req, res) {
    const { id } = req.params;

    try {
        const userConcoction = await findConcoctionById(id);

        if (!userConcoction) return handleUserError('This concoction does not exist.', 404, res);
        if (userConcoction.userId != req.userId) return handleUserError('You are not allowed to access this concoction!', 403, res);

        const { instructions, notes } = userConcoction;
        
        const coffee = await findCoffeeByConcoctionId(id);
        if (!coffee) throw new Error('Unable to find any coffee for this concoction.'); // Edge case

        const ingredients = await findIngredientsByConcoctionId(id);
        if (ingredients.length === 0) throw new Error('Unable to find any ingredients for this concoction.'); // Edge case

        const status = 200;
        res.status(status).json({ status, concoction: { instructions, notes }, coffee, ingredients });
    } catch (error) {
        handleServerError(error, "There was an error while searching for this concoction. Please try again later.", res);
    }
}

async function createNewConcoction(req, res) {
    const { concoction, coffee, ingredients } = req.body;
    const { name, instructions, notes } = concoction;
    const { amount, brand, blend, roast, beanType } = coffee;
    let errors = [];

    if (isBlank(name) || isBlank(instructions)) errors.push('The concoction is missing a name and/or instructions.');
    if (isBlank(amount) || isBlank(brand) || isBlank(blend)) errors.push('The coffee is missing an amount, brand, and/or blend.');
    
    for (const ingredient of ingredients) {
        if (isBlank(ingredient.category) || isBlank(ingredient.amount) || isBlank(ingredient.name)) {
            errors.push('At least one ingredient is missing a category, amount, and/or name.');
            break;
        }
    }
    
    if (errors.length > 0) return handleUserErrors(errors, 400, res, 'Some required values are missing. Please try again.');

    try {
        const userConcoctions = await findConcoctionsByUserId(req.userId);

        for (const userConcoction of userConcoctions) {
            if (userConcoction.name === name) {
                return handleUserError('You already have a concoction with this name. Please enter a different name.', 409, res);
            }
        }

        let concoctionArgs = [req.userId, name, instructions];
        if (notes) concoctionArgs.push(notes);

        const concoctionIdData = await createConcoction(...concoctionArgs);
        const concoctionId = concoctionIdData[0][0]['LAST_INSERT_ID()'];

        let optionalCoffeeArgs = {};
        if (roast) optionalCoffeeArgs.roast = roast;
        if (beanType) optionalCoffeeArgs.beanType = beanType;
        await createCoffee(concoctionId, amount, brand, blend, optionalCoffeeArgs);

        for (const ingredient of ingredients) await createIngredient(concoctionId, ingredient.category, ingredient.amount, ingredient.name);

        const status = 201;
        res.status(status).json({ status, successMessage: 'Concoction successfully created!', concoction, coffee, ingredients });
    } catch (error) {
        handleServerError(error, "There was an error while creating this concoction. Please try again later.", res);
    }
}

async function deleteUserConcoction(req, res) {
    const concoctionId = req.params.id;

    try {
        const userConcoction = await findConcoctionById(concoctionId);

        if (!userConcoction) return handleUserError('This concoction does not exist.', 404, res);
        if (userConcoction.userId != req.userId) return handleUserError('You are not allowed to delete this concoction!', 403, res);

        await deleteConcoction(concoctionId);

        const status = 204;
        res.status(status).json({ status });
    } catch (error) {
        handleServerError(error, "There was an error while deleting this concoction. Please try again later.", res);
    }
}

function isBlank(value) {
    return value === undefined || value === null || value.trim().length === 0;
}

export { getConcoctions, getConcoction, createNewConcoction, deleteUserConcoction };