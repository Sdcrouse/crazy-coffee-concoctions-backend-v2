DROP DATABASE IF EXISTS crazy_coffee_concoctions;
CREATE DATABASE crazy_coffee_concoctions;
USE crazy_coffee_concoctions;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);