const Donateci = artifacts.require("Donateci");

contract("Donateci", async accounts => {
    it("should put 100000000 Donateci in the first account", async () => {
        const donateci = await Donateci.deployed();
        const balance = await donateci.balanceOf.call(accounts[0]);
        assert.equal(balance.valueOf(), web3.utils.toWei(web3.utils.toBN(100000000)).toString(10));
    });

    it("should transfer 1000 Donateci to second account", async () => {
        const donateci = await Donateci.deployed();
        const balance1 = await donateci.balanceOf.call(accounts[0]);
        const balance2 = await donateci.balanceOf.call(accounts[1]);
        await donateci.transfer(accounts[1], web3.utils.toWei(web3.utils.toBN(1000)), { from: accounts[0] });
        
        const newBalance1 = await donateci.balanceOf.call(accounts[0]);
        const newBalance2 = await donateci.balanceOf.call(accounts[1]);

        assert.equal(web3.utils.fromWei(newBalance1), web3.utils.fromWei(balance1) - 1000);
        assert.equal(web3.utils.fromWei(newBalance2), parseInt(web3.utils.fromWei(balance2)) + 1000);
    });
});