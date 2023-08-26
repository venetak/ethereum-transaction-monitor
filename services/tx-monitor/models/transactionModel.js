const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
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
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
