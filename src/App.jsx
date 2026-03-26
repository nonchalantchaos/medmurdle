import React, { useState } from "react";

const caseData = {
  complaint: "A 58-year-old man presents with crushing central chest pain for 45 minutes.",
  clues: [
    "Pain radiates to the left arm and jaw.",
    "He is sweating and nauseated.",
    "ECG shows ST elevation in II, III, aVF.",
    "Troponin is elevated."
  ],
  diagnosisOptions: ["GERD", "Inferior STEMI", "Panic attack", "Aortic dissection"],
  correctDiagnosis: "Inferior STEMI"
};

export default function App() {
  const [clueIndex, setClueIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const revealClue = () => {
    if (clueIndex < caseData.clues.length - 1) {
      setClueIndex(clueIndex + 1);
    }
  };

  const checkAnswer = () => {
    setSubmitted(true);
  };

  const reset = () => {
    setClueIndex(0);
    setSelected("");
    setSubmitted(false);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>MedMurdle 🧠</h1>

      <h3>Chief Complaint</h3>
      <p>{caseData.complaint}</p>

      <h3>Clues</h3>
      {caseData.clues.slice(0, clueIndex + 1).map((clue, i) => (
        <p key={i}>• {clue}</p>
      ))}

      <button onClick={revealClue} style={{ marginRight: "10px" }}>
        Reveal Next Clue
      </button>

      <button onClick={reset}>Reset</button>

      <h3>Diagnosis</h3>
      {caseData.diagnosisOptions.map((opt) => (
        <div key={opt}>
          <button
            onClick={() => setSelected(opt)}
            style={{
              background: selected === opt ? "#4caf50" : "#eee",
              margin: "5px",
              padding: "8px",
              border: "none"
            }}
          >
            {opt}
          </button>
        </div>
      ))}

      <br />
      <button onClick={checkAnswer}>Submit</button>

      {submitted && (
        <div>
          <h3>Result</h3>
          {selected === caseData.correctDiagnosis ? (
            <p style={{ color: "green" }}>Correct ✅</p>
          ) : (
            <p style={{ color: "red" }}>Wrong ❌</p>
          )}
          <p>Correct Answer: {caseData.correctDiagnosis}</p>
        </div>
      )}
    </div>
  );
}
