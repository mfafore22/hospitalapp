import { expect } from "chai";
import hre from "hardhat";

describe("Hospital", function () {
  before(async function () {
    this.Hospital = await hre.ethers.getContractFactory("Hospital");
  });

  beforeEach(async function () {
    const initialDoctors = ["Dr. Smith"];
    const initialPatients = ["Alice"];
    this.hospital = await this.Hospital.deploy(initialDoctors, initialPatients);
    await this.hospital.waitForDeployment();
  });

  it("should add doctors and patients correctly", async function () {
    const doc0 = await this.hospital.doctors(0);
    expect(doc0.name).to.equal("Dr. Smith");

    const pat0 = await this.hospital.patients(0);
    expect(pat0.name).to.equal("Alice");

    await this.hospital.addDoctor("Dr. Strange");
    const doc1 = await this.hospital.doctors(1);
    expect(doc1.name).to.equal("Dr. Strange");

    await this.hospital.addPatient("Bob");
    const pat1 = await this.hospital.patients(1);
    expect(pat1.name).to.equal("Bob");
  });

  it("should book an appointment", async function () {
    await this.hospital.bookAppointment(0, 0, 1234567890);
    const appt = await this.hospital.appointments(0);
    expect(appt.doctorId).to.equal(0);
    expect(appt.patientId).to.equal(0);
    expect(appt.exists).to.equal(true);
  });

  it("should cancel an appointment", async function () {
    await this.hospital.bookAppointment(0, 0, 1234567890);
    await this.hospital.cancelAppointment(0);
    const appt = await this.hospital.appointments(0);
    expect(appt.exists).to.equal(false);
  });
});
