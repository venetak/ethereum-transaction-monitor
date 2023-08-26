# Rules Configuration Service

Handles all operations related to the dynamic configuration used to determine if a transaction should be saved in the database.

1. Supports API endpoints for getting, creating, updating and deleting configurations.
2. Saves the configuration in a database.
3. Has an auth layer preventing unauthenticated services from making requests.
4. Notifies the Transactions Monitor service if the configuration gets updated.

# Configuration Schema

A Configuration Rule has the following structure:

```
{
    rules: [
        {
            type: 'range',
            propName: 'gasLimit',
            values: ['0', '1000000000000'],
        },
        {
            type: 'range',
            propName: 'value',
            values: ['1000', '1000000000000'],
        },
        {
            type: 'equality',
            propName: 'from',
            values: ['0x5FDFA49a292796724B745682f4055f3a8F0142b7', '0x5FDFA49a292796724B745682f4055f3a8F0142b7'],
        }
    ],
}
```

A Rule must have:
- a type - which specifies the nature of the check that is going to be performed against that rule
    - possible values are 'range' and 'equality'
- propName - the name of the property that will be checked
- values - an array of possible values, for a range type rule it is a tuple that defines the range - [min, max]

## Crating a Default Model

Use the [seed](https://github.com/venetak/ethereum-transaction-monitor/blob/main/services/rules-configuration/models/seeds/configurations.seed.js) to generate a default configuration:

```
node models/seeds/configurations.seed.js
```

# Testing the Endpoints

Install [Postman](https://www.postman.com/) and import the collection from [here](https://github.com/venetak/ethereum-transaction-monitor/blob/main/postman-collections/RulesConfiguration.postman_collection.json).