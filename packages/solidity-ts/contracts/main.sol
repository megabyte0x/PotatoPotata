// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./campaign.sol";

contract PotatoPotata is Ownable {
  mapping(address => address) campaigns;

  Campaign campaignContract;

  function registerCamapaign() external returns (address) {
    campaignContract = new Campaign();
    campaigns[msg.sender] = address(campaignContract);

    return address(campaignContract);
  }
}
