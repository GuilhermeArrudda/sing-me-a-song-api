# Sing me a song

This project was created for users to share their favorite youtube songs!

## Build with

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) 
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
- ![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

## **Getting Started**

### **Prerequisites**

- npm

### **Installation**

1. Clone the backend in a folder
```sh
https://github.com/GuilhermeArrudda/sing-me-a-song-api.git
```
2. Install the dependencies executing command
```sh
npm i
```
3. Create a .env file on the backend that matches the database, for example:
```sh
DATABASE_URL=postgres://USER:USER_PASSWORD@localhost:5432/DATABASE_NAME
```
4. Create a .env.tests file on the backend that matches the tests database and tests ambient, for example:
```sh
DATABASE_URL=postgres://USER:USER_PASSWORD@localhost:5432/DATABASE_NAME_TESTS
NODE_ENV=test
```
5. Create database with prisma

```bash
npx prisma init
npx prisma migrate dev
```

### **How to run**

1. Start backend

```sh
npm run dev
```

### **How to run tests**
1. Tests backend

```sh
npm run test
```
