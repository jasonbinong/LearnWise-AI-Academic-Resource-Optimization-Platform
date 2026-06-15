const topicsByCourse = {
  "COMP 101": ["loops", "conditionals", "functions", "arrays", "debugging"],
  "IS 147": ["objects", "methods", "arrays", "file input", "testing"],
  "MATH 155": ["derivatives", "limits", "optimization", "integrals", "word problems"],
  "STAT 351": ["probability", "sampling", "regression", "hypothesis tests", "visualization"]
};

const resources = [
  { title: "Lecture replay: core concept walkthrough", type: "video", style: "visual", topics: ["loops", "objects", "derivatives", "probability"], hours: 1.2, impact: 7.8, difficulty: 2 },
  { title: "Chapter review with guided notes", type: "reading", style: "reading", topics: ["conditionals", "methods", "limits", "sampling"], hours: 1.5, impact: 6.8, difficulty: 3 },
  { title: "Practice problem sprint", type: "practice", style: "practice", topics: ["loops", "arrays", "optimization", "hypothesis tests"], hours: 2, impact: 9.1, difficulty: 4 },
  { title: "Tutoring center session", type: "campus support", style: "human", topics: ["debugging", "file input", "word problems", "regression"], hours: 1, impact: 8.4, difficulty: 2 },
  { title: "Professor office hours question list", type: "campus support", style: "human", topics: ["functions", "testing", "integrals", "visualization"], hours: 0.8, impact: 7.5, difficulty: 2 },
  { title: "Custom quiz and error review", type: "assessment", style: "practice", topics: ["conditionals", "methods", "limits", "sampling", "arrays"], hours: 1.1, impact: 8.2, difficulty: 3 },
  { title: "Worked examples library", type: "examples", style: "visual", topics: ["functions", "objects", "optimization", "regression"], hours: 1.4, impact: 7.3, difficulty: 2 },
  { title: "Study group teaching round", type: "peer learning", style: "human", topics: ["debugging", "testing", "word problems", "hypothesis tests"], hours: 1.5, impact: 7.9, difficulty: 3 },
  { title: "Formula and syntax memory drill", type: "review", style: "practice", topics: ["arrays", "file input", "derivatives", "probability"], hours: 0.7, impact: 6.5, difficulty: 2 },
  { title: "Concept map from slides", type: "notes", style: "reading", topics: ["loops", "objects", "integrals", "visualization"], hours: 0.9, impact: 6.9, difficulty: 2 }
];

const defaultProfile = {
  visual: 1.08,
  practice: 1.12,
  reading: 0.94,
  human: 1.02,
  ratings: []
};

const state = {
  ranked: [],
  selectedTopics: []
};

const els = {
  form: document.querySelector("#studyForm"),
  course: document.querySelector("#course"),
  grade: document.querySelector("#grade"),
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  style: document.querySelector("#style"),
  topicList: document.querySelector("#topicList"),
  summaryCards: document.querySelector("#summaryCards"),
  planOutput: document.querySelector("#planOutput"),
  table: document.querySelector("#resourceTable"),
  feedback: document.querySelector("#feedbackControls"),
  profile: document.querySelector("#learnerProfile"),
  reset: document.querySelector("#resetButton"),
  resourceCount: document.querySelector("#resourceCount"),
  roiPreview: document.querySelector("#roiPreview"),
  riskPreview: document.querySelector("#riskPreview"),
  confidenceBadge: document.querySelector("#confidenceBadge")
};

function getProfile() {
  const saved = localStorage.getItem("learnwiseProfile");
  return saved ? JSON.parse(saved) : structuredClone(defaultProfile);
}

function saveProfile(profile) {
  localStorage.setItem("learnwiseProfile", JSON.stringify(profile));
}

function renderTopics() {
  const topics = topicsByCourse[els.course.value];
  els.topicList.innerHTML = topics.map((topic, index) => `
    <label>
      <span>${capitalize(topic)}</span>
      <input type="checkbox" value="${topic}" ${index < 2 ? "checked" : ""}>
    </label>
  `).join("");
}

function getInputs() {
  return {
    course: els.course.value,
    grade: Number(els.grade.value),
    days: Number(els.days.value),
    hours: Number(els.hours.value),
    style: els.style.value,
    weakTopics: [...els.topicList.querySelectorAll("input:checked")].map(input => input.value)
  };
}

function scoreResource(resource, inputs, profile) {
  const topicMatches = resource.topics.filter(topic => inputs.weakTopics.includes(topic)).length;
  const topicScore = topicMatches > 0 ? topicMatches * 22 : 4;
  const styleScore = resource.style === inputs.style ? 18 : 5;
  const urgencyScore = Math.max(0, 18 - inputs.days * 0.65);
  const gradePressure = inputs.grade < 70 ? 15 : inputs.grade < 82 ? 9 : 4;
  const timeFit = resource.hours <= inputs.hours ? 10 : -18;
  const preferenceMultiplier = profile[resource.style] || 1;
  const effectiveness = resource.impact * preferenceMultiplier;
  const total = topicScore + styleScore + urgencyScore + gradePressure + timeFit + effectiveness * 4 - resource.difficulty * 2;
  const roi = Math.max(0.5, total / Math.max(resource.hours, 0.5) / 10);

  return {
    ...resource,
    topicMatches,
    score: Number(total.toFixed(1)),
    roi: Number(roi.toFixed(1)),
    expectedGain: Number((roi * resource.hours * 0.55).toFixed(1))
  };
}

function rankResources(inputs) {
  const profile = getProfile();
  return resources
    .map(resource => scoreResource(resource, inputs, profile))
    .sort((a, b) => b.score - a.score);
}

