// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

interface ICampaign {
  function startCampaign() external;

  function endCampaign() external;

  function withdraw() external;

  function submitProposal(string calldata _proposalCID) external;

  function acceptProposal(address _artistAddress) external;

  function submitNFT(string calldata _tokenURI) external;

  function buyNFT(
    uint256 tokenId,
    address payable artistAddress,
    uint8 artistSharePercentage,
    uint256 price
  ) external payable;
}
