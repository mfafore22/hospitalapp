import hre from "hardhat";

async function main() {
  const address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const Hospital = await hre.ethers.getContractFactory("Hospital");
  const hospital = Hospital.attach(address);

  console.log("Listing doctors:");
  for (let i = 0; i < 10; i++) {
    try {
      const doc = await hospital.doctors(i);
      if (doc.name.length > 0) console.log(`Doctor ${i}: ${doc.name}, available: ${doc.available}`);
    } catch {}
  }

  console.log("Listing patients:");
  for (let i = 0; i < 10; i++) {
    try {
      const pat = await hospital.patients(i);
      if (pat.name.length > 0) console.log(`Patient ${i}: ${pat.name}`);
    } catch {}
  }

  console.log("Booking appointment for Alice with Dr. Smith...");
  const tx = await hospital.bookAppointment(0, 0, Date.now());
  await tx.wait();
  console.log("Appointment booked!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
