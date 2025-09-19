// scripts/deploy.js
import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  
  const Hospital = await ethers.getContractFactory("Hospital");

  
  const initialDoctors = ["Dr. Strange", "Dr. House"];
  const initialPatients = ["Alice", "Bob"];

  
  console.log("Deploying Hospital contract...");
  const hospital = await Hospital.deploy(initialDoctors, initialPatients);

  
  await hospital.waitForDeployment();
  console.log("Hospital deployed to:", hospital.target); // ✅ This is the address

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
