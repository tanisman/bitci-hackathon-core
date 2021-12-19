const Factory = artifacts.require("IUniswapV2Factory");
const Router = artifacts.require("IUniswapV2Router02");
const Donateci = artifacts.require("Donateci");
const IWBITCI = artifacts.require("IWBITCI");

module.exports = async function (deployer, network, addresses) {
    /*const FACTORY_ADDRESS = '0xd50521ccBaDdA73C125c1a7668d26C93D5C193Ee';
    const WBITCI_ADDRESS = '0xdBeEe83Eb5a06D96B55dA5fDC4A231af1eb02e12';
    const donateci = await Donateci.deployed();
    const DONATECI_ADDRESS = donateci.address;
    const ROUTER_ADDRESS = '0xdA538976bDE2a1EE3b04771222E93D7b720f44A2';
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

    
    console.log("pair address = " + pairAddress);*/

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
