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
    `name` VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);