DROP DATABASE IF EXISTS crazy_coffee_concoctions;
CREATE DATABASE crazy_coffee_concoctions;
USE crazy_coffee_concoctions;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
	id INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(255) NOT NULL,
    UNIQUE KEY (id)
);