// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";


contract BlockDoc is Ownable {

    mapping(address => bool) public authorizedProviders;

    event RecordAdded(
        bytes32 indexed patientId,
        bytes32 recordHash,
        address indexed author,
        uint8 recordType,
        uint256 timestamp
    );

    event ProviderAuthorized(address provider);

    event ProviderRevoked(address provider);

    modifier onlyProvider() {
        require(authorizedProviders[msg.sender], "Not authorized");
        _;
    }

    constructor() Ownable(msg.sender) {}

    function setProviderAuthorization(address provider, bool status) external onlyOwner {
        authorizedProviders[provider] = status;
        if (status) {
            emit ProviderAuthorized(provider);
        } else {
            emit ProviderRevoked(provider);
        }
    }

    function addRecord(
        bytes32 patientId,
        bytes32 recordHash,
        uint8 recordType
    ) external onlyProvider {
        require(patientId != bytes32(0), "Invalid patientId");
        require(recordHash != bytes32(0), "Invalid hash");

        emit RecordAdded(
            patientId,
            recordHash,
            msg.sender,
            recordType,
            block.timestamp
        );
    }
}
