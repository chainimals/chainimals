import React, { useState } from 'react';
import './App.css';
import DISCTest from './components/DISCTest';
import WalletConnect from './components/WalletConnect';
import NFTMinter from './components/NFTMinter';

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
    <div className="App p-6 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">DISC NFT Minter</h1>
        <p className="text-gray-600">Take the DISC test and mint your personality as an NFT</p>
      </header>
      
      {currentStep === 'test' && (
        <DISCTest onComplete={handleTestComplete} />
      )}
      
      {currentStep === 'result' && (
        <div className="test-results">
          <h2 className="text-2xl font-bold">Your DISC Results</h2>
          
          <div className="bg-white shadow rounded-lg p-4 mt-4">
            {/* 動物圖片顯示在這裡 */}
            <div className="flex justify-center mb-4">
              <img 
                src={getPersonalityImage(dominantType)} 
                alt={`${dominantType} personality type`} 
                className="w-32 h-32 object-contain"
              />
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg">Your dominant type: <strong className="text-xl">{dominantType}</strong></p>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-medium">
                {dominantType === 'D' ? 'Dominant' : 
                 dominantType === 'I' ? 'Influence' :
                 dominantType === 'S' ? 'Steadiness' :
                 dominantType === 'C' ? 'Conscientiousness' : 'Balanced'}
              </div>
            </div>
            
            <p className="text-gray-700">{getPersonalityDescription(dominantType)}</p>
            
            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-700">Score Distribution:</h3>
              <div className="mt-2">
                {Object.entries(testResults).map(([type, score]) => {
                  // Calculate percentage (assuming max score of 25 per type)
                  const percentage = (score / 25) * 100;
                  return (
                    <div key={type} className="mb-2">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                          type === dominantType ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}>
                          {type}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              {type === 'D' ? 'Dominant' : 
                               type === 'I' ? 'Influence' :
                               type === 'S' ? 'Steadiness' : 'Conscientiousness'}
                            </span>
                            <span className="text-sm font-medium">{score}/25</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                type === dominantType ? 'bg-blue-500' : 'bg-gray-400'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Want to mint this as an NFT?</h3>
            <div className="mt-2">
              <WalletConnect onConnect={handleConnectWallet} />
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentStep('test')}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Retake Test
          </button>
        </div>
      )}
      
      {currentStep === 'mint' && (
        <div>
          <h2 className="text-2xl font-bold">Mint Your DISC NFT</h2>
          
          {/* 在Mint頁面也顯示動物圖片 */}
          <div className="flex justify-center my-4">
            <img 
              src={getPersonalityImage(dominantType)} 
              alt={`${dominantType} personality type`} 
              className="w-24 h-24 object-contain"
            />
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded">
            <p className="font-medium">Your dominant type: <strong>{dominantType}</strong></p>
            <p className="mt-1">{getPersonalityDescription(dominantType)}</p>
          </div>
          
          <div className="mt-2 p-3 bg-green-100 border border-green-300 rounded">
            <p className="text-green-800">
              Connected wallet: {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
            </p>
          </div>
          
          <NFTMinter dominantType={dominantType} signer={signer} walletAddress={walletAddress} />
          
          <div className="mt-6">
            <button 
              onClick={() => setCurrentStep('test')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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