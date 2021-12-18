const DonateciNFT = artifacts.require("DonateciNFT");

contract("DonateciNFT", async accounts => {
    it("should mint DNFT", async () => {
        const instance = await DonateciNFT.deployed();
        const balance = await instance.balanceOf.call(accounts[0]);
        const tx = await instance.mintDNFT(accounts[0], "mock-uri");
        const newBalance = await instance.balanceOf.call(accounts[0]);

        const mintEvent = tx.logs.find((log) => log.event == 'MintDNFT');
        assert.isDefined(mintEvent);
        
        assert.equal(parseInt(balance) + 1, newBalance);

        const tokenId = await instance.tokenOfOwnerByIndex.call(accounts[0], newBalance - 1);
        assert.equal(tokenId.toNumber(), mintEvent.args["1"].toNumber());
    });
});