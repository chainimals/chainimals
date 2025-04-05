import React, { useState } from 'react';
import '../styles/DISCTest.css';  // 使用正確的相對路徑

function DISCTest({ onComplete }) {
  const dimensions = ["D", "I", "S", "C"];
  const levels = [
    { label: "Never", value: 1 },
    { label: "Rarely", value: 2 },
    { label: "Sometimes", value: 3 },
    { label: "Often", value: 4 },
    { label: "Always", value: 5 }
  ];

  const questions = {
    D: ["I am assertive, demanding, and decisive.", "I enjoy doing multiple tasks at once.", "I thrive in a challenge-based environment.", "I think about tasks above others or myself.", "I am motivated by accomplishment and authority"],
    I: ["I enjoy influencing and inspiring people.", "I am optimistic about others.", "I tend to be the life of the party.", "I think about motivating people.", "I am motivated by recognition and approval"],
    S: ["I thrive in consistent environments over changing ones.", "I prefer specifics over generalizations.", "I enjoy small groups of people.", "I prefer being a member of a team over leading the team.", "I am motivated by stability and support."],
    C: ["I typically do not take big risks.", "I love tasks, order and details", "I am right most of the time.", "I comply with clearly defined rules.", "I am motivated by quality and correctness."]
  };

  const [answers, setAnswers] = useState({});

  const handleSelect = (dim, idx, score) => {
    setAnswers(prev => ({
      ...prev,
      [`${dim}-${idx}`]: score
    }));
  };

  const handleSubmit = () => {
    // Initialize scores for each dimension
    const result = { D: 0, I: 0, S: 0, C: 0 };
    
    // Calculate the total score for each dimension
    Object.entries(answers).forEach(([key, value]) => {
      const [dim] = key.split("-");
      result[dim] += value;
    });
    
    // Find the dominant type
    let dominantType = 'balanced';
    let maxScore = 0;
    let secondMaxScore = 0;
    
    // First find the maximum score
    for (const [type, score] of Object.entries(result)) {
      if (score > maxScore) {
        secondMaxScore = maxScore;
        maxScore = score;
        dominantType = type;
      } else if (score > secondMaxScore) {
        secondMaxScore = score;
      }
    }
    
    // If the difference between the top two scores is very small,
    // consider it a balanced profile (less than 15% difference)
    const threshold = maxScore * 0.15;
    if (maxScore - secondMaxScore < threshold && maxScore > 0) {
      dominantType = 'balanced';
    }
    
    // Pass results to parent component
    onComplete(result, dominantType);
  };
  
  // Check if the test is completed (all 20 questions answered)
  const totalQuestions = Object.values(questions).reduce((sum, arr) => sum + arr.length, 0);
  const isTestCompleted = Object.keys(answers).length === totalQuestions;

  // Helper to check if a question has been answered
  const isQuestionAnswered = (dim, idx) => {
    return answers[`${dim}-${idx}`] !== undefined;
  };

  return (
    <div className="disc-test">
      <h1 className="text-2xl font-bold text-center">DISC Personality Test</h1>
      
      {dimensions.map((dim) => (
        <div key={dim} className="mt-6">
          <h2 className="text-xl font-semibold mb-2">{dim} dimension</h2>
          {questions[dim].map((q, idx) => {
            const questionKey = `${dim}-${idx}`;
            const isAnswered = isQuestionAnswered(dim, idx);
            
            return (
              <div key={idx} className={`mb-4 p-3 rounded-lg border ${isAnswered ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                <div className="flex items-start">
                  <div className={`mr-2 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isAnswered ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                    {isAnswered ? '✓' : (idx + 1)}
                  </div>
                  <p>{q}</p>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap ml-8">
                  {levels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => handleSelect(dim, idx, level.value)}
                      className={`option-button ${
                        answers[questionKey] === level.value
                          ? "selected-option" 
                          : ""
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="sticky bottom-0 bg-white p-4 border-t mt-6 shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-gray-700 font-medium">
            {Object.keys(answers).length}/{totalQuestions} answered
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isTestCompleted}
            className={`submit-button ${
              isTestCompleted 
                ? "submit-button-active" 
                : "submit-button-disabled"
            }`}
          >
            {isTestCompleted ? "See Results" : "Please Answer All Questions"}
          </button>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default DISCTest;