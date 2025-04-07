import { useState } from 'react'
import './App.css'

function App() {
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
    const result = { D: 0, I: 0, S: 0, C: 0 };
    Object.entries(answers).forEach(([key, value]) => {
      const [dim] = key.split("-");
      result[dim] += value;
    });
    alert(JSON.stringify(result, null, 2));
  };

  return (
    <div className="App p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">DISC </h1>

      {dimensions.map((dim) => (
        <div key={dim}>
          <h2 className="text-xl font-semibold mb-2">{dim} dimension</h2>
          {questions[dim].map((q, idx) => (
            <div key={idx} className="mb-4">
              <p>{q}</p>
              <div className="flex gap-2 mt-1 flex-wrap justify-center">
                {levels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => handleSelect(dim, idx, level.value)}
                    className={`px-3 py-1 border rounded-full ${answers[`${dim}-${idx}`] === level.value
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                      }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        see result
      </button>
    </div>
  );
}

export default App;
