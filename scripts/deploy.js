const hre = require("hardhat");

async function main() {
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const tracking = await Tracking.deploy();

  await tracking.deployed();

  console.log(`Tracking deployed to ${tracking.address}`);

  const Admin = await hre.ethers.getContractFactory("AdminLogin");
  const admin = await Admin.deploy();
  await admin.deployed();
  console.log(`Admin contract deployed successfully to: ${admin.address}`);

  console.log("Deployment completed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
