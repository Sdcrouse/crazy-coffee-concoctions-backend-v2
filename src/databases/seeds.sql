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
    'Pumpkin Spice Latte',
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
    'Mix together the instant coffee, cold water, sweetener, and creamer. Then carefully add the ice cube to avoid a big splash. Wait about a minute for the coffee to get cold. Enjoy!',
    'Perfect for a hot summer day!',
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
VALUES('1 tbsp', 'Saigondan', 'Robusta', 'Adventure', 'Light Espresso', 9);