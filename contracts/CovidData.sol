// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserCovidManagement {
    struct User {
        string username;
        address userAddress;
        bool isRegistered;
    }

    struct CovidData {
        uint id;
        string idPasien;
        string hasilTes;
        string tanggalTes;
        string statusVaksinasi;
        address owner;
    }

    mapping(address => User) public users;
    mapping(uint => CovidData) public covidRecords;
    uint public covidDataCount; // Konsisten dengan nama ini

    event UserRegistered(address userAddress, string username);
    event CovidDataAdded(uint id, string idPasien, string hasilTes, string tanggalTes, string statusVaksinasi, address owner);
    event CovidDataUpdated(uint id, string idPasien, string hasilTes, string tanggalTes, string statusVaksinasi);
    event CovidDataDeleted(uint id);

    // Register a new user
    function registerUser(string memory _username) public {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = User(_username, msg.sender, true);
        emit UserRegistered(msg.sender, _username); // Log alamat
    }

    function isUserRegistered(address _user) public view returns (bool) {
        return users[_user].isRegistered;
    }

    // Get Covid data by idPasien
    function getCovidDataByIdPasien(string memory _idPasien) public view returns (CovidData memory) {
        for (uint i = 1; i <= covidDataCount; i++) {
            if (keccak256(abi.encodePacked(covidRecords[i].idPasien)) == keccak256(abi.encodePacked(_idPasien))) {
                return covidRecords[i];
            }
        }
        revert("Data not found for the given idPasien");
    }


    // Add Covid data
    function addCovidData(string memory _idPasien, string memory _hasilTes, string memory _tanggalTes, string memory _statusVaksinasi) public {
        require(users[msg.sender].isRegistered, "User not registered");
        covidDataCount++; // Increment counter
        covidRecords[covidDataCount] = CovidData(covidDataCount, _idPasien, _hasilTes, _tanggalTes, _statusVaksinasi, msg.sender);
        emit CovidDataAdded(covidDataCount, _idPasien, _hasilTes, _tanggalTes, _statusVaksinasi, msg.sender);
    }

    // Get all Covid data
    function getAllCovidData() public view returns (CovidData[] memory) {
        require(covidDataCount > 0, "No data available.");
        CovidData[] memory allData = new CovidData[](covidDataCount);
        for (uint i = 1; i <= covidDataCount; i++) {
            CovidData memory record = covidRecords[i];
            allData[i - 1] = record;
        }
        return allData;
    }

    // Update Covid data
    function updateCovidData(uint _id, string memory _idPasien, string memory _hasilTes, string memory _tanggalTes, string memory _statusVaksinasi) public {
        require(covidRecords[_id].owner == msg.sender, "You are not the owner of this data");
        CovidData storage data = covidRecords[_id];
        data.idPasien = _idPasien;
        data.hasilTes = _hasilTes;
        data.tanggalTes = _tanggalTes;
        data.statusVaksinasi = _statusVaksinasi;
        emit CovidDataUpdated(_id, _idPasien, _hasilTes, _tanggalTes, _statusVaksinasi);
    }

    // Delete Covid data
    function deleteCovidData(uint _id) public {
        require(covidRecords[_id].owner == msg.sender, "You are not the owner of this data");
        delete covidRecords[_id];
        emit CovidDataDeleted(_id);
    }
}
