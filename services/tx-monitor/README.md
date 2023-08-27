# Transactions Monitor Service

Monitors all Ethereum transactions and checks if they match any of a given set of rules.

1. Listens for a block event using the [Event Emitter Methods](https://docs.ethers.org/v5/api/providers/provider/#Provider--event-methods)
2. Gets all transactions from the block and checks if they match any of the rules in the current configuration
3. Listens for a `configuration-change` event and updates the configuration that it uses runtime
4. Saves transactions that match a rule to the database

# Transaction Schema

A Transaction model has the following structure:

```
{
    hash: String,
    to: String,
    from: String,
    nonce: Number,
    gasLimit: Number,
    gasPrice: Number,
    maxFeePerGas: Number,
    maxPriorityFeePerGas: Number,
    data: String,
    value: Number,
    chainId: Number,
    r: String,
    s: String,
    v: String,
    configId: mongoose.Schema.ObjectId,
}
```

Where `configId` is the id of the configuration that contains the rule that was matched.


# Testing the Endpoints

Install [Postman](https://www.postman.com/) and import the collection from [here](https://github.com/venetak/ethereum-transaction-monitor/blob/main/postman-collections/Transactions.postman_collection.json).