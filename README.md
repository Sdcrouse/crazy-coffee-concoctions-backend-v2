# crazy-coffee-concoctions-backend-v2
An updated version of the Crazy Coffee Concoctions app. This is a Node.js backend that connects to a JavaScript frontend.

## Usage

### Prerequisites

This app is available publicly, but you can also play around with it on your own computer. To do this, you'll first need to create an environment file, install a few things, and create a database. To do so, follow the steps below:

1. Create a .env file in the root of this directory. Check out the [sample-env.txt](./sample-env.txt) file for the values that you need to add.

2. Download Node.js and MySQL onto your computer. **Note:** I built this project with Node.js v22.16.0; I recommend installing this version to avoid any dependency-related issues. You can [download Node.js here](https://nodejs.org/en/download) and [get started with MySQL here](https://dev.mysql.com/doc/mysql-getting-started/en/).

3. Once you have installed MySQL, set up a connection with a root user and password.

4. Install the dependencies from package.json by running the `npm install` command.

5. Start up MySQL (if you closed it) and connect to it with the root user and password that you defined earlier. Windows users can start up MySQL by opening a command prompt (be sure to run it as an administrator!) and running the command `net start MySQL80`.

6. Create the database by copying and pasting the SQL commands from the [schema.sql](./src/databases/schema.sql) file. You can verify that the database and tables were created by running the `SHOW DATABASES;` and `SHOW TABLES;` commands, respectively.

7. Use the `exit` command to exit out of the database. Don't shut down the MySQL server entirely!

### Starting the app

First, start up your MySQL database, if you haven't already; you don't need to connect to it with your username and password. Next, navigate into the root directory of this project and run the command `npm run dev`. You can now start up the frontend!

### Seeding the database (optional)

After you have created a few users on the frontend, you can also seed the database with some sample concoctions, coffees, and ingredients. To do so, start up and connect to your MySQL database. Then, copy and paste the SQL commands from the [seeds.sql](./src/databases/seeds.sql) file.

### Stopping the app

To stop the server, use the `Ctrl-C` or `Command-C` command, depending on your operating system. Don't forget to shut down your MySQL server as well; Windows users can do this with the `net stop MySQL80` command.

## LICENSE

Licensed under the [MIT License](LICENSE).