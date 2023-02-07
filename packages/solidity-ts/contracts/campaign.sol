// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract campaign {
  address admin;

  CampaignStatus campaignStatus = CampaignStatus.NOT_LIVE;

  mapping(address => string) public proposals;
  mapping(address => bool) public artists;

  enum CampaignStatus {
    NOT_LIVE,
    LIVE,
    ENDED
  }

  constructor(address _admin) {
    admin = _admin;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, "ERR:NA");
    _;
  }

  modifier onlyLiveStatus() {
    require(campaignStatus == CampaignStatus(uint256(1)), "ERR:NL");
    _;
  }

  modifier onlyNotLiveStatus() {
    require(campaignStatus == CampaignStatus(uint8(0)), "ERR:LE");
    _;
  }

  modifier onlyApprovedArtist() {
    require(artists[msg.sender], "ERR:NA");
    _;
  }

  function startCampaign() external onlyAdmin {
    campaignStatus = CampaignStatus.LIVE;
  }

  function endCampaign() external onlyAdmin {
    campaignStatus = CampaignStatus.ENDED;
  }

  function withdraw() external onlyAdmin {
    require(address(this).balance > 0, "ERR:ZB");

    (bool success, ) = msg.sender.call{ value: address(this).balance }("");
    require(success, "ERR:OW");
  }

  function submitProposal(string calldata _proposalCID, address _artistAddress) external onlyNotLiveStatus {
    proposals[_artistAddress] = _proposalCID;
  }

  function submitNFT(string calldata _tokenURI) external onlyLiveStatus onlyApprovedArtist {}

  function buyNFT(uint256 tokenId) external payable onlyLiveStatus {}
}
