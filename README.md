# Node.js File Uploader with Telegram

This project is a file uploader built with Express web framwork and MongoDB with Mongoose, with following the rules of RESTful API.
This project is integrated with Telegram bot built for Node.js framework.

## Feature
- Automatically send message to selected chatrooms when the file is uploaded in the storage

## Requirements
- Node.js
- MongoDB

## How-To
1. Clone Repository
2. Run `npm init && npm install`
3. Start mongod with path option (`--dbpath=/your/repository/location/DB`)
4. Open app.js and 
	1. replace `db_name` variable with your db name
	2. replace `folder_location` variable with your upload folder's location
5. Open telebot.js and 
	1. Replace `chatIds` variable(add chat ids you want to send message)
	2. Replace `token` variable with your bot's token
	3. Replace `link` variable with your server's absolute link
6. run `npm start`

## Vulnerable Parts
- Passwords are not encrypted => Extermely vulnerable! 
	It is not suggested to use password feature.

## What to do
- Add password encryption feature