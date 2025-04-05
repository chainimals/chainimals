import React, { useState } from 'react';
import './App.css';
import DISCTest from './components/DISCTest';
import WalletConnect from './components/WalletConnect';

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
    console.log("Wallet connected:", address);
    alert(`Wallet connected: ${address}`);
  };
  
  return (
    <div className="App p-6 max-w-3xl mx-auto">
      {currentStep === 'test' && (
        <DISCTest onComplete={handleTestComplete} />
      )}
      
      {currentStep === 'result' && (
        <div className="test-results">
          <h2 className="text-2xl font-bold">Your DISC Results</h2>
          <p className="text-xl">Your dominant type: <strong>{dominantType}</strong></p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Scores:</h3>
            <ul>
              {Object.entries(testResults).map(([type, score]) => (
                <li key={type} className="mb-2">
                  {type}: {score} {type === dominantType ? '(Dominant)' : ''}
                </li>
              ))}
            </ul>
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
      
      {walletAddress && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
          <p className="text-green-800">
            Connected wallet: {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;