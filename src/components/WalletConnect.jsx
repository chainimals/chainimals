import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { networkConfig } from '../config';

function WalletConnect({ onConnect }) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  
  async function connectWallet() {
    setConnecting(true);
    setError('');
    
    try {
      const web3Modal = new Web3Modal({
        network: "testnet",
        cacheProvider: false,
      });
      
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      
      // 檢查網絡是否是 Flow EVM Testnet
      const network = await provider.getNetwork();
      if (network.chainId !== parseInt(networkConfig.flowEVM.chainId, 16)) {
        // 嘗試切換網絡
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networkConfig.flowEVM.chainId }],
          });
        } catch (switchError) {
          // 如果網絡不存在，則添加網絡
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [networkConfig.flowEVM],
              });
            } catch (addError) {
              throw new Error('Could not add network. Please add Flow EVM Testnet manually.');
            }
          } else {
            throw new Error('Could not switch to Flow EVM Testnet.');
          }
        }
        
        // 重新獲取提供者和網絡
        provider = new ethers.providers.Web3Provider(connection);
      }
      
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      onConnect(address, signer);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setConnecting(false);
    }
  }
  
  return (
    <div>
      <button 
        onClick={connectWallet}
        disabled={connecting}
        className={`px-4 py-2 rounded ${
          connecting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white`}
      >
        {connecting ? "Connecting..." : "Connect Wallet"}
      </button>
      
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}

export default WalletConnect;