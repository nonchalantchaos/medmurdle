import { useState, useEffect } from "react";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=Lora:ital,wght@0,400;0,600;1,400&display=swap";

const caseData = {
  number: "XLII",
  specialty: "Cardiology",
  difficulty: 2,
  title: "The Man Who Clutched His Chest Upon the Morning Bus",
  date: "28th March 2026",
  complaint:
    "A 58-year-old gentleman presents to the emergency department with crushing central chest pain of 45 minutes' duration, clutching his left arm and unable to speak in full sentences.",
  clues: [
    "The pain radiates to the left arm and jaw, worsening with no relieving factors.",
    "He is diaphoretic and nauseated, pale as a ghost.",
    "The ECG reveals ST elevation in leads II, III, and aVF — the inferior territory.",
    "Troponin returns markedly elevated at 2.4 ng/mL, confirming myocardial injury.",
  ],
  diagnosis: {
    question: "What ails this patient?",
    options: ["GERD", "Inferior STEMI", "Panic Attack", "Aortic Dissection"],
    correct: "Inferior STEMI",
    correctExplanation:
      "Correct — the inferior ST elevation pattern with raised troponin confirms an Inferior STEMI, caused by occlusion of the right coronary artery.",
    wrongExplanation:
      "Incorrect. The inferior ST elevation (leads II, III, aVF) with elevated troponin and classic radiation pattern points to an Inferior STEMI.",
  },
  investigation: {
    question: "What test confirms it?",
    options: [
      "Chest X-ray",
      "12-lead ECG + Troponin",
      "Endoscopy",
      "CT Pulmonary Angiogram",
    ],
    correct: "12-lead ECG + Troponin",
    correctExplanation:
      "Correct — a 12-lead ECG showing inferior ST elevation combined with a positive troponin is the gold standard for diagnosing STEMI.",
    wrongExplanation:
      "Incorrect. In suspected STEMI, the immediate investigation is a 12-lead ECG and serial troponins — time is myocardium.",
  },
  management: {
    question: "How do you treat it?",
    options: [
      "Antacids + lifestyle advice",
      "Aspirin + PCI within 90 min",
      "Reassure + anxiolytics",
      "Aortic surgery consult",
    ],
    correct: "Aspirin + PCI within 90 min",
    correctExplanation:
      "Correct — dual antiplatelet therapy and primary PCI within 90 minutes is the definitive management for STEMI.",
    wrongExplanation:
      "Incorrect. STEMI demands urgent reperfusion: aspirin loading dose and primary PCI within 90 minutes. Every minute of delay costs myocardium.",
  },
  explanation: {
    title: "Inferior ST-Elevation Myocardial Infarction",
    body: "This patient presents with a classic inferior STEMI caused by occlusion of the right coronary artery (RCA). The inferior ST elevation in leads II, III, and aVF, combined with radiation to the jaw, diaphoresis, and elevated troponin, leaves little diagnostic ambiguity.",
    keyPoints: [
      "Inferior STEMI = ST elevation in II, III, aVF → suspect RCA occlusion",
      "Always request a right-sided ECG to rule out right ventricular infarction",
      "Primary PCI within 90 minutes is the gold-standard reperfusion strategy",
      "Avoid nitrates if right ventricular involvement is suspected — risk of profound hypotension",
    ],
  },
};

