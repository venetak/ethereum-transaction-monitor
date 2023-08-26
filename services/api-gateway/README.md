# API Gateway Service

1. Serves to handle all client requests to the Transactions Monitor and Rules Configuration systems.
2. Contains configurations for all public endpoints.
3. Uses a proxy to pipe requests.
3. Sends a secret in headers as an auth method.

# How to Run

Inside the root folder run:

```
node index.js
```

This will host an [Express](https://expressjs.com/) application on a specific port.

# Making Requests

Install a REST client such as [Postman](https://www.postman.com/) and make requests to the endpoints defined [here](https://github.com/venetak/ethereum-transaction-monitor/blob/main/services/api-gateway/config/routes.js) or directly import the [Postman Collection](https://github.com/venetak/ethereum-transaction-monitor/blob/main/postman-collections/API%20Gateway.postman_collection.json). Make sure to replace any ids in the URLs that do not exist.