function buildPlan(ranked, inputs) {
  const plan = [];
  let usedHours = 0;

  for (const resource of ranked) {
    if (usedHours + resource.hours <= inputs.hours && plan.length < 5) {
      plan.push(resource);
      usedHours += resource.hours;
    }
  }

  return { plan, usedHours: Number(usedHours.toFixed(1)) };
}

function calculateRisk(inputs, plan) {
  let risk = 35;
  risk += inputs.grade < 70 ? 28 : inputs.grade < 80 ? 14 : 4;
  risk += inputs.days <= 3 ? 20 : inputs.days <= 7 ? 10 : 2;
  risk += inputs.weakTopics.length * 5;
  risk -= plan.reduce((sum, item) => sum + item.expectedGain, 0);
  risk = Math.max(5, Math.min(95, risk));

  if (risk >= 65) return { label: "High", value: risk, className: "risk-high" };
  if (risk >= 38) return { label: "Medium", value: risk, className: "risk-medium" };
  return { label: "Low", value: risk, className: "risk-low" };
}

function renderResults() {
  const inputs = getInputs();
  const ranked = rankResources(inputs);
  const { plan, usedHours } = buildPlan(ranked, inputs);
  const risk = calculateRisk(inputs, plan);
  const topRoi = ranked[0]?.roi || 0;
  state.ranked = ranked;
  state.selectedTopics = inputs.weakTopics;

  els.resourceCount.textContent = resources.length;
  els.roiPreview.textContent = topRoi.toFixed(1);
  els.riskPreview.textContent = risk.label;
  els.riskPreview.className = risk.className;
  els.confidenceBadge.textContent = `${risk.label} risk`;
  els.confidenceBadge.className = `badge ${risk.className}`;

  const projectedGain = plan.reduce((sum, item) => sum + item.expectedGain, 0).toFixed(1);
  els.summaryCards.innerHTML = [
    { value: `${usedHours}h`, label: `${inputs.hours} hours available` },
    { value: `+${projectedGain}`, label: "estimated grade impact" },
    { value: `${risk.value}%`, label: `${risk.label.toLowerCase()} success risk` }
  ].map(card => `
    <article class="summary-card">
      <strong>${card.value}</strong>
      <span>${card.label}</span>
    </article>
  `).join("");

  els.planOutput.innerHTML = plan.map((item, index) => `
    <article class="plan-step">
      <span class="rank">${index + 1}</span>
      <div>
        <h3>${item.title}</h3>
        <p>${explainRecommendation(item, inputs)}</p>
      </div>
      <span class="roi-pill">ROI ${item.roi}/hr</span>
    </article>
  `).join("");

  renderTable(ranked);
  renderFeedback(plan);
  renderProfile();
}

function explainRecommendation(item, inputs) {
  const matches = item.topics.filter(topic => inputs.weakTopics.includes(topic));
  const topicText = matches.length ? matches.map(capitalize).join(", ") : "general review";
  return `${item.hours} hour(s), targets ${topicText}, expected impact +${item.expectedGain} based on urgency, learning style, and effectiveness.`;
}

function renderTable(ranked) {
  els.table.innerHTML = `
    <div class="table-row header">
      <span>Resource</span><span>Score</span><span>Hours</span><span>ROI</span>
    </div>
    ${ranked.slice(0, 8).map(item => `
      <div class="table-row">
        <span>${item.title}</span>
        <span>${item.score}</span>
        <span>${item.hours}</span>
        <span>${item.roi}/hr</span>
      </div>
    `).join("")}
  `;
}

function renderFeedback(plan) {
  els.feedback.innerHTML = plan.slice(0, 3).map((item, index) => `
    <div class="feedback-card">
      <strong>${item.title}</strong>
      <select aria-label="Rating for ${item.title}" data-index="${index}">
        <option value="5">5 - great</option>
        <option value="4">4 - useful</option>
        <option value="3">3 - okay</option>
        <option value="2">2 - weak</option>
        <option value="1">1 - poor</option>
      </select>
      <button class="mini-button" type="button" data-title="${item.title}" data-style="${item.style}">Save rating</button>
    </div>
  `).join("");
}

function renderProfile() {
  const profile = getProfile();
  const bestStyle = Object.entries(profile)
    .filter(([key]) => key !== "ratings")
    .sort((a, b) => b[1] - a[1])[0];
  const count = profile.ratings.length;
  els.profile.innerHTML = `
    <strong>Learner profile:</strong> strongest signal is <strong>${capitalize(bestStyle[0])}</strong>
    (${bestStyle[1].toFixed(2)}x effectiveness). ${count} rating${count === 1 ? "" : "s"} saved locally.
  `;
}

function saveRating(button) {
  const profile = getProfile();
  const card = button.closest(".feedback-card");
  const rating = Number(card.querySelector("select").value);
  const style = button.dataset.style;
  const title = button.dataset.title;
  const adjustment = (rating - 3) * 0.035;
  profile[style] = Math.max(0.75, Math.min(1.35, (profile[style] || 1) + adjustment));
  profile.ratings.push({ title, style, rating, date: new Date().toISOString() });
  saveProfile(profile);
  renderResults();
}

function capitalize(text) {
  return text.replace(/\b\w/g, letter => letter.toUpperCase());
}

els.course.addEventListener("change", () => {
  renderTopics();
  renderResults();
});

els.form.addEventListener("submit", event => {
  event.preventDefault();
  renderResults();
});

els.reset.addEventListener("click", () => {
  localStorage.removeItem("learnwiseProfile");
  els.grade.value = 78;
  els.days.value = 5;
  els.hours.value = 10;
  els.style.value = "visual";
  renderTopics();
  renderResults();
});

els.feedback.addEventListener("click", event => {
  if (event.target.matches("button[data-title]")) saveRating(event.target);
});

renderTopics();
renderResults();
