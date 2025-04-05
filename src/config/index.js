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
export const contractAddress = "0xc5a7c88Cf583bCA01349Df7e47520F3D8AE7c0D0";
export const contractABI = [
  // 填入你的合約 ABI
  "function mintNFT(string memory tokenURI) public returns (uint256)",
  // ... 其他函數
];


// 添加到現有的 config 文件中
export const IPFS_MAP = {
  'D': 'ipfs://bafkreigk5mgiax3o43clpgnhmo6pn2i5kkmgxpzfdyan7tix42fvl4xbdu', // 更換為實際的 IPFS CID
  'I': 'ipfs://bafkreigk5mgiax3o43clpgnhmo6pn2i5kkmgxpzfdyan7tix42fvl4xbdu',
  'S': 'ipfs://bafkreigk5mgiax3o43clpgnhmo6pn2i5kkmgxpzfdyan7tix42fvl4xbdu',
  'C': 'ipfs://bafkreigk5mgiax3o43clpgnhmo6pn2i5kkmgxpzfdyan7tix42fvl4xbdu',
  'balanced': 'ipfs://bafkreigk5mgiax3o43clpgnhmo6pn2i5kkmgxpzfdyan7tix42fvl4xbdu'
};