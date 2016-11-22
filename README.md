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
2. Run `npm install`
3. Start `mongod` with path option (`--dbpath=/your/repository/location/DB`)
4. Open `confs.js` and change variables with your own value	
5. run `npm start`

## Vulnerable Parts
- Passwords are not encrypted => Extermely vulnerable! 
	It is not suggested to use password feature.

## What to do
- Add password encryption feature