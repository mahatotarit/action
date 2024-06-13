// =============== dynamic variables ======================
let wallet_provider;
let target_wallet;
let your_wallet;
let token_contract;

let token_name;
let network_row;
let gas_limit = 25000;
let gas_price;
let gas_fee_eth;
let token_amount;
let gas_in_gwei;

// ================ transactions variables ================
let per_block_tx = 3;
let burning_block = 4;

let token_abi = [
  {
    inputs: [
      { internalType: 'string', name: 'name_', type: 'string' },
      { internalType: 'string', name: 'symbol_', type: 'string' },
      { internalType: 'uint8', name: 'decimals_', type: 'uint8' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// ================= static functions ===================
async function isValidRPCURL(url) {
  try {
    wallet_provider = new ethers.providers.JsonRpcProvider(url);
    await wallet_provider.getBlockNumber();

    const network = await wallet_provider.getNetwork();
    const network_chain_id = network.chainId;
    network_row = networks.find((net) => net.chainId === network_chain_id);

    return true;
  } catch (error) {
    showNotification(`Invalid RPC URL: ${url}`, 10, false);
    return false;
  }
}

async function isTargetValidPrivateKey(privateKey) {
  try {
    target_wallet = new ethers.Wallet(privateKey, wallet_provider);
    return true;
  } catch (error) {
    showNotification(
      `Invalid target wallet private key: ${privateKey}`,
      10,
      false,
    );
    return false;
  }
}

async function isYourValidPrivateKey(privateKey) {
  try {
    your_wallet = new ethers.Wallet(privateKey, wallet_provider);
    return true;
  } catch (error) {
    showNotification(
      `Invalid your wallet private key: ${privateKey}`,
      10,
      false,
    );
    return false;
  }
}

async function isValidTokenContract(rpcUrl, tokenAddress) {
  try {
    let provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    token_contract = new ethers.Contract(tokenAddress, token_abi, provider);
    token_name = await token_contract.name();
    return true;
  } catch (error) {
    console.log(error);
    showNotification(
      `Invalid token contract address: ${tokenAddress}`,
      10,
      false,
    );
    return false;
  }
}

// ===================== dynamic function =====================
async function calculateGasPrice() {
  gas_price = await wallet_provider.getGasPrice();

  const gasFee = gas_price * gas_limit;
  gas_in_gwei = ethers.utils.formatUnits(gas_price, 'gwei');
  gas_fee_eth = ethers.utils.formatEther(gasFee);

  return gas_fee_eth;
}

// when page loaded
let form_data = {};

document.addEventListener('DOMContentLoaded', function () {
  let bot_details_form = document.querySelector('#bot_details_form');

  bot_details_form.addEventListener('submit', function (event) {
    next_btn_process();

    event.preventDefault();
    let bot_form_data = new FormData(bot_details_form);

    bot_form_data.forEach((value, key) => {
      form_data[key] = value.trim();
    });

    submit_form_data_fun(form_data);
  });

  async function submit_form_data_fun(data) {
    let bot_details_status = false;
    let provider_set_res = await isValidRPCURL(data.rpc_url);
    if (provider_set_res) {
      let target_wallet_set_res = await isTargetValidPrivateKey(
        data.target_wallet_private_key,
      );
      if (target_wallet_set_res) {
        let your_wallet_set_res = await isYourValidPrivateKey(
          data.your_wallet_private_key,
        );
        if (your_wallet_set_res) {
          let token_contract_set_res = await isValidTokenContract(
            data.rpc_url,
            data.token_address,
          );
          if (token_contract_set_res) {
            bot_details_status = true;
          }
        }
      }
    }

    if (bot_details_status) {
      showNotification(`Select Your Payment Type`, 10, true);
      open_payment_select_modal();
      next_btn_normal();

      save_payment_type();
    } else {
      next_btn_normal();
    }
  }

  async function save_payment_type() {
    let fees_set = await function_three_gas_fee();

    if (!fees_set) {
      return;
    }

    const payment_save_Button = document.getElementById('saveButton');
    payment_save_Button.addEventListener('click', async function () {
      const checked_payment_Button = document.querySelector(
        'input[name="select_type"]:checked',
      );
      if (checked_payment_Button) {
        per_block_tx = checked_payment_Button.value;
        close_payment_select_modal();
        openSmallModal();

        let req = await require_tx_cost();
        if (req) {
          document
            .querySelector('.start_the_bot')
            .addEventListener('click', async function () {
              open_terminal_modal();
              await request_to_burning();
            });
        }
      }
    });
  }

  async function function_three_gas_fee() {
    let tx_cost = await calculateGasPrice();
    let minimum_tx = 2;
    let all_three_fee_span = document.querySelectorAll('.tx_colst_value_span');
    for (let i = 0; i < 3; i++) {
      all_three_fee_span[i].innerHTML =
        tx_cost * 2 * minimum_tx + ' ' + network_row.symbol;
      minimum_tx++;
    }

    return true;
  }

  async function require_tx_cost() {
    try {
      let your_wallet_balance_li = document.querySelector(
        '.your_wallet_balance_li',
      );
      let your_wall_b_span = your_wallet_balance_li.querySelector(
        '.your_wallet_balance_span',
      );

      const balance = await wallet_provider.getBalance(your_wallet.address);
      const balanceInEther = ethers.utils.formatEther(balance);
      let total_fee_cost = gas_fee_eth * 2 * per_block_tx;

      your_wallet_balance_li.querySelector('.spinner').style.display = 'none';
      your_wall_b_span.innerHTML = balanceInEther + ' ' + network_row.symbol;

      if (total_fee_cost < balanceInEther) {
        your_wallet_balance_li.classList.add('success');
      } else {
        your_wallet_balance_li.classList.add('failure');
        return false;
      }

      let target_wallet_token_balance_li = document.querySelector(
        '.target_wallet_token_balance_li',
      );
      let target_wallet_token_balance_span =
        target_wallet_token_balance_li.querySelector(
          '.target_wallet_token_balance_span',
        );

      const token_balance = await token_contract.balanceOf(
        target_wallet.address,
      );
      const balanceInTokens = ethers.utils.formatUnits(token_balance, 18);
      token_amount = balanceInTokens;
      target_wallet_token_balance_li.querySelector('.spinner').style.display =
        'none';
      target_wallet_token_balance_span.innerHTML =
        balanceInTokens + ' ' + token_name;

      if (0 < balanceInTokens) {
        target_wallet_token_balance_li.classList.add('success');
      } else {
        target_wallet_token_balance_li.classList.add('failure');
        return false;
      }

      document.querySelector('.recipient_address_span_small').innerHTML =
        form_data.token_recipient_wallet_address;

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
});

async function request_to_burning() {
  await send_transaction();
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function send_transaction() {
  const provider = new ethers.providers.JsonRpcProvider(form_data.rpc_url);

  const senderPrivateKey = form_data.your_wallet_private_key;
  const wallet = new ethers.Wallet(senderPrivateKey, provider);

  const receiverAddress = target_wallet.address;
  let current_nonce = await provider.getTransactionCount(wallet.address);
  let nonce = current_nonce;

  async function sendTransaction() {
    const tx = {
      to: receiverAddress,
      value: ethers.utils.parseEther(gas_fee_eth.toString()),
      nonce: nonce,
    };

    try {
      const transaction = await wallet.sendTransaction(tx);
      nonce = nonce + 1;
      console.log('Transaction submitted:', transaction.hash);
    } catch (error) {
      console.error('gas fee sending errror:');
    }
  }

  let count_block = 0;
  provider.on('block', async (blockNumber) => {
    console.log(`New block mined: ${blockNumber}`);

    if (count_block === 0) {
      count_block++;
    } else {
      if (count_block <= burning_block) {
        console.log('burning start');
        count_block++;

        for (let i = 0; i < per_block_tx; i++) {
          await sendTransaction();
          await delay(500);
          if (i == 0) {
            transfer_token();
          } 
        }
      } else {
        return;
      }
    }
  });

  console.log('Listening for new blocks...');

  const second_senderPrivateKey = form_data.target_wallet_private_key;
  const second_wallet = new ethers.Wallet(second_senderPrivateKey, provider);
  const tokenAddress = form_data.token_address;
  const tokenContract = new ethers.Contract(tokenAddress,token_abi,second_wallet,);
  const balance = await tokenContract.balanceOf(second_wallet.address);
  const second_receiverAddress = form_data.token_recipient_wallet_address;

  let second_current_nonce = await provider.getTransactionCount(
    second_wallet.address,
  );
  let second_nonce = second_current_nonce;

  let trans_rep = true;

  async function transfer_token() {

    async function sendTokenTransaction() {
      try {
        const tx = await tokenContract.transfer(second_receiverAddress, balance, {nonce: second_nonce,});
        second_nonce = second_nonce + 1;
        console.log('Token Transfer Transaction submitted:', tx.hash);
      } catch (error) {
        console.log('token trnasfer sending error');
      }

      await checking_balance();
    }

    while (trans_rep) {
      await sendTokenTransaction();
      await delay(1000);
    }

  }

  async function checking_balance() {
    const checking = await tokenContract.balanceOf(second_wallet.address);
    if (checking.eq(0)) {
      trans_rep = false;
      console.log('🎉🎉🎉 Balance is 0! 🎉🎉🎉');
      triggerFlowerExplosion();
      provider.removeAllListeners('block');
    }
  }

}
