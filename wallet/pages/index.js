import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// 動態導入錢包連接組件
const WalletConnect = dynamic(
  () => import('../components/WalletConnect'),
  { ssr: false }
);

// 動態導入NFT鑄造組件
const NFTMint = dynamic(
  () => import('../components/NFTMint'),
  { ssr: false }
);

export default function Home() {
  const [account, setAccount] = useState('');

  // 從WalletConnect組件接收連接的帳戶
  function handleAccountChange(newAccount) {
    setAccount(newAccount);
  }

  return (
    <div className="container">
      <Head>
        <title>Flow EVM NFT Minter</title>
        <meta name="description" content="鑄造NFT到Flow EVM網絡" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif' 
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Flow EVM NFT鑄造Demo</h1>
        
        <WalletConnect onAccountChange={setAccount} />
        
        {account && <NFTMint account={account} />}
      </main>
    </div>
  );
}