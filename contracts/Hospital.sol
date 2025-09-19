// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Hospital is Ownable {

    struct Doctor {
        string name;
        uint256 id;
        bool available;
    }

    struct Patient {
        string name;
        uint256 id;
    }

    struct Appointment {
        uint256 doctorId;
        uint256 patientId;
        uint256 time;
        bool exists;
    }

    mapping(uint256 => Doctor) public doctors;
    mapping(uint256 => Patient) public patients;
    mapping(uint256 => Appointment) public appointments;

    uint256 public nextDoctorId;
    uint256 public nextPatientId;
    uint256 public nextAppointmentId;

    event DoctorAdded(uint256 doctorId, string name);
    event PatientAdded(uint256 patientId, string name);
    event AppointmentBooked(uint256 appointmentId, uint256 doctorId, uint256 patientId, uint256 time);
    event AppointmentCancelled(uint256 appointmentId);

    constructor(string[] memory initialDoctors, string[] memory initialPatients) Ownable(msg.sender) {
        for (uint i = 0; i < initialDoctors.length; i++) {
            addDoctor(initialDoctors[i]);
        }

        for (uint i = 0; i < initialPatients.length; i++) {
            addPatient(initialPatients[i]);
        }
    }

    function addDoctor(string memory name) public onlyOwner {
        require(bytes(name).length > 0, "Doctor name cannot be empty");
        doctors[nextDoctorId] = Doctor(name, nextDoctorId, true);
        emit DoctorAdded(nextDoctorId, name);
        nextDoctorId++;
    }

    function addPatient(string memory name) public onlyOwner {
        require(bytes(name).length > 0, "Patient name cannot be empty");
        patients[nextPatientId] = Patient(name, nextPatientId);
        emit PatientAdded(nextPatientId, name);
        nextPatientId++;
    }

    function bookAppointment(uint256 doctorId, uint256 patientId, uint256 time) public {
        require(doctorId < nextDoctorId, "Doctor does not exist");
        require(patientId < nextPatientId, "Patient does not exist");
        require(doctors[doctorId].available, "Doctor not available");

        appointments[nextAppointmentId] = Appointment(doctorId, patientId, time, true);
        emit AppointmentBooked(nextAppointmentId, doctorId, patientId, time);
        nextAppointmentId++;
    }

    function cancelAppointment(uint256 appointmentId) public {
        require(appointments[appointmentId].exists, "Appointment does not exist");
        appointments[appointmentId].exists = false;
        emit AppointmentCancelled(appointmentId);
    }

    // Helper functions to read lists
    function getDoctor(uint256 doctorId) public view returns (Doctor memory) {
        return doctors[doctorId];
    }

    function getPatient(uint256 patientId) public view returns (Patient memory) {
        return patients[patientId];
    }
}