const LETTERS = ["A", "B", "C", "D"];
const ROMAN = ["I", "II", "III", "IV"];

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #b8a080;
    font-family: 'Lora', serif;
    min-height: 100vh;
  }

  .page-wrap {
    background: #b8a080;
    min-height: 100vh;
    padding: 0 0 60px;
  }

  .page {
    background: #f5edd6;
    max-width: 700px;
    margin: 0 auto;
    border-left: 4px double #8b6f47;
    border-right: 4px double #8b6f47;
    position: relative;
  }

  .page::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 27px,
      rgba(139,111,71,0.06) 27px,
      rgba(139,111,71,0.06) 28px
    );
    pointer-events: none;
    z-index: 0;
  }

  .page > * { position: relative; z-index: 1; }

  /* ── HEADER ── */
  .header {
    background: #2c1810;
    border-bottom: 6px double #8b6f47;
    text-align: center;
  }

  .header-inner { padding: 20px 24px 14px; }

  .header-ornament {
    color: #c8a96e;
    font-size: 13px;
    letter-spacing: 8px;
    margin-bottom: 6px;
  }

  .header-title {
    font-family: 'IM Fell English SC', serif;
    font-size: 46px;
    color: #f5edd6;
    letter-spacing: 4px;
    line-height: 1;
    text-shadow: 2px 2px 0 #000;
  }

  .header-subtitle {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    color: #c8a96e;
    font-size: 14px;
    margin-top: 8px;
    letter-spacing: 1px;
  }

  .header-rule {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 9px 24px;
    background: #3d2415;
    color: #c8a96e;
    font-family: 'IM Fell English SC', serif;
    font-size: 11px;
    letter-spacing: 3px;
  }

  /* ── STREAK BAR ── */
  .streak-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 28px;
    background: #ede0c0;
    border-bottom: 2px solid #8b6f47;
  }

  .streak-text {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 14px;
    color: #5c3d1e;
  }

  .streak-text strong {
    font-style: normal;
    color: #8b2020;
  }

  .case-num {
    font-family: 'IM Fell English SC', serif;
    font-size: 13px;
    color: #8b6f47;
    letter-spacing: 2px;
  }

  /* ── BODY ── */
  .body { padding: 28px 32px; }

  /* ── DOSSIER ── */
  .dossier {
    border: 3px double #8b6f47;
    background: #fdf6e3;
    margin-bottom: 24px;
    position: relative;
  }

  .dossier::after {
    content: '';
    position: absolute;
    inset: 5px;
    border: 1px solid rgba(139,111,71,0.25);
    pointer-events: none;
  }

  .dossier-head {
    background: #2c1810;
    padding: 11px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dossier-label {
    font-family: 'IM Fell English SC', serif;
    font-size: 11px;
    letter-spacing: 4px;
    color: #c8a96e;
  }

  .dossier-stamp {
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    color: #8b6f47;
    letter-spacing: 2px;
    border: 1px solid #8b6f47;
    padding: 2px 8px;
  }

  .dossier-body { padding: 20px 24px; }

  .specialty-wrap { text-align: center; margin-bottom: 14px; }

  .specialty-tag {
    display: inline-block;
    background: #8b2020;
    color: #f5edd6;
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    letter-spacing: 3px;
    padding: 4px 16px;
    border: 1px solid #5c1414;
  }

  .difficulty {
    font-family: 'IM Fell English', serif;
    font-size: 13px;
    color: #8b6f47;
    text-align: center;
    margin-bottom: 12px;
  }

  .case-title {
    font-family: 'IM Fell English', serif;
    font-size: 22px;
    color: #2c1810;
    line-height: 1.4;
    text-align: center;
    margin-bottom: 6px;
  }

  .case-meta {
    text-align: center;
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 12px;
    color: #8b6f47;
    margin-bottom: 18px;
    letter-spacing: 0.5px;
  }

  /* ── DIVIDER ── */
  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 16px 0;
    color: #8b6f47;
    font-size: 14px;
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #c4a97d;
  }

  /* ── COMPLAINT ── */
  .complaint-box {
    background: #fdf0d0;
    border: 1px solid #c4a97d;
    border-left: 4px solid #8b2020;
    padding: 16px 18px;
    margin-bottom: 20px;
  }

  .complaint-label {
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    letter-spacing: 3px;
    color: #8b2020;
    margin-bottom: 8px;
  }

  .complaint-text {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 17px;
    line-height: 1.65;
    color: #2c1810;
  }

  /* ── CLUES ── */
  .clues-label {
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    letter-spacing: 3px;
    color: #5c3d1e;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .clues-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #c4a97d;
  }

  .clue-row {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 11px 0;
    border-bottom: 1px dashed #c4a97d;
    animation: fadeUp 0.45s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .clue-bullet {
    width: 22px;
    height: 22px;
    border: 2px solid #8b6f47;
    background: #f0e4c4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    color: #5c3d1e;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .clue-text {
    font-size: 15px;
    line-height: 1.6;
    color: #2c1810;
  }

  .clue-progress {
    text-align: center;
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 12px;
    color: #8b6f47;
    margin-top: 10px;
  }

  .reveal-btn {
    width: 100%;
    margin-top: 14px;
    padding: 13px;
    background: transparent;
    border: 2px dashed #8b6f47;
    color: #5c3d1e;
    font-family: 'IM Fell English SC', serif;
    font-size: 13px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .reveal-btn:hover:not(:disabled) {
    background: #f0e4c4;
    border-color: #5c3d1e;
    color: #2c1810;
  }

  .reveal-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* ── VERDICT SECTION ── */
  .verdict-section { margin-top: 28px; }

  .verdict-intro {
    text-align: center;
    font-family: 'IM Fell English SC', serif;
    font-size: 20px;
    letter-spacing: 4px;
    color: #2c1810;
    margin-bottom: 6px;
  }

  .verdict-intro-sub {
    text-align: center;
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 14px;
    color: #8b6f47;
    margin-bottom: 22px;
  }

  /* ── ANSWER CARD ── */
  .answer-card {
    border: 3px double #8b6f47;
    background: #fdf6e3;
    margin-bottom: 18px;
    position: relative;
  }

  .answer-card::after {
    content: '';
    position: absolute;
    inset: 5px;
    border: 1px solid rgba(139,111,71,0.2);
    pointer-events: none;
  }

  .card-head {
    background: #2c1810;
    padding: 10px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .card-icon {
    width: 28px;
    height: 28px;
    border: 1px solid #c8a96e;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    color: #c8a96e;
  }

  .card-title {
    font-family: 'IM Fell English SC', serif;
    font-size: 14px;
    letter-spacing: 3px;
    color: #f5edd6;
  }

  .card-question {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 12px;
    color: #c8a96e;
    margin-left: auto;
  }

  .card-body { padding: 16px 18px 18px; }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 14px;
  }

  .opt {
    border: 2px solid #c4a97d;
    background: #fdf0d0;
    padding: 13px 14px;
    cursor: pointer;
    font-family: 'Lora', serif;
    font-size: 14px;
    line-height: 1.4;
    color: #2c1810;
    transition: all 0.18s;
    text-align: left;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .opt:hover:not(:disabled) {
    background: #f0e4c4;
    border-color: #8b6f47;
  }

  .opt.selected {
    background: #3d2415;
    border-color: #2c1810;
    color: #f5edd6;
  }

  .opt.selected .opt-letter {
    background: #c8a96e;
    color: #2c1810;
    border-color: #c8a96e;
  }

  .opt.correct-opt {
    background: #1a3d1a;
    border-color: #2d6b2d;
    color: #d4f0d4;
    cursor: default;
  }

  .opt.correct-opt .opt-letter {
    background: #2d6b2d;
    color: #d4f0d4;
    border-color: #2d6b2d;
  }

  .opt.wrong-opt {
    background: #3d1a1a;
    border-color: #8b2020;
    color: #f0d4d4;
    cursor: default;
  }

  .opt.wrong-opt .opt-letter {
    background: #8b2020;
    color: #f0d4d4;
    border-color: #8b2020;
  }

  .opt-letter {
    width: 22px;
    height: 22px;
    border: 1px solid #8b6f47;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IM Fell English SC', serif;
    font-size: 11px;
    color: #8b6f47;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* ── INLINE VERDICT ── */
  .inline-verdict {
    border: 2px solid;
    padding: 13px 15px;
    animation: fadeUp 0.4s ease;
    margin-top: 4px;
  }

  .inline-verdict.correct-verdict {
    border-color: #2d6b2d;
    background: #eaf5ea;
  }

  .inline-verdict.wrong-verdict {
    border-color: #8b2020;
    background: #faeaea;
  }

  .iv-label {
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    letter-spacing: 3px;
    margin-bottom: 6px;
  }

  .correct-verdict .iv-label { color: #2d6b2d; }
  .wrong-verdict .iv-label   { color: #8b2020; }

  .iv-text {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 14px;
    line-height: 1.6;
    color: #2c1810;
  }

  /* ── SUBMIT ── */
  .submit-row {
    text-align: center;
    margin-top: 28px;
    padding-top: 22px;
    border-top: 2px double #8b6f47;
  }

  .submit-main-btn {
    background: #8b2020;
    border: 2px solid #5c1414;
    color: #f5edd6;
    font-family: 'IM Fell English SC', serif;
    font-size: 15px;
    letter-spacing: 3px;
    padding: 14px 44px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .submit-main-btn:hover:not(:disabled) {
    background: #a32525;
  }

  .submit-main-btn:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }

  .submit-hint {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 13px;
    color: #8b6f47;
    margin-top: 10px;
  }

  /* ── RESULT SCREEN ── */
  .result-screen { animation: fadeUp 0.5s ease; }

  .result-header { text-align: center; margin-bottom: 26px; }

  .result-ornament {
    font-size: 20px;
    letter-spacing: 14px;
    color: #8b6f47;
    margin-bottom: 12px;
  }

  .result-title {
    font-family: 'IM Fell English SC', serif;
    font-size: 30px;
    letter-spacing: 4px;
    color: #2c1810;
    margin-bottom: 4px;
  }

  .result-sub {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 15px;
    color: #5c3d1e;
  }

  .score-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 22px 0;
  }

  .score-box {
    border: 3px double #8b6f47;
    text-align: center;
    padding: 16px 10px;
    background: #fdf6e3;
    position: relative;
  }

  .score-box::after {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid rgba(139,111,71,0.2);
    pointer-events: none;
  }

  .score-box.sb-correct { background: #eaf5ea; border-color: #2d6b2d; }
  .score-box.sb-wrong   { background: #faeaea; border-color: #8b2020; }

  .sb-icon  { font-size: 20px; margin-bottom: 6px; }
  .sb-label {
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    letter-spacing: 3px;
    color: #8b6f47;
    margin-bottom: 6px;
  }
  .sb-correct .sb-label { color: #2d6b2d; }
  .sb-wrong   .sb-label { color: #8b2020; }
  .sb-answer {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 13px;
    color: #2c1810;
    line-height: 1.4;
  }

  /* ── EXPLANATION ── */
  .explanation-box {
    border: 2px solid #c4a97d;
    background: #fdf0d0;
    padding: 20px 22px;
    margin: 20px 0;
  }

  .exp-label {
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    letter-spacing: 3px;
    color: #5c3d1e;
    margin-bottom: 10px;
  }

  .exp-title {
    font-family: 'IM Fell English', serif;
    font-size: 20px;
    color: #2c1810;
    margin-bottom: 10px;
  }

  .exp-body {
    font-size: 15px;
    line-height: 1.75;
    color: #3d2415;
  }

  .key-points {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px dashed #c4a97d;
  }

  .kp-label {
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    letter-spacing: 3px;
    color: #8b2020;
    margin-bottom: 10px;
  }

  .kp-item {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.55;
    color: #2c1810;
  }

  .kp-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #8b2020;
    flex-shrink: 0;
    margin-top: 7px;
  }

  /* ── STATS ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 18px 0;
  }

  .stat-box {
    text-align: center;
    border: 1px solid #c4a97d;
    padding: 14px 8px;
    background: #fdf6e3;
  }

  .stat-num {
    font-family: 'IM Fell English SC', serif;
    font-size: 28px;
    color: #2c1810;
    margin-bottom: 4px;
  }

  .stat-label {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 12px;
    color: #8b6f47;
  }

  /* ── ACTIONS ── */
  .actions-row {
    display: flex;
    gap: 12px;
    margin-top: 22px;
  }

  .btn-share {
    flex: 1;
    background: #2c1810;
    border: 2px solid #8b6f47;
    color: #f5edd6;
    font-family: 'IM Fell English SC', serif;
    font-size: 13px;
    letter-spacing: 3px;
    padding: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-share:hover { background: #3d2415; border-color: #c8a96e; }

  .btn-archive {
    flex: 1;
    background: transparent;
    border: 2px solid #8b6f47;
    color: #2c1810;
    font-family: 'IM Fell English SC', serif;
    font-size: 13px;
    letter-spacing: 3px;
    padding: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-archive:hover { background: #f0e4c4; }

  .copied-msg {
    text-align: center;
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 13px;
    color: #2d6b2d;
    margin-top: 8px;
    height: 20px;
  }

  /* ── NEXT CASE ── */
  .next-case {
    text-align: center;
    margin-top: 20px;
    padding: 18px;
    border: 1px dashed #c4a97d;
    background: #fdf0d0;
  }

  .next-label {
    font-family: 'IM Fell English SC', serif;
    font-size: 10px;
    letter-spacing: 3px;
    color: #8b6f47;
    margin-bottom: 8px;
  }

  .countdown {
    font-family: 'IM Fell English SC', serif;
    font-size: 30px;
    color: #2c1810;
    letter-spacing: 4px;
  }

  .next-sub {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 13px;
    color: #8b6f47;
    margin-top: 6px;
  }

  /* ── FOOTER ── */
  .footer-ornament {
    text-align: center;
    padding: 20px;
    color: #8b6f47;
    font-size: 16px;
    letter-spacing: 10px;
    border-top: 2px double #8b6f47;
  }
`;

function useCountdown() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const [revealedCount, setRevealedCount] = useState(1);
  const [selections, setSelections] = useState({ dx: null, ix: null, mx: null });
  const [submitted, setSubmitted] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const countdown = useCountdown();

  const allSelected = selections.dx && selections.ix && selections.mx;

  const cardConfigs = [
    { key: "dx", icon: "♥", title: "Diagnosis", data: caseData.diagnosis },
    { key: "ix", icon: "🔬", title: "Investigation", data: caseData.investigation },
    { key: "mx", icon: "⚕", title: "Management", data: caseData.management },
  ];

  const scoreCount = submitted
    ? cardConfigs.filter((c) => selections[c.key] === c.data.correct).length
    : 0;

  function handleSelect(cardKey, option) {
    if (submitted) return;
    setSelections((prev) => ({ ...prev, [cardKey]: option }));
  }

  function handleSubmit() {
    if (!allSelected || submitted) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleShare() {
    const dx = selections.dx === caseData.diagnosis.correct ? "✅" : "❌";
    const ix = selections.ix === caseData.investigation.correct ? "✅" : "❌";
    const mx = selections.mx === caseData.management.correct ? "✅" : "❌";
    const text = `MedMurdle — Case No. ${caseData.number}\n\nDiagnosis:     ${dx}\nInvestigation: ${ix}\nManagement:    ${mx}\n\nScore: ${scoreCount}/3  |  Streak: 🔥 3 days\n\nmedmurdle.netlify.app`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 3000);
    });
  }

  const stars = "★".repeat(caseData.difficulty) + "☆".repeat(3 - caseData.difficulty);

  return (
    <>
      <style>{`@import url('${GOOGLE_FONTS_URL}');${styles}`}</style>
      <div className="page-wrap">
        <div className="page">

          {/* ── HEADER ── */}
          <div className="header">
            <div className="header-inner">
              <div className="header-ornament">✦ ✦ ✦</div>
              <div className="header-title">MedMurdle</div>
              <div className="header-subtitle">Daily Medical Mystery — Can You Diagnose It?</div>
            </div>
            <div className="header-rule">
              ✦ &nbsp; DIAGNOSIS · INVESTIGATION · MANAGEMENT &nbsp; ✦
            </div>
          </div>

          {/* ── STREAK BAR ── */}
          <div className="streak-bar">
            <div className="streak-text">🔥 Streak: <strong>3</strong> days</div>
            <div className="case-num">Case No. {caseData.number}</div>
          </div>

          <div className="body">
            {!submitted ? (
              <>
                {/* ── DOSSIER ── */}
                <div className="dossier">
                  <div className="dossier-head">
                    <div className="dossier-label">📄 Patient Dossier</div>
                    <div className="dossier-stamp">Confidential</div>
                  </div>
                  <div className="dossier-body">
                    <div className="specialty-wrap">
                      <span className="specialty-tag">♥ {caseData.specialty}</span>
                    </div>
                    <div className="difficulty">Difficulty: {stars}</div>
                    <div className="case-title">"{caseData.title}"</div>
                    <div className="case-meta">{caseData.date}</div>

                    <div className="divider">✦</div>

                    <div className="complaint-box">
                      <div className="complaint-label">Chief Complaint</div>
                      <div className="complaint-text">"{caseData.complaint}"</div>
                    </div>

                    <div className="clues-label">Clinical Evidence</div>
                    <div>
                      {caseData.clues.slice(0, revealedCount).map((clue, i) => (
                        <div className="clue-row" key={i}>
                          <div className="clue-bullet">{ROMAN[i]}</div>
                          <div className="clue-text">{clue}</div>
                        </div>
                      ))}
                    </div>
                    <div className="clue-progress">
                      {revealedCount} of {caseData.clues.length} clues revealed
                    </div>
                    <button
                      className="reveal-btn"
                      disabled={revealedCount >= caseData.clues.length}
                      onClick={() => setRevealedCount((n) => Math.min(n + 1, caseData.clues.length))}
                    >
                      {revealedCount >= caseData.clues.length
                        ? "✦ All Clues Revealed ✦"
                        : "▼  Reveal Next Clue"}
                    </button>
                  </div>
                </div>

                {/* ── ANSWER CARDS ── */}
                <div className="verdict-section">
                  <div className="verdict-intro">Pass Your Verdict</div>
                  <div className="verdict-intro-sub">
                    Gather all the evidence before passing judgment — or risk a fatal misdiagnosis.
                  </div>

                  {cardConfigs.map(({ key, icon, title, data }) => (
                    <div className="answer-card" key={key}>
                      <div className="card-head">
                        <div className="card-icon">{icon}</div>
                        <div className="card-title">{title}</div>
                        <div className="card-question">{data.question}</div>
                      </div>
                      <div className="card-body">
                        <div className="options-grid">
                          {data.options.map((opt, i) => (
                            <button
                              key={opt}
                              className={`opt${selections[key] === opt ? " selected" : ""}`}
                              onClick={() => handleSelect(key, opt)}
                              disabled={submitted}
                            >
                              <div className="opt-letter">{LETTERS[i]}</div>
                              <div className="opt-text">{opt}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="submit-row">
                    <button
                      className="submit-main-btn"
                      disabled={!allSelected}
                      onClick={handleSubmit}
                    >
                      ◆ Submit My Verdict ◆
                    </button>
                    <div className="submit-hint">
                      {allSelected
                        ? "All sections answered — ready to submit."
                        : "Select an answer in each section before submitting."}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* ── RESULT SCREEN ── */
              <div className="result-screen">
                <div className="result-header">
                  <div className="result-ornament">◆ ◆ ◆</div>
                  <div className="result-title">Case Closed</div>
                  <div className="result-sub">
                    Your verdict has been recorded for Case No. {caseData.number}
                  </div>
                </div>

                <div className="score-grid">
                  {cardConfigs.map(({ key, icon, title, data }) => {
                    const isCorrect = selections[key] === data.correct;
                    return (
                      <div className={`score-box ${isCorrect ? "sb-correct" : "sb-wrong"}`} key={key}>
                        <div className="sb-icon">{icon}</div>
                        <div className="sb-label">{title}</div>
                        <div className="sb-answer">
                          {isCorrect ? `${data.correct} ✓` : `Incorrect ✗`}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="divider">✦</div>

                <div className="explanation-box">
                  <div className="exp-label">📄 Case Explanation</div>
                  <div className="exp-title">{caseData.explanation.title}</div>
                  <div className="exp-body">{caseData.explanation.body}</div>
                  <div className="key-points">
                    <div className="kp-label">Key Learning Points</div>
                    {caseData.explanation.keyPoints.map((pt, i) => (
                      <div className="kp-item" key={i}>
                        <div className="kp-dot" />
                        {pt}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="stats-grid">
                  <div className="stat-box">
                    <div className="stat-num">{scoreCount}/3</div>
                    <div className="stat-label">Today's score</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-num">3</div>
                    <div className="stat-label">Day streak</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-num">71%</div>
                    <div className="stat-label">All-time correct</div>
                  </div>
                </div>

                <div className="actions-row">
                  <button className="btn-share" onClick={handleShare}>◆ Share Result</button>
                  <button className="btn-archive">📖 View Archive</button>
                </div>
                <div className="copied-msg">
                  {copiedMsg ? "Copied to clipboard! Share with your colleagues." : ""}
                </div>

                <div className="next-case">
                  <div className="next-label">Next Case Arrives In</div>
                  <div className="countdown">{countdown}</div>
                  <div className="next-sub">A new patient awaits at midnight</div>
                </div>
              </div>
            )}

            <div className="footer-ornament">◆ ◆ ◆</div>
          </div>
        </div>
      </div>
    </>
  );
}