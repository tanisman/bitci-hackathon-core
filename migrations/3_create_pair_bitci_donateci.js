const Factory = artifacts.require("UniswapV2Factory");

module.exports = async function (deployer) {
    const FACTORY_ADDRESS = '0xAd99aF7d738DC8BD65157f3506432F4145B8Db82';
    const WBITCI_ADDRESS = '0x3b16f51Fbc1c6Eba8909D64b4CA1399f2759Ac54';
    const DONATECI_ADDRESS = '0x19d144848Fe4F1Ab125518c6Ecbb991D76510e05';
    const factory = await Factory.at(FACTORY_ADDRESS);
    factory.createPair(DONATECI_ADDRESS, WBITCI_ADDRESS);
};
