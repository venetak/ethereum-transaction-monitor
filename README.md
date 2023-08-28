# Ethereum transaction Monitor

This is an application that monitors all Ethereum transactions and saves those of them that match a given configuration in a database.

# How to run

## Prerequisites

You'll need to setup the following programs/tools in order to run this project:

1. [NodeJS](https://nodejs.org/dist/v16.16.0/) - `v16.16.0`
2. [MongoDBCompass](https://www.mongodb.com/try/download/compass) - `v1.39.2` - optional
3. [MongoDb](https://www.mongodb.com/try/download/community-kubernetes-operator) - `v.6.0.4`
4. [Postman](https://www.postman.com/) - `v10.17.4` - optional

## Setup

### Create an .env File

Create a `.env` file in the root of the project and add the following variables:

```
INFURA_ENDPOINT = "wss://sepolia.infura.io/ws/v3/<API_KEY>"
INFURA_API_KEY = "<API_KEY>"
```

### Install Dependencies

After installing all of the above tools, checkout the repo and install all dependencies by running

```
npm i
```

in the root folder - `ethereum-transaction-monitor`.

### Setup the database

- Open the MongoDBCompass and make sure the Connection URL is `mongodb://localhost:27017`:

![CompassURL](/docs/images/CompassURL.PNG)

- In the root of the project execute
```
npm run setup-database
```

This will create a `RuleConfiguration.configurations` document with default values.

### Prepare the client app

Navigate to `/client` and run

```
npm i && npm run start
```
This will start a development server that will host a [React](https://react.dev/) app that displays a table with all transactions.

### Import the Postman Collections

For easier testing use Postman - an HTTP client that allow you to make requests to the API endpoints. The exported collections are in the `postman-collections` folder. **Make sure to set the {{secret}} variable!** It is not exported with the collection.

![PostmanCollections](/docs/images/PostmanImportColl.PNG)

### Start the Services

In the root of the project run **in this order**:

```
npm run start-rules-configuration
```

```
npm run start-api-gateway
```

```
start-tx-monitor
```

You'll begin to see logs that look like this:

```
Matched TX ------------ 0xe48e1a11cfadb1a6a7391e2c71454f05b551a6161ae2a3198d83cd9e7c8f3d65
```

This message is logged when a transaction matches the default configuration.
You should be abe to see the full transaction object in the table:

![Logs](/docs/images/Logs.PNG)

The configuration that triggered the save is currently displayed in the table only by its id.

## Updating the Configuration

The default configuration matches transactions that have values for `gasLimit` and `value` greater than 1000000000000, which is a realistic case. Open Postman, go to the API Gateway collection and select the `RC__Update` request:

![UpdateConfig](/docs/images/UpdateConfig.PNG)

Update the configuration id in the url - use the `RC_Get All` request to get all configurations (at this point you should have only one) and copy its id property. Select `raw` and `JSON`` as options for the request body and paste the following data:

```
{
    "rules": [
        {
            "type": "range",
            "propName": "gasLimit",
            "values": ["0", "0"]
        },
        {
            "type": "range",
            "propName": "value",
            "values": ["0", "0"]
        }
    ]
}
```

Click Send. You should receive a (unfortunately not so readable) log saying that the config has changed:

![RulesChangeLog](/docs/images/RulesChangeLog.PNG)

## Architecture

The application was designed with microservices in min. *However*, for simplicity - they share dependencies in the form of node modules and utilities. 

- The rules configuration service handles all rules - related logic and exposes API endpoints for CRUD operations.
- The tx monitor service uses ethers to connect to an Infura endpoint and listen for `block` event - allowing us to get all transactions and check if they match a rule set
- The API gateway service is the public API that the client makes requests to.

Refer to the image bellow for more clarification:

![Arch](/docs/images/Arch.PNG)