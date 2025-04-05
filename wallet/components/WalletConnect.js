import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { networkConfig } from '../config';

export default function WalletConnect({ onAccountChange }) {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState('');

  // 檢查是否安裝MetaMask
  const checkIfWalletIsInstalled = () => {
    if (typeof window !== 'undefined') {
      return Boolean(window.ethereum);
    }
    return false;
  };

  // 連接到MetaMask
  async function connectWallet() {
    if (checkIfWalletIsInstalled()) {
      try {
        // 請求帳戶訪問權限
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        
        setAccount(accounts[0]);
        // 將帳戶傳遞給父組件
        if(onAccountChange) onAccountChange(accounts[0]);
        
        setChainId(network.chainId);
        setIsConnected(true);
        
        // 獲取帳戶餘額
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
        
        // 如果不在Flow EVM Testnet上，則切換
        if (network.chainId !== 545) {
          await switchToFlowNetwork();
        }
        
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }
  
  // 切換到Flow EVM Testnet
  async function switchToFlowNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkConfig.flowEVM.chainId }],
      });
    } catch (switchError) {
      // 此錯誤代碼表示鏈尚未添加到MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: networkConfig.flowEVM.chainId,
                chainName: networkConfig.flowEVM.chainName,
                nativeCurrency: networkConfig.flowEVM.nativeCurrency,
                rpcUrls: networkConfig.flowEVM.rpcUrls,
                blockExplorerUrls: networkConfig.flowEVM.blockExplorerUrls,
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding Flow EVM to MetaMask:", addError);
        }
      }
    }
  }

  // 斷開錢包連接(UI用途)
  function disconnectWallet() {
    setAccount('');
    setBalance('');
    setIsConnected(false);
    setChainId('');
    // 通知父組件帳戶已斷開
    if(onAccountChange) onAccountChange('');
  }

  // 監聽帳戶變化
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          // 通知父組件帳戶已變更
          if(onAccountChange) onAccountChange(accounts[0]);
          updateBalance(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        setChainId(parseInt(chainId, 16));
        if (account) {
          updateBalance(account);
        }
      });

      // 組件卸載時清除監聽器
      return () => {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      };
    }
  }, [account, onAccountChange]);

  // 更新餘額輔助函數
  async function updateBalance(address) {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    }
  }

  return (
    <div className="wallet-connect-container" style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>Flow EVM 錢包連接</h2>
      
      {!isConnected ? (
        <button 
          onClick={connectWallet} 
          style={{
            padding: '10px 16px',
            margin: '10px 5px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: '#4CAF50',
            color: 'white'
          }}
        >
          連接錢包
        </button>
      ) : (
        <div className="wallet-info" style={{
          marginTop: '20px',
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p><strong>連接的帳戶:</strong> {account}</p>
          <p><strong>餘額:</strong> {balance} FLOW</p>
          <p><strong>鏈 ID:</strong> {chainId}</p>
          
          <button 
            onClick={switchToFlowNetwork} 
            style={{
              padding: '10px 16px',
              margin: '10px 5px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              backgroundColor: '#2196F3',
              color: 'white'
            }}
          >
            切換到 Flow EVM Testnet
          </button>
          
          <button 
            onClick={disconnectWallet} 
            style={{
              padding: '10px 16px',
              margin: '10px 5px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              backgroundColor: '#f44336',
              color: 'white'
            }}
          >
            斷開連接
          </button>
        </div>
      )}
    </div>
  );
}