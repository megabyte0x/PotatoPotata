// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Campaign.sol";

contract PotatoPotata is Ownable {
  mapping(address => address[]) campaigns;

  Campaign campaignContract;

  function registerCamapaign(
    string memory _name,
    string memory _descriptionCID,
    string memory _imageCID
  ) external returns (address) {
    campaignContract = new Campaign(_name, _descriptionCID, _imageCID);
    campaigns[msg.sender].push(address(campaignContract));

    return address(campaignContract);
  }

  function getCampaignAddress(address _address) external view returns (address[] memory) {
    return campaigns[_address];
  }
}
