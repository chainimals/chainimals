import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// NFT合約ABI - 這是與合約交互所需的介面定義
const contractABI = [
  "function mintNFT(address recipient, string memory tokenURI) public returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)"
];

// 替換為您在Remix部署的合約地址
const contractAddress = "0xc5a7c88Cf583bCA01349Df7e47520F3D8AE7c0D0";

export default function NFTMint({ account }) {
  const [status, setStatus] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nftContract, setNftContract] = useState(null);

  useEffect(() => {
    // 當帳戶連接時初始化合約
    if (account && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setNftContract(contract);
    }
  }, [account]);

  // 鑄造NFT函數
  async function mintNFT() {
    if (!nftContract || !account || !tokenURI) {
      setStatus('請確認你已連接錢包且輸入了Token URI');
      return;
    }

    try {
      setIsLoading(true);
      setStatus('開始鑄造NFT...');
      
      // 呼叫智能合約的mintNFT方法
      const transaction = await nftContract.mintNFT(account, tokenURI);
      setStatus('交易已提交，等待確認...');
      
      // 等待交易完成
      const receipt = await transaction.wait();
      
      // 從事件中獲取tokenId (如果有Transfer事件)
      const transferEvent = receipt.events?.find(event => event.event === 'Transfer');
      const tokenId = transferEvent?.args?.tokenId?.toString() || '未知';
      
      setStatus(`NFT鑄造成功！Token ID: ${tokenId}`);
      setIsLoading(false);
    } catch (error) {
      console.error('鑄造NFT時出錯:', error);
      setStatus(`鑄造失敗: ${error.message}`);
      setIsLoading(false);
    }
  }

  return (
    <div className="nft-mint-container" style={{
      maxWidth: '600px',
      margin: '30px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>鑄造NFT</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          NFT Metadata URI (IPFS 或其他託管的JSON元數據)
        </label>
        <input 
          type="text" 
          value={tokenURI} 
          onChange={(e) => setTokenURI(e.target.value)}
          placeholder="例如: ipfs://QmZ9..."
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
          這個URI應該指向一個符合ERC721元數據標準的JSON文件
        </p>
      </div>

      <button 
        onClick={mintNFT} 
        disabled={!account || isLoading}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          opacity: (!account || isLoading) ? 0.6 : 1
        }}
      >
        {isLoading ? '處理中...' : '鑄造NFT'}
      </button>

      {status && (
        <p style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderLeft: '4px solid #2196F3'
        }}>
          {status}
        </p>
      )}
      
      <div style={{
        marginTop: '30px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>元數據格式指南:</h3>
        <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '4px',
          overflowX: 'auto'
        }}>
{`{
  "name": "NFT名稱",
  "description": "NFT描述",
  "image": "https://...或ipfs://...",
  "attributes": [
    {
      "trait_type": "屬性名稱",
      "value": "屬性值"
    }
  ]
}`}
        </pre>
      </div>
    </div>
  );
}