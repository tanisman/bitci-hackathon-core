const Donateci = artifacts.require("Donateci");
const DonateciListing = artifacts.require("DonateciListing");
const DonateciNFT = artifacts.require("DonateciNFT");
const DonateciDonate = artifacts.require("DonateciDonate");

contract("DonateciDonate", async accounts => {
    it("should make 3rd account creator, then donate it", async () => {
        const donateci = await Donateci.deployed();
        const listing = await DonateciListing.deployed();

        await donateci.transfer(accounts[2], web3.utils.toWei(web3.utils.toBN(1000)));

        await donateci.approve(listing.address, web3.utils.toWei(web3.utils.toBN(100)), {from: accounts[2]});
        await listing.becomeCreator({from: accounts[2]});
        assert.isTrue(await listing.isCreator.call(accounts[2]));

        const donater = await DonateciDonate.deployed();
        await donateci.approve(donater.address, web3.utils.toWei(web3.utils.toBN(20000)));
        const tx = await donater.donate(accounts[2], web3.utils.toWei(web3.utils.toBN(20000)), "some-donate-message");

        const donationEvent = tx.logs.find((log) => log.event == 'Donation');
        assert.isDefined(donationEvent);

        assert.equal(donationEvent.args["2"].toString(10), web3.utils.toWei(web3.utils.toBN(20000)).toString(10));
        assert.equal(donationEvent.args["3"], "some-donate-message");
    });

    it("should emit NewLeader event", async () => {
        const donateci = await Donateci.deployed();
        const listing = await DonateciListing.deployed();

        const donater = await DonateciDonate.deployed();
        await donateci.approve(donater.address, web3.utils.toWei(web3.utils.toBN(20000)));
        const tx = await donater.donate(accounts[2], web3.utils.toWei(web3.utils.toBN(20000)), "some-donate-message");

        const newLeaderEvent = tx.logs.find((log) => log.event == 'NewLeader');
        assert.isDefined(newLeaderEvent);

        assert.equal(newLeaderEvent.args["1"], accounts[0]);
    });

    it("should call getTotalDonatedTo", async () => {
        const donateci = await Donateci.deployed();
        const listing = await DonateciListing.deployed();

        const donater = await DonateciDonate.deployed();
        const amount = await donater.getTotalDonatedTo(accounts[2], accounts[0]);
        assert.notEqual(amount, 0);
    });
    
    it("should call getLeaderBoardOf", async () => {
        const donateci = await Donateci.deployed();
        const listing = await DonateciListing.deployed();

        const donater = await DonateciDonate.deployed();
        const leaderboard = await donater.getLeaderBoardOf.call(accounts[2]);
        const amount = await donater.getTotalDonatedTo(accounts[2], accounts[0]);
        assert.equal(leaderboard[0], accounts[0]);
        assert.equal(leaderboard[1].toString(10), amount.toString(10));
    });
});