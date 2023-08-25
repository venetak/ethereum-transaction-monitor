const { ethers } = require('ethers');

async function main () {
    // Configuring the connection to an Ethereum node
    const network = process.env.ETHEREUM_NETWORK;
    // const provider = new ethers.providers.InfuraProvider(
    //     network,
    //     process.env.INFURA_API_KEY
    // );
    const provider = new ethers.providers.InfuraWebSocketProvider(
        network,
        process.env.INFURA_API_KEY
    );

    // Creating a signing account from a private key
    const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

    provider.on('block', (blockNumber) => {
        provider.getBlock(blockNumber).then(block => {
            // console.log(block.transactions);
            provider.getTransaction(block.transactions[0]).then(tx => {
                console.log(tx.gasPrice.toString());
            });
        });
        console.log('===================pending', blockNumber);
    });
}

require('dotenv').config();
main();
