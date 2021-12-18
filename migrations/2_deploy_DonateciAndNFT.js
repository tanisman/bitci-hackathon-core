const Donateci = artifacts.require("Donateci");
const DonateciNFT = artifacts.require("DonateciNFT");

module.exports = async function (deployer) {
  await deployer.deploy(Donateci);
  await deployer.deploy(DonateciNFT);
};
