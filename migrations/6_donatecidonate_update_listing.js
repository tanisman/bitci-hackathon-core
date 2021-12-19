const DonateciDonate = artifacts.require("DonateciDonate");
const DonateciListing = artifacts.require("DonateciListing");
const Donateci = artifacts.require("Donateci");
const DonateciNFT = artifacts.require("DonateciNFT");

module.exports = async function (deployer) {
    const dnc = await Donateci.deployed();
    const dnft = await DonateciNFT.deployed();
    const listing = await DonateciListing.deployed();
    
    await deployer.deploy(DonateciDonate, listing.address);
    await DonateciDonate.deployed();
};
