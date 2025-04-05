import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI, IPFS_MAP } from '../config';

function NFTMinter({ dominantType, signer }) {
  const [status, setStatus] = useState('ready'); // 'ready', 'minting', 'success', 'error'
  const [txHash, setTxHash] = useState('');
  const [customCID, setCustomCID] = useState('');
  const [useCustomCID, setUseCustomCID] = useState(false);
  
  // 獲取對應的 IPFS CID
  const defaultCID = IPFS_MAP[dominantType] || IPFS_MAP['balanced'];
  
  async function mintNFT() {
    if (!signer) {
      alert("Please connect your wallet first");
      return;
    }
    
    const cidToUse = useCustomCID ? customCID : defaultCID;
    if (!cidToUse) {
      alert("Invalid IPFS CID");
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
      
      // 調用合約的鑄造方法
      const transaction = await contract.mintNFT(cidToUse);
      setTxHash(transaction.hash);
      
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
      
      <div className="mt-4">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="useCustomCID"
            checked={useCustomCID}
            onChange={(e) => setUseCustomCID(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="useCustomCID">Use custom IPFS CID</label>
        </div>
        
        {useCustomCID ? (
          <input
            type="text"
            value={customCID}
            onChange={(e) => setCustomCID(e.target.value)}
            placeholder="Enter IPFS CID"
            className="w-full p-2 border rounded"
          />
        ) : (
          <div className="p-2 bg-white border rounded">
            <p className="font-mono">{defaultCID}</p>
            <p className="text-sm text-gray-600 mt-1">
              Default IPFS CID for your {dominantType} type
            </p>
          </div>
        )}
      </div>
      
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
