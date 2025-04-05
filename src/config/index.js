export const networkConfig = {
  flowEVM: {
    chainId: "0x221", // 545 in hexadecimal
    chainName: "Flow EVM Testnet",
    nativeCurrency: {
      name: "FLOW",
      symbol: "FLOW",
      decimals: 18
    },
    rpcUrls: ["https://testnet.evm.nodes.onflow.org"],
    blockExplorerUrls: ["https://evm-testnet.flowscan.io"]
  }
};

// 智能合約地址和ABI
export const contractAddress = "0xbb524A42f915fdcaFB6bB4186DE622E88DddfA54"; // Remix Address

export const contractABI = [
  "function mintNFT(address recipient, string memory metadataURI) public returns (uint256)",
  "function totalSupply() public view returns (uint256)",
  "function getTokenIds(address owner) public view returns (uint256[])"
];