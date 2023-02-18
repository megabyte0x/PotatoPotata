// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Campaign.sol";

contract PotatoPotata is Ownable {
  mapping(address => CampaignDetails) campaigns;

  struct CampaignDetails {
    address campaignAddress;
    string ipfsUrl;
  }

  mapping(address => string) campaignUrls;

  Campaign campaignContract;

  function registerCamapaign(string calldata ipfsUrl) external returns (address) {
    campaignContract = new Campaign();
    campaigns[msg.sender].campaignAddress = address(campaignContract);
    campaigns[msg.sender].ipfsUrl = ipfsUrl;

    return address(campaignContract);
  }
}
