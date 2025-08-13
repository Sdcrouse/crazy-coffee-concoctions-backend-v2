DROP DATABASE IF EXISTS crazy_coffee_concoctions;
CREATE DATABASE crazy_coffee_concoctions;
USE crazy_coffee_concoctions;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS concoctions;

CREATE TABLE users (
	id INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
    ref_token_version INTEGER NOT NULL DEFAULT 0,
    UNIQUE KEY (id)
);

CREATE TABLE concoctions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    instructions TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE coffees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    concoction_id INTEGER NOT NULL,
    amount VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    bean_type VARCHAR(30),
    blend VARCHAR(75) NOT NULL,
    roast VARCHAR(20),
    FOREIGN KEY (concoction_id) REFERENCES concoctions(id)
);

CREATE TABLE ingredients (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    concoction_id INTEGER NOT NULL,
    amount VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    category VARCHAR(10) NOT NULL,
    FOREIGN KEY (concoction_id) REFERENCES concoctions(id)
);