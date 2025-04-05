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
export const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
export const contractABI = []; // 放入你的合約ABI