import React, { useState } from 'react';
import './App.css';
import DISCTest from './components/DISCTest';
import WalletConnect from './components/WalletConnect';
import NFTMinter from './components/NFTMinter';
import './styles/buttons.css';

// 引入所有DISC類型圖片
import discDImage from './assets/images/disc-d.jpg';
import discIImage from './assets/images/disc-i.jpg';
import discSImage from './assets/images/disc-s.jpg';
import discCImage from './assets/images/disc-c.jpg';
import discBalancedImage from './assets/images/disc-balanced.jpg';

function App() {
  const [currentStep, setCurrentStep] = useState('test');
  const [testResults, setTestResults] = useState(null);
  const [dominantType, setDominantType] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [signer, setSigner] = useState(null);
  
  const handleTestComplete = (results, type) => {
    setTestResults(results);
    setDominantType(type);
    setCurrentStep('result');
  };
  
  const handleConnectWallet = (address, signerObj) => {
    setWalletAddress(address);
    setSigner(signerObj);
    setCurrentStep('mint');
  };
  
  const getPersonalityDescription = (type) => {
    switch(type) {
      case 'D':
        return "Dominant: You are direct, decisive, and a problem-solver. You like challenges and taking action.";
      case 'I':
        return "Influence: You are optimistic, outgoing, and social. You enjoy relationships and influencing others.";
      case 'S':
        return "Steadiness: You are patient, loyal, and dependable. You prefer stability and supporting others.";
      case 'C':
        return "Conscientiousness: You are analytical, precise, and systematic. You value quality and accuracy.";
      default:
        return "Balanced: You show a mix of different styles, adapting based on the situation.";
    }
  };
  
  // 根據性格類型獲取對應圖片
  const getPersonalityImage = (type) => {
    switch(type) {
      case 'D':
        return discDImage;
      case 'I':
        return discIImage;
      case 'S':
        return discSImage;
      case 'C':
        return discCImage;
      default:
        return discBalancedImage;
    }
  };
  
  return (
    <div className="App p-6 mx-auto" style={{ maxWidth: "1200px" }}>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">DISC NFT Minter</h1>
        <p className="text-gray-600">Take the DISC test and mint your personality as an NFT</p>
      </header>
      
      {currentStep === 'test' && (
        <DISCTest onComplete={handleTestComplete} />
      )}
      
      {currentStep === 'result' && (
        <div className="test-results">
          <h2 className="text-2xl font-bold mb-6 text-center">Your DISC Results</h2>
          
          {/* 使用直接的內聯樣式來確保左右排列 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* 左側：動物圖片 */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}>
              <img 
                src={getPersonalityImage(dominantType)} 
                alt={`${dominantType} personality type`} 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '450px',
                  objectFit: 'contain',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
            
            {/* 右側：結果與描述 */}
            <div>
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem'
                }}>
                  <p className="text-lg">Your dominant type: <strong className="text-xl">{dominantType}</strong></p>
                  <div style={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontWeight: 500
                  }}>
                    {dominantType === 'D' ? 'Dominant' : 
                     dominantType === 'I' ? 'Influence' :
                     dominantType === 'S' ? 'Steadiness' :
                     dominantType === 'C' ? 'Conscientiousness' : 'Balanced'}
                  </div>
                </div>
                
                <p style={{
                  color: '#374151',
                  marginBottom: '1rem',
                  fontSize: '1.125rem'
                }}>
                  {getPersonalityDescription(dominantType)}
                </p>
                
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#4b5563',
                    marginBottom: '0.75rem'
                  }}>
                    Score Distribution:
                  </h3>
                  <div>
                    {Object.entries(testResults).map(([type, score]) => {
                      // Calculate percentage
                      const percentage = (score / 25) * 100;
                      return (
                        <div key={type} style={{ marginBottom: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '9999px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '0.75rem',
                              backgroundColor: type === dominantType ? '#3b82f6' : '#e5e7eb',
                              color: type === dominantType ? 'white' : 'black'
                            }}>
                              {type}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                marginBottom: '0.25rem'
                              }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                  {type === 'D' ? 'Dominant' : 
                                   type === 'I' ? 'Influence' :
                                   type === 'S' ? 'Steadiness' : 'Conscientiousness'}
                                </span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{score}/25</span>
                              </div>
                              <div style={{ 
                                width: '100%', 
                                backgroundColor: '#e5e7eb',
                                borderRadius: '9999px',
                                height: '0.625rem'
                              }}>
                                <div 
                                  style={{
                                    height: '0.625rem',
                                    borderRadius: '9999px',
                                    backgroundColor: type === dominantType ? '#3b82f6' : '#9ca3af',
                                    width: `${percentage}%`
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: 600,
                    marginBottom: '0.75rem'
                  }}>
                    Want to mint this as an NFT?
                  </h3>
                  <WalletConnect onConnect={handleConnectWallet} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Retake按鈕單獨放在下方居中 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => setCurrentStep('test')}
              className="retake-button"
            >
              Retake Test
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 'mint' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Mint Your DISC NFT</h2>
          
          {/* 使用直接的內聯樣式來確保左右排列 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* 左側：動物圖片 */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}>
              <img 
                src={getPersonalityImage(dominantType)} 
                alt={`${dominantType} personality type`} 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '450px',
                  objectFit: 'contain',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
            
            {/* 右側：NFT鑄造信息 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                padding: '1.25rem',
                backgroundColor: '#dbeafe',
                border: '1px solid #bfdbfe',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <p style={{ fontWeight: 500, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  Your dominant type: <strong>{dominantType}</strong>
                </p>
                <p style={{ color: '#374151' }}>{getPersonalityDescription(dominantType)}</p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#dcfce7',
                border: '1px solid #bbf7d0',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <p style={{ color: '#166534' }}>
                  Connected wallet: {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
                </p>
              </div>
              
              <NFTMinter dominantType={dominantType} signer={signer} walletAddress={walletAddress} />
            </div>
          </div>
          
          {/* Retake按鈕單獨放在下方居中 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => setCurrentStep('test')}
              className="retake-button"
            >
              Retake Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;