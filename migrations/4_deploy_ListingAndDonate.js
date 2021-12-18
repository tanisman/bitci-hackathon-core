const DonateciDonate = artifacts.require("DonateciDonate");
const DonateciListing = artifacts.require("DonateciListing");
const Donateci = artifacts.require("Donateci");
const DonateciNFT = artifacts.require("DonateciNFT");

module.exports = async function (deployer) {
    const dnc = await Donateci.deployed();
    const dnft = await DonateciNFT.deployed();

    await deployer.deploy(DonateciListing, dnc.address, dnft.address);
    const listing = await DonateciListing.deployed();
    await deployer.deploy(DonateciDonate, listing.address);
};
