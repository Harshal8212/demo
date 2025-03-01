// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    enum ShipmentStatus { PENDING, PICK_UP,  IN_TRANSIT, DELIVERED }

    struct Shipment {
        uint256 id; // Unique shipment ID (index in array)
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        string start;
        string destination;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(uint256 => string) public shipmentToDeliveryPerson;

    Shipment[] public allShipments; // Global storage for all shipments
    uint256 public shipmentCount; // Auto-increment ID

    event ShipmentCreated(uint256 indexed id, address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price, string start, string destination);
    event ShipmentInTransit(uint256 indexed id, address indexed sender, address indexed receiver);
    event ShipmentDelivered(uint256 indexed id, address indexed sender, address indexed receiver, uint256 deliveryTime);
    event ShipmentPaid(uint256 indexed id, address indexed sender, address indexed receiver, uint256 amount);
    event ShipmentPickedUp(uint256 indexed id, string deliveryPerson);

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(
        address _receiver,
        uint256 _pickupTime,
        uint256 _distance,
        uint256 _price,
        string memory _start,
        string memory _destination
    ) public payable {
        require(msg.value == _price, "Payment amount must match the price.");

        Shipment memory shipment = Shipment(
            shipmentCount, // Unique ID
            msg.sender, 
            _receiver, 
            _pickupTime, 
            0, 
            _distance, 
            _price, 
            _start, 
            _destination, 
            ShipmentStatus.PENDING, 
            false
        );

        allShipments.push(shipment);
        emit ShipmentCreated(shipmentCount, msg.sender, _receiver, _pickupTime, _distance, _price, _start, _destination);
        shipmentCount++;
    }

    function startShipment(uint256 _id) public {
        require(_id < allShipments.length, "Invalid shipment ID.");

        Shipment storage shipment = allShipments[_id];
        require(shipment.status == ShipmentStatus.PENDING, "Shipment already in transit.");

        shipment.status = ShipmentStatus.PICK_UP;

        emit ShipmentInTransit(_id, shipment.sender, shipment.receiver);
    }

    function completeShipment(uint256 _id) public {
        require(_id < allShipments.length, "Invalid shipment ID.");

        Shipment storage shipment = allShipments[_id];

        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment not in transit.");
        require(!shipment.isPaid, "Shipment already paid.");

        shipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;

        payable(shipment.sender).transfer(shipment.price);
        shipment.isPaid = true;

        emit ShipmentDelivered(_id, shipment.sender, shipment.receiver, shipment.deliveryTime);
        emit ShipmentPaid(_id, shipment.sender, shipment.receiver, shipment.price);
    }

    function getShipment(uint256 _id) public view returns (
        uint256, address, address, uint256, uint256, uint256, uint256, string memory, string memory, ShipmentStatus, bool
    ) {
        require(_id < allShipments.length, "Invalid shipment ID.");
        Shipment memory shipment = allShipments[_id];

        return (
            shipment.id,
            shipment.sender,
            shipment.receiver,
            shipment.pickupTime,
            shipment.deliveryTime,
            shipment.distance,
            shipment.price,
            shipment.start,
            shipment.destination,
            shipment.status,
            shipment.isPaid
        );
    }

    function getAllTransactions() public view returns (Shipment[] memory) {
        return allShipments;
    }

    function getShipmentsCount() public view returns (uint256) {
        return allShipments.length;
    }

    function pickUpShipment(uint256 _id, string memory _deliveryPersonEmail) public {
        require(_id < allShipments.length, "Invalid shipment ID.");
        
        Shipment storage shipment = allShipments[_id];
        require(shipment.status == ShipmentStatus.PICK_UP, "Shipment is not available for pickup.");
        
        shipment.status = ShipmentStatus.IN_TRANSIT;
        shipmentToDeliveryPerson[_id] = _deliveryPersonEmail;

        emit ShipmentPickedUp(_id, _deliveryPersonEmail);
    }

    
    function getShipmentsByDeliveryPerson(string memory _deliveryPersonEmail) public view returns (Shipment[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < allShipments.length; i++) {
            if (keccak256(abi.encodePacked(shipmentToDeliveryPerson[i])) == keccak256(abi.encodePacked(_deliveryPersonEmail))) {
                count++;
            }
        }

        Shipment[] memory shipments = new Shipment[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < allShipments.length; i++) {
            if (keccak256(abi.encodePacked(shipmentToDeliveryPerson[i])) == keccak256(abi.encodePacked(_deliveryPersonEmail))) {
                shipments[index] = allShipments[i];
                index++;
            }
        }

        return shipments;
    }
}
