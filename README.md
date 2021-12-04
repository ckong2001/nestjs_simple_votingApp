# nestjs_simple_votingApp

This an web application for user to create voting campaign and vote by HKID, wirtten in Angular , Nestjs with typeorm.

## Installation

1. Clone the repository 
```git
git clone https://github.com/ckong2001/nestjs_simple_votingApp.git
```

2. Switch to the repo folder 
```
cd nestjs_simple_votingAp
```

3. Install Docker Desktop or Docker cli
before typing the below command
```docker
docker-compose up
```

4. Open another cmd under directory 'nestjs_simple_votingAp' 
```
cd server
```
5. Use package manager npm to install dependencies for Nest.js application

``` js
npm install
```
6. Start the server 
```js
npm run start:dev
```
7. Open another cmd under directory 'nestjs_simple_votingAp'
```
cd client
```
8. Use package manager npm to install dependencies for Nest.js application  
``` js
npm install
``` 
9. Start the angular application
```js
npm run start
```

10. Go to localhost:4200

## Remark

1. How to create new voting 
Currently, you can go to [localhost:3000/](http://localhost:3000/api/) and use
the /voting/createVoting to create new voting




## Scalable architecture
![image info](/assets/architecture.png)

