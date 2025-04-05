// src/components/NFTMinter.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../config';

function NFTMinter({ dominantType, signer, walletAddress }) {
  const [status, setStatus] = useState('ready'); // 'ready', 'minting', 'success', 'error'
  const [txHash, setTxHash] = useState('');
  
  // 根據類型獲取IPFS CID
  const getIPFSForType = (type) => {
    const IPFS_MAP = {
      'D': 'ipfs://bafkreifqhmkydwlg6ff4ffoyos5iijbfgpkcxtuxx2klxmhwze2oe5jqpq',
      'I': 'ipfs://bafkreif2k3egxppjf4y44kvldwtq3htjqafcktkviremsem6lksxwliphi',
      'S': 'ipfs://bafkreifrnaysoffv2ukenuslwxq6a2lqhujlddk5wi6hyrt2jise4aevhi',
      'C': 'ipfs://bafkreihhz24agztfm75ovxgmpvqcftp7n43qvdyvy4bt5di2hdzvjtapga',
      'balanced': 'ipfs://bafkreigaxdczvo6lyoh7hiwvlxlevzaqejq6lx3daj35oaeg5i4fj6lcee'
    };
    return IPFS_MAP[type] || IPFS_MAP['balanced'];
  };
  
  const defaultCID = getIPFSForType(dominantType);
  
  async function mintNFT() {
    if (!signer) {
      alert("Please connect your wallet first");
      return;
    }
    
    setStatus('minting');
    try {
      // 連接到合約
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      
      console.log("Minting NFT to:", walletAddress);
      console.log("With URI:", defaultCID);
      
      // 傳入兩個參數：接收者地址和 URI
      const transaction = await contract.mintNFT(walletAddress, defaultCID);
      
      setTxHash(transaction.hash);
      console.log("Transaction hash:", transaction.hash);
      
      // 等待交易確認
      await transaction.wait();
      
      setStatus('success');
    } catch (error) {
      console.error("Minting failed:", error);
      setStatus('error');
    }
  }
  
  return (
    <div className="nft-minter mt-6 p-4 border rounded bg-gray-50">
      <h3 className="text-xl font-semibold">Mint Your DISC NFT</h3>
      <button
        onClick={mintNFT}
        disabled={status === 'minting'}
        className={`mt-4 px-4 py-2 rounded ${
          status === 'ready' ? 'bg-purple-600 hover:bg-purple-700' :
          status === 'minting' ? 'bg-gray-400 cursor-not-allowed' :
          status === 'success' ? 'bg-green-600' :
          'bg-red-600 hover:bg-red-700'
        } text-white`}
      >
        {status === 'ready' ? 'Mint NFT' :
         status === 'minting' ? 'Minting...' :
         status === 'success' ? 'Minted Successfully!' :
         'Minting Failed - Try Again'}
      </button>
      
      {txHash && (
        <div className="mt-4">
          <p className="text-sm">Transaction Hash:</p>
          <a
            href={`https://evm-testnet.flowscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 break-all font-mono text-sm"
          >
            {txHash}
          </a>
        </div>
      )}
    </div>
  );
}

export default NFTMinter;