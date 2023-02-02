const hre = require("hardhat")

const main=async()=>{
	const rsvpContractFactory = await hre.ethers.getContractFactory("Web3RSVP");
	const rsvpContract = await rsvpContractFactory.deploy();
	await rsvpContract.deployed();
	console.log("Cintract deployed to:",rsvpContract.address);

	//initialize addr to interact with the contract
	const [deployed,address1,address2] = await hre.ethers.getSigners();
	let deposit= hre.ethers.utils.parseEther("1");
	let maxCapacity = 3;
	let timestamp = 1718926200;
	let eventDataCID="bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi"

	//create anew event by calling creatNewEvent() and passing the mock prm
	let txn = await rsvpContract.createNewEvent(
		timestamp,
		deposit,
		maxCapacity,
		eventDataCID
	);
	let wait = await txn.wait();
	console.log("NEW EVENT CREATED:",wait.event[0].event,wait.events[0].args);

	let eventID=wait.event[0].args.eventID;
	console.log("Event Id:",eventID);
};

const runMain = async()=>{
	try {
		await main();
		Process.exit(0);
	} catch (error) {
		console.log(error);
		Process.exit(1);
		
	}
};

runMain();