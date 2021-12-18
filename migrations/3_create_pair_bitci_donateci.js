const Factory = artifacts.require("IUniswapV2Factory");
const Router = artifacts.require("IUniswapV2Router02");
const Donateci = artifacts.require("Donateci");
const IWBITCI = artifacts.require("IWBITCI");

module.exports = async function (deployer, network, addresses) {
    const FACTORY_ADDRESS = '0xAd99aF7d738DC8BD65157f3506432F4145B8Db82';
    const WBITCI_ADDRESS = '0x4D34C35543EF77C7Facc14FF61f004C470C5CD18';
    const donateci = await Donateci.deployed();
    const DONATECI_ADDRESS = donateci.address;
    const ROUTER_ADDRESS = '0xBE5502C20f7870caFF0452E5F0674D5726BdA8b3';
    //const factory = await Factory.at(FACTORY_ADDRESS);
    //factory.createPair(DONATECI_ADDRESS, WBITCI_ADDRESS);
    
    const factory = await Factory.at(FACTORY_ADDRESS);
    const router = await Router.at(ROUTER_ADDRESS);
    const wbitci = await IWBITCI.at(WBITCI_ADDRESS);
    
    let pairAddress = await factory.getPair(DONATECI_ADDRESS, WBITCI_ADDRESS);
    if (pairAddress == '0x0000000000000000000000000000000000000000') {
        await factory.createPair(DONATECI_ADDRESS, WBITCI_ADDRESS);
        pairAddress = await factory.getPair(DONATECI_ADDRESS, WBITCI_ADDRESS);
    }

    
    console.log("pair address = " + pairAddress);

        /*
    await donateci.approve(pairAddress, web3.utils.toWei(web3.utils.toBN(1000000)), {from: addresses[0]});
    await donateci.approve(ROUTER_ADDRESS, web3.utils.toWei(web3.utils.toBN(1000000)), {from: addresses[0]});
    await wbitci.approve(pairAddress, web3.utils.toWei(web3.utils.toBN(5)), { from: addresses[0] });
    await wbitci.approve(ROUTER_ADDRESS, web3.utils.toWei(web3.utils.toBN(5)), { from: addresses[0] });

    await router.addLiquidity(DONATECI_ADDRESS,
        WBITCI_ADDRESS, 
        web3.utils.toWei(web3.utils.toBN(1000000)), 
        web3.utils.toWei(web3.utils.toBN(5)),
        web3.utils.toWei(web3.utils.toBN(900000)), 
        web3.utils.toWei(web3.utils.toBN(4)), 
        addresses[0], Math.floor((Date.now() + 1000*24*60*60) / 1000), {from: addresses[0] });
        */
};
