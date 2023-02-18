// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Campaign.sol";

contract PotatoPotata is Ownable {
  mapping(address => address[]) campaignsPerAddr;
  address[] campaigns;

  Campaign campaignContract;

  function registerCamapaign(
    string memory _name,
    string memory _descriptionCID,
    string memory _imageCID
  ) external returns (address) {
    campaignContract = new Campaign(_name, _descriptionCID, _imageCID);
    campaignsPerAddr[msg.sender].push(address(campaignContract));
    campaigns.push(address(campaignContract));
    return address(campaignContract);
  }

  function getCampaigns() external view returns (address[] memory) {
    return campaigns;
  }

  function getCampaignAddress(address _address) external view returns (address[] memory) {
    return campaignsPerAddr[_address];
  }
}
