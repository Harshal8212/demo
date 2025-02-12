// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeliveryManLogin {
    struct DeliveryMan {
        string email;
        string phoneNumber;
        string vehicleType;
        bytes32 passwordHash;
    }

    DeliveryMan[] private deliveryMen;

    event DeliveryManRegistered(string email, string phoneNumber, string vehicleType);
    event DeliveryManRemoved(string email);

    error EmailAlreadyRegistered(string email);
    error InvalidInput(string message);
    error DeliveryManNotFound(string email);

    function registerDeliveryMan(
        string memory _email,
        string memory _phoneNumber,
        string memory _vehicleType,
        string memory _password
    ) public {
        if (bytes(_email).length == 0) revert InvalidInput("Email cannot be empty");
        if (bytes(_phoneNumber).length == 0) revert InvalidInput("Phone number cannot be empty");
        if (bytes(_vehicleType).length == 0) revert InvalidInput("Vehicle type cannot be empty");
        if (bytes(_password).length == 0) revert InvalidInput("Password cannot be empty");

        if (isEmailRegistered(_email)) revert EmailAlreadyRegistered(_email);

        deliveryMen.push(DeliveryMan({
            email: _email,
            phoneNumber: _phoneNumber,
            vehicleType: _vehicleType,
            passwordHash: keccak256(abi.encodePacked(_password))
        }));

        emit DeliveryManRegistered(_email, _phoneNumber, _vehicleType);
    }

    function validateLogin(string memory _email, string memory _password) public view returns (bool) {
        for (uint i = 0; i < deliveryMen.length; i++) {
            if (keccak256(abi.encodePacked(deliveryMen[i].email)) == keccak256(abi.encodePacked(_email))) {
                return deliveryMen[i].passwordHash == keccak256(abi.encodePacked(_password));
            }
        }
        return false;
    }

    function removeDeliveryManByEmail(string memory _email) public {
        for (uint i = 0; i < deliveryMen.length; i++) {
            if (keccak256(abi.encodePacked(deliveryMen[i].email)) == keccak256(abi.encodePacked(_email))) {
                emit DeliveryManRemoved(_email);
                deliveryMen[i] = deliveryMen[deliveryMen.length - 1];
                deliveryMen.pop();
                return;
            }
        }
        revert DeliveryManNotFound(_email);
    }

    function getAllDeliveryMen() public view returns (DeliveryMan[] memory) {
        return deliveryMen;
    }

    function isEmailRegistered(string memory _email) public view returns (bool) {
        for (uint i = 0; i < deliveryMen.length; i++) {
            if (keccak256(abi.encodePacked(deliveryMen[i].email)) == keccak256(abi.encodePacked(_email))) {
                return true;
            }
        }
        return false;
    }

    function getDeliveryManByEmail(string memory _email) public view returns (string memory, string memory, string memory) {
        for (uint i = 0; i < deliveryMen.length; i++) {
            if (keccak256(abi.encodePacked(deliveryMen[i].email)) == keccak256(abi.encodePacked(_email))) {
                return (deliveryMen[i].email, deliveryMen[i].phoneNumber, deliveryMen[i].vehicleType);
            }
        }
        revert DeliveryManNotFound(_email);
    }
}
