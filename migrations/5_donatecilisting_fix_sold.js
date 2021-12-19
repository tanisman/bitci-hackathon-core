const DonateciListing = artifacts.require("DonateciListing");
const Donateci = artifacts.require("Donateci");
const DonateciNFT = artifacts.require("DonateciNFT");

module.exports = async function (deployer, network, accounts) {
    const dnc = await Donateci.deployed();
    const dnft = await DonateciNFT.deployed();

    await deployer.deploy(DonateciListing, dnc.address, dnft.address);
    const listing = await DonateciListing.deployed();

    let tx = await dnft.mintDNFT(accounts[1], "image11.jpg");
    let mintEvent = tx.logs.find((log) => log.event == 'MintDNFT');
    let tokenId = mintEvent.args["1"].toNumber();
    await dnft.approve(listing.address, tokenId, {from: accounts[1]});
    await listing.addNFTListing(tokenId, web3.utils.toWei(web3.utils.toBN(100)), {from: accounts[1]});
    console.log("minted nft1 & listed");

    tx = await dnft.mintDNFT(accounts[1], "image22.jpg");
    mintEvent = tx.logs.find((log) => log.event == 'MintDNFT');
    tokenId = mintEvent.args["1"].toNumber();
    await dnft.approve(listing.address, tokenId, {from: accounts[1]});
    await listing.addNFTListing(tokenId, web3.utils.toWei(web3.utils.toBN(111)), {from: accounts[1]});
    console.log("minted nft2 & listed");

    tx = await dnft.mintDNFT(accounts[1], "image33.jpg");
    mintEvent = tx.logs.find((log) => log.event == 'MintDNFT');
    tokenId = mintEvent.args["1"].toNumber();
    await dnft.approve(listing.address, tokenId, {from: accounts[1]});
    await listing.addNFTListing(tokenId, web3.utils.toWei(web3.utils.toBN(222)), {from: accounts[1]});
    console.log("minted nft3 & listed");

    tx = await dnft.mintDNFT(accounts[2], "image44.jpg");
    mintEvent = tx.logs.find((log) => log.event == 'MintDNFT');
    tokenId = mintEvent.args["1"].toNumber();
    await dnft.approve(listing.address, tokenId, {from: accounts[2]});
    await listing.addNFTListing(tokenId, web3.utils.toWei(web3.utils.toBN(333)), {from: accounts[2]});
    console.log("minted nft4 & listed");

    tx = await dnft.mintDNFT(accounts[2], "image55.jpg");
    mintEvent = tx.logs.find((log) => log.event == 'MintDNFT');
    tokenId = mintEvent.args["1"].toNumber();
    await dnft.approve(listing.address, tokenId, {from: accounts[2]});
    await listing.addNFTListing(tokenId, web3.utils.toWei(web3.utils.toBN(444)), {from: accounts[2]});
    console.log("minted nft5 & listed");

    tx = await dnft.mintDNFT(accounts[3], "image66.jpg");
    mintEvent = tx.logs.find((log) => log.event == 'MintDNFT');
    tokenId = mintEvent.args["1"].toNumber();
    await dnft.approve(listing.address, tokenId, {from: accounts[3]});
    await listing.addNFTListing(tokenId, web3.utils.toWei(web3.utils.toBN(555)), {from: accounts[3]});
    console.log("minted nft6 & listed");
};
