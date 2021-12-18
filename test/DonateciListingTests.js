const Donateci = artifacts.require("Donateci");
const DonateciListing = artifacts.require("DonateciListing");
const DonateciNFT = artifacts.require("DonateciNFT");

contract("DonateciListing", async accounts => {
    it("should become creator", async () => {
        const donateci = await Donateci.deployed();
        const listing = await DonateciListing.deployed();

        await donateci.approve(listing.address, web3.utils.toWei(web3.utils.toBN(100)));
        await listing.becomeCreator({from: accounts[0]});
        assert.isTrue(await listing.isCreator.call(accounts[0]));
    });

    it("should mint DNFT and List", async () => {
        const donateci = await Donateci.deployed();
        const donateciNFT = await DonateciNFT.deployed();
        const listing = await DonateciListing.deployed();

        const tx = await donateciNFT.mintDNFT(accounts[0], "mock-uri");
        const mintEvent = tx.logs.find((log) => log.event == 'MintDNFT');
        assert.isDefined(mintEvent);
        
        const tokenId = mintEvent.args["1"].toNumber();

        await donateciNFT.approve(listing.address, tokenId);
        const addListingTx = await listing.addNFTListing(tokenId, web3.utils.toWei(web3.utils.toBN(2)));
        
        const addListingEvent = addListingTx.logs.find((log) => log.event == 'NewNFTListing');
        assert.isDefined(addListingEvent);

        const listedTokenId = addListingEvent.args["1"].toNumber();
        assert.equal(listedTokenId, tokenId);
    });

    it("should mint DNFT, List than able to buy that NFT", async () => {
        const donateci = await Donateci.deployed();
        const donateciNFT = await DonateciNFT.deployed();
        const listing = await DonateciListing.deployed();

        const tx = await donateciNFT.mintDNFT(accounts[0], "mock-uri");
        const mintEvent = tx.logs.find((log) => log.event == 'MintDNFT');
        assert.isDefined(mintEvent);
        
        const tokenId = mintEvent.args["1"].toNumber();

        await donateciNFT.approve(listing.address, tokenId);
        const addListingTx = await listing.addNFTListing(tokenId, web3.utils.toWei(web3.utils.toBN(2)));
        
        const addListingEvent = addListingTx.logs.find((log) => log.event == 'NewNFTListing');
        assert.isDefined(addListingEvent);

        const listedTokenId = addListingEvent.args["1"].toNumber();
        assert.equal(listedTokenId, tokenId);

        await donateci.transfer(accounts[1], web3.utils.toWei(web3.utils.toBN(100)));

        await donateci.approve(listing.address, web3.utils.toWei(web3.utils.toBN(2)), {from: accounts[1]});
        const buyTx = await listing.buyNFT(listedTokenId, {from: accounts[1]});
        const nftSoldEvent = buyTx.logs.find((log) => log.event == 'NFTSold');
        assert.isDefined(nftSoldEvent);
        assert.equal(nftSoldEvent.args["2"], listedTokenId);
        assert.equal(nftSoldEvent.args["1"], accounts[1]);
    });
});