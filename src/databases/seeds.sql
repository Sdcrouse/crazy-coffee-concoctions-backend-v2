-- Note: For security purposes, there are no seeds for the users table.

-- Concoctions:

INSERT INTO concoctions (`name`, instructions, notes, user_id)
VALUES (
    'Mocha',
    'Mix well. Serve warm. Enjoy!',
    'You can substitute water for milk, if you want it to be less sweet.',
    3
);
INSERT INTO concoctions (`name`, instructions, notes, user_id)
VALUES (
    'Basic Instant Coffee',
    'Add instant coffee, sweetener, and creamer to hot water. Mix well and serve.',
    'You can add in an optional pinch of cinnamon. Very good around the holidays! Just be aware that the cinnamon may clump and sink to the bottom.',
    2
);
INSERT INTO concoctions (`name`, instructions, notes, user_id)
VALUES (
    'Pumpkin Spice Coffee',
    'Mix together the hot water, sugar, and pumpkin spice. Then add the creamer and stir. Serve hot.',
    'It is easier to mix in the pumpkin spice BEFORE the creamer instead of AFTER.',
    5
);
INSERT INTO concoctions (`name`, instructions, user_id)
VALUES (
    'Basic Espresso',
    'Steep coffee in boiling water for 5-10 minutes, or to desired strength. Enjoy!',
    1
);
INSERT INTO concoctions (`name`, instructions, notes, user_id)
VALUES (
    'Cocoa Cinnamon Coffee',
    'Add coffee powder, cocoa powder, sugar, and cinnamon to hot milk. Stir it all together and serve.',
    'This is REALLY good around Christmastime!',
    2
);
INSERT INTO concoctions (`name`, instructions, notes, user_id)
VALUES (
    'Cappuccino',
    'First, make the espresso by mixing the hot water and coffee. Then, add in the steamed milk. Spoon foamed milk on top and create a fun shape with it. Serve.',
    'Optionally, add a dusting of cinnamon or cocoa powder on top.',
    1
);
INSERT INTO concoctions (`name`, instructions, notes, user_id)
VALUES (
    'Perfect Dark Roast Coffee',
    'Steep coffee in boiling water for 15 minutes. Dump out the coffee grounds. Add sugar and creamer and mix well. Enjoy!',
    'I prefer using a French press to limit the coffee grounds at the bottom of the cup.',
    3
);
INSERT INTO concoctions (`name`, instructions, notes, user_id)
VALUES (
    'Iced Latte',
    'Mix together the instant coffee, cold water, sweeteners, and creamers. Then carefully add the ice cube to avoid a big splash. Add cold milk and stir carefully. Wait about a minute for the coffee to get cold. Enjoy!',
    'Perfect for a hot summer day!',
    1
);

INSERT INTO concoctions (`name`, instructions, user_id)
VALUES (
    'Instant Black Coffee',
    'Mix black coffee and hot water. Serve immediately.',
    1
);


-- Coffees:

INSERT INTO coffees (amount, brand, blend, roast, concoction_id)
VALUES ('2 tsp', 'Starbucks', 'Veranda Blend', 'Blonde', 1);

INSERT INTO coffees (amount, brand, blend, concoction_id)
VALUES ('1 1/2 tsp', 'Folgers', 'Instant Coffee', 2);

INSERT INTO coffees (amount, brand, blend, roast, concoction_id)
VALUES ('1 tbsp', 'Starbucks', 'Fall Blend', 'Medium', 3);

INSERT INTO coffees (amount, brand, blend, roast, concoction_id)
VALUES ('1.5 tsp', 'Cafe Bustelo', 'Espresso Ground Coffee', 'Dark', 4);

INSERT INTO coffees (amount, brand, bean_type, blend, roast, concoction_id)
VALUES ('1 1/4 tbsp', 'Big Island Coffee Roasters', '100% Kona Coffee', 'Kona Red Bourbon', 'Medium-Light', 5);

INSERT INTO coffees (amount, brand, blend, concoction_id)
VALUES('1 teaspoon', 'Yuban', 'Premium Instant Blend', 6);

INSERT INTO coffees (amount, brand, blend, roast, concoction_id)
VALUES('1 1/2 tsp', 'Nescafe', 'Clasico Instant Coffee', 'Dark', 7);

INSERT INTO coffees (amount, brand, bean_type, blend, concoction_id)
VALUES('2 tsp', 'Yuban', 'Arabica', 'Instant', 8);

INSERT INTO coffees (amount, brand, bean_type, blend, roast, concoction_id)
VALUES('1 tbsp', 'Saigondan', 'Robusta', 'Adventure', 'Light', 9);


-- Ingredients

INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 1/2 cups', 'hot milk', 'Liquid', 1);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 tsp', 'Ghirardelli Cocoa Powder', 'Additional Ingredient', 1);

INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('2 cups', 'hot water', 'Liquid', 2);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 packet', "Sweet'N Low", 'Sweetener', 2);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('2 tsp', 'International Delight French Vanilla', 'Creamer', 2);

INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('2 cups', 'hot water', 'Liquid', 3);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 cube', 'sugar', 'Sweetener', 3);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 tsp', 'Coffee mate Original', 'Creamer', 3);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('A pinch', 'pumpkin spice', 'Additional Ingredient', 3);

INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1.75 cups', 'boiling water', 'Liquid', 4);

INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 cup', 'hot milk', 'Liquid', 5);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 1/4 tsp', 'cocoa powder', 'Additional Ingredient', 5);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('3/4 tsp', 'sugar', 'Sweetener', 5);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('A pinch', 'cinnamon', 'Additional Ingredient', 5);

INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1/3 cup', 'hot water', 'Liquid', 6);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1/3 cup', 'steamed milk', 'Liquid', 6);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1/3 cup', 'foamed milk', 'Additional Ingredient', 6);

INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('2 cups', 'boiling water', 'Liquid', 7);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 packet', 'sugar', 'Sweetener', 7);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 1/2 tsp', 'dark chocolate', 'Creamer', 7);

INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 1/2 cups', 'cold water', 'Liquid', 8);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('A packet', 'Splenda', 'Sweetener', 8);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1/8 tsp', 'sugar', 'Sweetener', 8);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1 1/3 tsp', 'hazelnut-flavored', 'Creamer', 8);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('3/4 tsp', 'French vanilla-flavored', 'Creamer', 8);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1', 'ice cube', 'Additional Ingredient', 8);
INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('1/2 cup', 'milk', 'Liquid', 8);

INSERT INTO ingredients (amount, `name`, category, concoction_id)
VALUES ('2 1/4 cups', 'hot water', 'Liquid', 9);