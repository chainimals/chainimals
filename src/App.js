import React, { useState } from 'react';
import './App.css';
import DISCTest from './components/DISCTest';

function App() {
  const [currentStep, setCurrentStep] = useState('test');
  const [testResults, setTestResults] = useState(null);
  const [dominantType, setDominantType] = useState('');
  
  const handleTestComplete = (results, type) => {
    setTestResults(results);
    setDominantType(type);
    setCurrentStep('result');
    console.log("Test completed:", results, type);
  };
  
  return (
    <div className="App">
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
          <button 
            onClick={() => setCurrentStep('test')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retake Test
          </button>
        </div>
      )}
    </div>
  );
}

export default App;