const Factory = artifacts.require("UniswapV2Factory");
const Router = artifacts.require("UniswapV2Router02");
const Donateci = artifacts.require("Donateci");

module.exports = async function (deployer, network, addresses) {
    const FACTORY_ADDRESS = '0xAd99aF7d738DC8BD65157f3506432F4145B8Db82';
    const WBITCI_ADDRESS = '0xA191613494bA274772b4b89B4AAFEBc1C9c1e139';
    const donateci = await Donateci.deployed();
    const DONATECI_ADDRESS = donateci.address;
    const ROUTER_ADDRESS = '0xA25EdF1fB7A6394ef6A11ae5370f31a4c9d1eD89';
    //const factory = await Factory.at(FACTORY_ADDRESS);
    //factory.createPair(DONATECI_ADDRESS, WBITCI_ADDRESS);
    
    const router = Router.at(ROUTER_ADDRESS)
    router.addLiquidityETH(DONATECI_ADDRESS, 
        web3.utils.toWei(web3.utils.toBN(1000000)), 
        web3.utils.toWei(web3.utils.toBN(900000)), 
        web3.utils.toWei(web3.utils.toBN(4)), 
        addresses[0], 2639782851, {value: web3.utils.toWei(web3.utils.toBN(5)) });
};
