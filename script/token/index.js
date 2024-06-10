// =============== dynamic variables ======================
let wallet_provider;
let target_wallet;
let your_wallet;
let token_contract;
let token_name;

// ================ transctions variables ================
let per_block_tx = 3;

// ================= static functions ===================
async function isValidRPCURL(url) {
  try {
    wallet_provider = new ethers.providers.JsonRpcProvider(url);
    await wallet_provider.getBlockNumber();

    const network = await wallet_provider.getNetwork();
    const network_chain_id = network.chainId;

    return true;
  } catch (error) {
    showNotification(`Invalid RPC URL: ${url}`,10,false);
    return false;
  }
}

async function isTargetValidPrivateKey(privateKey) {
  try {
    target_wallet = await new ethers.Wallet(privateKey);
    return true;
  } catch (error) {
    showNotification(`Invalid target wallet private key: ${privateKey}`,10,false);
    return false;
  }
}

async function isYourValidPrivateKey(privateKey) {
  try {
    your_wallet = await new ethers.Wallet(privateKey);
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

async function isValidTokenContract(rpcUrl, tokenAddress) {
  try {
    let provider = await new ethers.providers.JsonRpcProvider(rpcUrl);
    token_contract = await new ethers.Contract(
      tokenAddress,
      [
        'function transfer(address to, uint256 value) returns (bool)',
        'function name() public view virtual override returns (string memory)',
      ],
      provider,
    );
    token_name = await token_contract.name();
    return true;
  } catch (error) {
    console.error();
    showNotification(
      `Invalid token contract address: ${tokenAddress}`,
      10,
      false,
    );
    return false;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let bot_details_form = document.querySelector('#bot_details_form');

  bot_details_form.addEventListener('submit', function (event) {

    next_btn_process();

    event.preventDefault();
    let bot_form_data = new FormData(bot_details_form);

    let form_data = {};

    bot_form_data.forEach((value, key) => {
      form_data[key] = value.trim();
    });

    submit_form_data_fun(form_data);
  });

  async function submit_form_data_fun(data) {
    let bot_details_status = false;
    let provider_set_res = await isValidRPCURL(data.rpc_url);
    if(provider_set_res){

      let target_wallet_set_res = await isTargetValidPrivateKey(data.target_wallet_private_key);
      if(target_wallet_set_res){

        let your_wallet_set_res = await isYourValidPrivateKey(data.your_wallet_private_key);
        if(your_wallet_set_res){

          let token_contract_set_res = await isValidTokenContract(data.rpc_url,data.token_address);
          if(token_contract_set_res){
            bot_details_status = true;
          }

        }
      }
    }

    if(bot_details_status){
      showNotification(`Select Your Payment Type`, 10, true);
      open_payment_select_modal();
      next_btn_normal();

      save_paymtne_type();
    }else{
      next_btn_normal();
    }

  }

  async function save_paymtne_type(){
    const paymentsaveButton = document.getElementById('saveButton');
    paymentsaveButton.addEventListener('click', async function(){
      const checkedpaymentButton = document.querySelector('input[name="select_type"]:checked',);
      if(checkedpaymentButton){
        per_block_tx = checkedpaymentButton.value;
        close_payment_select_modal();
        openSmallModal();

        await require_bot_details();
      }

    })
  }

  async function require_bot_details(){

  }
  
});
