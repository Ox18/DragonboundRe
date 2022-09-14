## Announcement: 
This project is being converted to a microservices architecture. 
If you want to know more about that implementation, I invite you to check this organization where I upload weekly updates. https://github.com/u-roboro

# DragonboundRE (v133)
 
DragonboundRE is a project for educational purposes to learn more about Reverse Engineering in a web environment. The main goal of this project is to create a functional mock client that can be used to understand WebSocket based architectures. This can be used to get much better practice on developing applications with real-time data exchange. 

> **Why Dragonbound?**  
> Because Dragonbound is inspired by an old and fun game that is long gone. Another reason is that the animations used in this game [in the case of buttons, explosions and others] looks like a paper without animation.

> **Discord Group** :speech_balloon: <br>
> https://discord.gg/pApEqzeMEW

## Projects

This repository consists of two projects.

### - [Dragonbound.Server](https://github.com/Ox18/DragonboundRe/tree/remake/Dragonbound.Server)

This is the server emulator, where the data of what the client does is shared.

### - [Dragonbound.Client](https://github.com/Ox18/DragonboundRe/tree/remake/Dragonbound.Client)

This is the project where the client will connect to the game.

### - [Dragonbound.Api](https://github.com/Ox18/DragonboundRe/tree/remake/Dragonbound.API)

Here is hosted the core of the entire application through an API Rest. The purpose is to make each service independent to achieve scalability.

## Important

A reverse proxy is being used (only in the case of the web project) to avoid certain redundancies in the code. To access the web project from your browser, use port 4000 as indicated in nginx.

## Instructions

### Install the necessary dependencies for both projects

Open a terminal in each of the Client and Server project folders.
Make sure you have installed NodeJS before.
After that, in the terminal run the following command:

```npm i```

or if you use yarn

```yarn```

### Execute projects

There is nothing more to do, just run the projects in a terminal each, with the command:

```npm run start```

o

```yarn start```

<br />
<br />
Personally, I prefer to use YARN for the effectiveness and speed it brings when installing dependencies but, the use of package manager is at your discretion.
After going through several projects trying to do the same project, they lack objectivity and make the project a disaster.
This project tries to solve the errors that present those other private servers that have a lot of failures. I am open to any idea or suggestion.
<br >

### FOLDER TO NGINX
/usr/local/etc/nginx/
