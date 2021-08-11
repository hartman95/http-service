
## http-service
A small node express app using mongoDB, running in docker.

### Development
* ` docker-compose up -d --build`
* ` docker-compose down`

### Routing

* **PUT** - Create Object
`http://localhost:8080/objects/{bucket_id}/{object_id}`

* **GET** - Get Object
`http://localhost:8080/objects/{bucket_id}/{object_id}`

* **DELETE** - Delete Object
`http://localhost:8080/objects/{bucket_id}/{object_id}`

---
* **GET** - Get All Objects
`http://localhost:8080/objects/all`

* **GET** - Get All Objects by Bucket
`http://localhost:8080/objects/bucket/{bucket_id}`
