// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdminLogin {
    struct Admin {
        string email;
        string phoneNumber;
        string storeName;
        address walletAddress;
        bytes32 passwordHash;
    }

    Admin[] private admins;

    event AdminRegistered(string email, string phoneNumber, string storeName, address walletAddress);
    event AdminRemoved(string email);

    error EmailAlreadyRegistered(string email);
    error InvalidInput(string message);
    error AdminNotFound(string email);

    function registerAdmin(
        string memory _email,
        string memory _phoneNumber,
        string memory _storeName,
        address _walletAddress,
        string memory _password
    ) public {
        if (bytes(_email).length == 0) revert InvalidInput("Email cannot be empty");
        if (bytes(_phoneNumber).length == 0) revert InvalidInput("Phone number cannot be empty");
        if (bytes(_storeName).length == 0) revert InvalidInput("Store name cannot be empty");
        if (_walletAddress == address(0)) revert InvalidInput("Wallet address cannot be empty");
        if (bytes(_password).length == 0) revert InvalidInput("Password cannot be empty");
        
        if (isEmailRegistered(_email)) revert EmailAlreadyRegistered(_email);

        admins.push(Admin({
            email: _email,
            phoneNumber: _phoneNumber,
            storeName: _storeName,
            walletAddress: _walletAddress,
            passwordHash: keccak256(abi.encodePacked(_password))
        }));

        emit AdminRegistered(_email, _phoneNumber, _storeName, _walletAddress);
    }

    function validateLogin(string memory _email, string memory _password) public view returns (bool) {
        for (uint i = 0; i < admins.length; i++) {
            if (keccak256(abi.encodePacked(admins[i].email)) == keccak256(abi.encodePacked(_email))) {
                return admins[i].passwordHash == keccak256(abi.encodePacked(_password));
            }
        }
        return false;
    }

    function removeAdminByEmail(string memory _email) public {
        for (uint i = 0; i < admins.length; i++) {
            if (keccak256(abi.encodePacked(admins[i].email)) == keccak256(abi.encodePacked(_email))) {
                emit AdminRemoved(_email);
                admins[i] = admins[admins.length - 1];
                admins.pop();
                return;
            }
        }
        revert AdminNotFound(_email);
    }

    function getAllAdmins() public view returns (Admin[] memory) {
        return admins;
    }

    function isEmailRegistered(string memory _email) public view returns (bool) {
        for (uint i = 0; i < admins.length; i++) {
            if (keccak256(abi.encodePacked(admins[i].email)) == keccak256(abi.encodePacked(_email))) {
                return true;
            }
        }
        return false;
    }

    function getAdminByEmail(string memory _email) public view returns (string memory, string memory, string memory, address) {
        for (uint i = 0; i < admins.length; i++) {
            if (keccak256(abi.encodePacked(admins[i].email)) == keccak256(abi.encodePacked(_email))) {
                return (admins[i].email, admins[i].phoneNumber, admins[i].storeName, admins[i].walletAddress);
            }
        }
        revert AdminNotFound(_email);
    }
}
