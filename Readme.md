## Nodepop by Juan Arillo

  API service for IOs and Android of second hands article´s selling.  
  Final [node](http://nodejs.org) module practise, using also [express](https://github.com/expressjs/express) framework and [mongoDB](https://www.mongodb.com/) database.

## Previous Requirement

For using Nodepop you first need to install the next resources:

- [node](http://nodejs.org): You can download an installation file for Window or Mac, or through a package manager like [brew](http://brew.sh/) using console.
- [mongoDB](https://www.mongodb.com/): Nodepop use mongoDB as database. You can download the project from [mongo´s webpage](https://www.mongodb.com/).


## Installation

### Downloading

You can download Nodepop´s project from [the GitHub repository](https://github.com/ExercisesBootcamp/nodepop).

You can also clone the project from GitHub using [git](https://git-scm.com/) commands into the console. You first need to install [git](https://git-scm.com/) in this case:  

```bash
$ git clone https://github.com/ExercisesBootcamp/nodepop.git
```

### Installing

Once downloaded or cloned the project, you need to access to the directory using the console:

```bash
$ cd <project_directory> 
```

Then you can install Nodepop:

```bash
$ npm install
```

All the modules needed for running the server will be install at that moment. Nodepop will be ready for run.

## Running MongoDB

To use the service, first thing you have to do is start the database service. If it´s the first time you use [mongoDB](https://www.mongodb.com/), please follow the next instructions:

- Unzip the file you downloaded previously.
- Copy the unzipped folder with mongoDB where you want.
- Using a console, go to the directory where you copy mongo folder:

```bash
$ cd <mongoDB_directory>
```

- Now write the next instruction:

```bash
$ bin\mongodb --dbpath ./data/db --directoryperdb
```

In this moment mongoDB is running, listening by default at `port=27017`

## Running Nodepop

### Option One - Install example data

Perhaps you want to test the project using some previous data. Perfect!!!, you can do it. Before starting Nodepop, please execute the next instruction into the nodepop´s directory:

```bash
$ npm run installDB
```

You have now two users and some commercials in the database ready to use.
The users information are:

name | email | key
-----|-------|-----
Node | node@node.com | 1234 
Mongo | mongo@mongo.com | 5678

You can use them later for [authentication](#authentication) testing, the same as commercials, that you will get using the API.

Now you can start Nodepop service:

```bash
$ npm start
```

### Option two - Run empty

You only want to start the service and introduce the data later using the API instruction. Ok, please, start the service:

```bash
$ npm start
```

## Debugging Nodepop
Perhaps you are thinking about use Nodepop and add some features or change existing one. Please, feel free to do it.
  
In that case is possible you want to use a debugging mode to analize more in depth how the service is working. For this situation you can run Nodepop this way:

```bash
$ npm run debug
```

## API - Users

### Registering users

For register an user, you must pass all the fields in a `POST` request using the next route:

`http://server_ip:3000/api/v1/users`

The users model is:

```js
	{
    name: {type: String, required: true},
    email: {type: String, required: true},
    key: {type: String, required: true}
	}
```

You will receive a succes response if the data is validate

```js
{
  "success": true,
  "saved": {
    "__v": 0,
    "email": "mongoose@mongo.com",
    "key": "38083c7ee9121e17401883566a148aa5c2e2d55dc53bc4a94a026517dbff3c6b",
    "name": "mongoose",
    "_id": "572cd04957723871329eddf7"
	}
}
```

In case of failed validation, you will receive a response like this:

```js
{
  "success": false,
  "error": "Some require field is not sended. Please review"
}
```

### Users Authentication
<a name=authentication> </a>
For authenticate existing users, you must send a `POST` request using the route:

`http://server_ip:3000/api/v1/users/authenticate`

You only have to pass the `email` and `key` fields.

If the operation is done, you will receive a success response with a token:

```js
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MmNkMDQ5NTc3MjM4NzEzMjllZGRmNyIsImlhdCI6MTQ2MjU1NTk1MiwiZXhwIjoxNDYyNzI4NzUyfQ.EclGk2iIvTNUMUsgU1pyWmwk9q0rmAV81Lc--PrcpQ4"
}
```

If some problem happens, you will receive a json response:

```js
{
  "success": false,
  "error": "Authentication failed. Invalid password"
}
```

## API - Commercials

### Adding Commercials

For adding Commercials, use a `POST` request to the route:

`http://server_ip:3000/api/v1/commercials`

The commercial data model is:

```js
{
    name: {type: String, required: true},
    sell: {type: Boolean, required: true},
    price: {type: Number, required: true},
    photo: String,
    tags: [String]
}
```

If the request is correct you will receive a success response:

```js
{
  "success": true,
  "saved": {
    "__v": 0,
    "name": "Samsung Galaxy",
    "sell": true,
    "price": 253.2,
    "_id": "572cd8e60cd355cd32c73078",
    "tags": [
      "lifestyle",
      "mobile"
    ]
  }
}
```

If is not, the response will be like this:

```js
{
  "success": false,
  "error": "Validation error. One or more required fields haven´t been inserted"
}
```

### Selecting Commercials

For selecting commercial please use a `GET` request to this route:

`http://server_ip:3000/api/v1/commercials?`

followed by the parameters you want to filter

*1- Tags:*

`http://server_ip:3000/api/v1/commercials?tags=lifestyle&tags=mobile`


*2- Selling Commercial or Searching Commercial:*

`http://server_ip:3000/api/v1/commercials?sell=true` for selling

`http://server_ip:3000/api/v1/commercials?sell=false` for searching

*3- Price:*

You can filter price ranges using a '-'

`http://server_ip:3000/api/v1/commercials?price=100` for the exact value.

`http://server_ip:3000/api/v1/commercials?price=10-60` for range values.

`http://server_ip:3000/api/v1/commercials?price=10-` for 'greater or equal' values.

`http://server_ip:3000/api/v1/commercials?price=-60` for 'lower or equal' values.

*4- Name:*

You can filter using the 'name' field using a complete match or introducing the first letters of the string you want to find.

`http://server_ip:3000/api/v1/commercials?na,e=ip` returning all the results beginning from 'ip' either lower or upper case.

*5- Field listing:*

Perhaps you want a list of all the results for one field, use

`http://server_ip:3000/api/v1/commercials?field=tags` returns all the tags.

`http://server_ip:3000/api/v1/commercials?field=name` returns all the names of the commercials.

*6- Counting results:*

If you want to know how many items are with the filter you made, you can use this:

`http://server_ip:3000/api/v1/commercials?total=true` for receiving the total of items in database.

`http://server_ip:3000/api/v1/commercials?name=ip&total=true` for receiving how many items match this filter.

## API - Push Token

For saving Commercials, use a `POST` or `PUT` request to the route:

`http://server_ip:3000/api/v1/tokens`

The token data model is:

```js
{ 
    platform: {type: String, enum: ['ios', 'android'], required: true}, 
    token: {type: String, required: true},
    user: String
}
```

If the request is correct you will receive a success response:

```js
{
  "success": true,
  "saved": {
    "__v": 0,
    "platform": "ios",
    "token": "lajfñadjfñdkjfñkfjñadkjfakfjña",
    "user": "mongo",
    "_id": "572ce1a40e4eb309336c35bc"
  }
}
```

If is not, the response will be like this:

```js
{
  "success": false,
  "error": "Push incomplete. Please review your request"
}
```

## Author

The author of Nodepop is [Juan Arillo](https://github.com/juarru)

## License

  [MIT](LICENSE)
