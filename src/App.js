import React, { useState } from 'react';
import './App.css';
import DISCTest from './components/DISCTest';
import WalletConnect from './components/WalletConnect';
import NFTMinter from './components/NFTMinter';

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
          <p className="text-xl">Your dominant type: <strong>{dominantType}</strong></p>
          <p className="mt-2">{getPersonalityDescription(dominantType)}</p>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Detailed Scores:</h3>
            <div className="grid grid-cols-4 gap-4 mt-2">
              {Object.entries(testResults).map(([type, score]) => (
                <div 
                  key={type} 
                  className={`p-4 rounded-lg text-center ${
                    type === dominantType ? 'bg-blue-100 border-blue-300 border' : 'bg-gray-100'
                  }`}
                >
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-lg">{type}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
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