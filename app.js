const coursePresets = {
  "CMSC 201": "CMSC 201 - Computer Science I",
  "IS 147": "IS 147 - Computer Programming II",
  "MATH 155": "MATH 155 - Applied Calculus",
  "STAT 351": "STAT 351 - Applied Statistics",
  "BIOL 141": "BIOL 141 - Foundations of Biology",
  "CHEM 101": "CHEM 101 - Principles of Chemistry",
  "ECON 101": "ECON 101 - Principles of Microeconomics",
  "PSYC 100": "PSYC 100 - Introduction to Psychology",
  "ENGL 100": "ENGL 100 - Composition",
  "HIST 101": "HIST 101 - World History",
  "ACCT 201": "ACCT 201 - Accounting Principles",
  "MGMT 210": "MGMT 210 - Business Statistics",
  "CUSTOM": "Custom UMBC course code"
};

const subjectTemplates = {
  AAST: ["identity", "history", "culture", "policy", "research methods", "essay writing"],
  AGNG: ["aging policy", "health systems", "case studies", "ethics", "program planning", "research"],
  AMST: ["culture", "identity", "media analysis", "history", "research methods", "essay writing"],
  ANCS: ["primary sources", "translation", "chronology", "culture", "archaeology", "essay writing"],
  ANTH: ["culture", "fieldwork", "theory", "ethnography", "research methods", "case studies"],
  ARBC: ["vocabulary", "grammar", "listening", "speaking", "reading", "writing"],
  ART: ["design principles", "visual analysis", "studio practice", "critique", "portfolio", "art history"],
  ASIA: ["regional history", "culture", "politics", "religion", "primary sources", "essay writing"],
  BIOL: ["cell structure", "genetics", "evolution", "enzymes", "ecology", "lab reports"],
  CHEM: ["stoichiometry", "atomic structure", "bonding", "equilibrium", "lab safety", "moles"],
  CHIN: ["vocabulary", "grammar", "listening", "speaking", "reading", "writing"],
  CMSC: ["loops", "conditionals", "functions", "arrays", "debugging", "syntax"],
  DATA: ["data cleaning", "visualization", "modeling", "statistics", "ethics", "communication"],
  DANC: ["technique", "choreography", "performance", "movement analysis", "history", "critique"],
  ECON: ["supply and demand", "elasticity", "market structures", "graphs", "macroeconomic indicators", "policy"],
  EDUC: ["lesson planning", "assessment", "classroom management", "learning theory", "equity", "reflection"],
  ENCH: ["mass balances", "thermodynamics", "transport", "process design", "lab reports", "equations"],
  ENES: ["engineering design", "statics", "circuits", "materials", "problem solving", "team projects"],
  ENGL: ["thesis", "evidence", "organization", "citations", "revision", "grammar"],
  FREN: ["vocabulary", "grammar", "listening", "speaking", "reading", "writing"],
  GES: ["maps", "climate", "GIS", "human geography", "field methods", "spatial analysis"],
  GERM: ["vocabulary", "grammar", "listening", "speaking", "reading", "writing"],
  GLBL: ["global systems", "policy", "culture", "case studies", "research methods", "presentation"],
  GWST: ["gender theory", "identity", "policy", "media analysis", "research methods", "essay writing"],
  HAPP: ["health policy", "public health", "data analysis", "ethics", "health systems", "case studies"],
  HIST: ["primary sources", "chronology", "essay writing", "causation", "themes", "source analysis"],
  HONR: ["research", "discussion", "writing", "presentation", "critical thinking", "reflection"],
  IS: ["systems analysis", "database design", "programming logic", "project management", "testing", "business processes"],
  JDST: ["religion", "history", "culture", "texts", "ethics", "essay writing"],
  JPNS: ["vocabulary", "grammar", "listening", "speaking", "reading", "writing"],
  KORE: ["vocabulary", "grammar", "listening", "speaking", "reading", "writing"],
  LATN: ["vocabulary", "grammar", "translation", "reading", "culture", "syntax"],
  LLC: ["language theory", "culture", "literacy", "research methods", "identity", "writing"],
  MATH: ["derivatives", "limits", "optimization", "integrals", "word problems", "graphs"],
  MCS: ["media analysis", "communication theory", "production", "research", "writing", "audience analysis"],
  MLSP: ["leadership", "service", "reflection", "community issues", "project planning", "communication"],
  MUSC: ["music theory", "ear training", "performance", "history", "composition", "practice technique"],
  PHIL: ["argument analysis", "logic", "ethics", "texts", "counterarguments", "essay writing"],
  PHYS: ["forces", "energy", "electricity", "waves", "calculus applications", "lab reports"],
  POLI: ["institutions", "policy", "theory", "comparative politics", "data analysis", "essay writing"],
  PSYC: ["research methods", "memory", "learning", "development", "disorders", "brain structures"],
  PUBH: ["epidemiology", "health equity", "policy", "program planning", "statistics", "case studies"],
  SOCY: ["theory", "inequality", "research methods", "data analysis", "institutions", "essay writing"],
  SOWK: ["case studies", "ethics", "policy", "human behavior", "practice skills", "reflection"],
  SPAN: ["vocabulary", "grammar", "listening", "speaking", "reading", "writing"],
  STAT: ["probability", "sampling", "regression", "hypothesis tests", "visualization", "confidence intervals"],
  THTR: ["performance", "script analysis", "design", "history", "rehearsal", "critique"],
  UNIV: ["time management", "campus resources", "reflection", "goal setting", "study skills", "career planning"]
};

const fallbackTopics = ["key concepts", "vocabulary", "problem solving", "notes review", "assignment requirements", "exam preparation"];

const resources = [
  { title: "Lecture replay: core concept walkthrough", type: "video", style: "visual", access: "online", goals: ["exam", "catchup"], topics: ["loops", "objects", "derivatives", "probability", "cell structure", "stoichiometry", "supply and demand", "research methods"], hours: 1.2, impact: 7.8, difficulty: 2 },
  { title: "Chapter review with guided notes", type: "reading", style: "reading", access: "online", goals: ["exam", "mastery"], topics: ["conditionals", "methods", "limits", "sampling", "genetics", "atomic structure", "elasticity", "memory", "primary sources"], hours: 1.5, impact: 6.8, difficulty: 3 },
  { title: "Practice problem sprint", type: "practice", style: "practice", access: "online", goals: ["exam", "assignment"], topics: ["loops", "arrays", "optimization", "hypothesis tests", "moles", "graphs", "journal entries", "descriptive stats"], hours: 2, impact: 9.1, difficulty: 4 },
  { title: "Tutoring center session", type: "campus support", style: "human", access: "campus", goals: ["catchup", "assignment", "exam"], topics: ["debugging", "file input", "word problems", "regression", "enzymes", "bonding", "excel analysis", "citations"], hours: 1, impact: 8.4, difficulty: 2 },
  { title: "Professor office hours question list", type: "campus support", style: "human", access: "campus", goals: ["assignment", "catchup"], topics: ["functions", "testing", "integrals", "visualization", "lab reports", "equilibrium", "policy", "essay writing", "ratios"], hours: 0.8, impact: 7.5, difficulty: 2 },
  { title: "Custom quiz and error review", type: "assessment", style: "practice", access: "online", goals: ["exam", "mastery"], topics: ["conditionals", "methods", "limits", "sampling", "arrays", "evolution", "market structures", "brain structures", "debits and credits"], hours: 1.1, impact: 8.2, difficulty: 3 },
  { title: "Worked examples library", type: "examples", style: "visual", access: "online", goals: ["assignment", "catchup"], topics: ["functions", "objects", "optimization", "regression", "stoichiometry", "cash flow", "forecasting", "organization"], hours: 1.4, impact: 7.3, difficulty: 2 },
  { title: "Study group teaching round", type: "peer learning", style: "human", access: "campus", goals: ["mastery", "exam"], topics: ["debugging", "testing", "word problems", "hypothesis tests", "ecology", "disorders", "causation", "market structures"], hours: 1.5, impact: 7.9, difficulty: 3 },
  { title: "Formula and syntax memory drill", type: "review", style: "practice", access: "quick", goals: ["exam"], topics: ["arrays", "file input", "derivatives", "probability", "syntax", "moles", "confidence intervals", "brain structures", "ratios"], hours: 0.7, impact: 6.5, difficulty: 2 },
  { title: "Concept map from slides", type: "notes", style: "reading", access: "quick", goals: ["catchup", "mastery"], topics: ["loops", "objects", "integrals", "visualization", "genetics", "bonding", "development", "themes", "income statements"], hours: 0.9, impact: 6.9, difficulty: 2 },
  { title: "AI-generated practice quiz", type: "assessment", style: "practice", access: "online", goals: ["exam"], topics: ["syntax", "class design", "graphs", "confidence intervals", "cell structure", "atomic structure", "macroeconomic indicators", "learning", "grammar"], hours: 0.8, impact: 7.7, difficulty: 3 },
  { title: "Writing center draft review", type: "campus support", style: "human", access: "campus", goals: ["assignment"], topics: ["thesis", "evidence", "organization", "citations", "revision", "essay writing", "source analysis", "lab reports"], hours: 1, impact: 8.7, difficulty: 2 },
  { title: "Flashcard recall cycle", type: "review", style: "practice", access: "quick", goals: ["exam", "mastery"], topics: ["definitions", "memory", "development", "disorders", "cell structure", "evolution", "market structures", "primary sources", "debits and credits"], hours: 0.6, impact: 6.7, difficulty: 2 },
  { title: "Assignment rubric breakdown", type: "planning", style: "reading", access: "quick", goals: ["assignment"], topics: ["testing", "lab reports", "thesis", "evidence", "revision", "excel analysis", "source analysis", "decision trees"], hours: 0.5, impact: 7.4, difficulty: 1 },
  { title: "Library research guide", type: "research", style: "reading", access: "online", goals: ["assignment", "mastery"], topics: ["citations", "primary sources", "source analysis", "evidence", "policy", "research methods", "themes"], hours: 1, impact: 6.9, difficulty: 2 },
  { title: "Exam mistake autopsy", type: "reflection", style: "practice", access: "quick", goals: ["catchup", "mastery"], topics: ["debugging", "testing", "hypothesis tests", "word problems", "journal entries", "graphs", "grammar", "organization"], hours: 0.8, impact: 8.0, difficulty: 3 }
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
  customCourse: document.querySelector("#customCourse"),
  customCourseLabel: document.querySelector("#customCourseLabel"),
  grade: document.querySelector("#grade"),
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  style: document.querySelector("#style"),
  goal: document.querySelector("#goal"),
  access: document.querySelector("#access"),
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

function initializeCourses() {
  const subjectOptions = Object.keys(subjectTemplates)
    .sort()
    .map(code => [`SUBJECT:${code}`, `${code} - Any ${code} course`]);
  const options = [
    ...Object.entries(coursePresets),
    ...subjectOptions
  ];

  els.course.innerHTML = options
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
}

function getProfile() {
  const saved = localStorage.getItem("learnwiseProfile");
  return saved ? JSON.parse(saved) : structuredClone(defaultProfile);
}

function saveProfile(profile) {
  localStorage.setItem("learnwiseProfile", JSON.stringify(profile));
}

function renderTopics() {
  const topics = getCourseTopics();
  els.topicList.innerHTML = topics.map((topic, index) => `
    <label>
      <span>${capitalize(topic)}</span>
      <input type="checkbox" value="${topic}" ${index < 2 ? "checked" : ""}>
    </label>
  `).join("");
}

function getInputs() {
  const courseCode = getSelectedCourseCode();
  return {
    course: courseCode,
    subject: getSubjectCode(courseCode),
    grade: Number(els.grade.value),
    days: Number(els.days.value),
    hours: Number(els.hours.value),
    style: els.style.value,
    goal: els.goal.value,
    access: els.access.value,
    weakTopics: [...els.topicList.querySelectorAll("input:checked")].map(input => input.value)
  };
}

function getSelectedCourseCode() {
  if (els.course.value === "CUSTOM") return normalizeCourseCode(els.customCourse.value);
  if (els.course.value.startsWith("SUBJECT:")) return els.course.value.replace("SUBJECT:", "");
  return els.course.value;
}

function normalizeCourseCode(value) {
  return value.trim().replace(/\s+/g, " ").toUpperCase() || "UMBC 000";
}

function getSubjectCode(courseCode) {
  return courseCode.split(" ")[0].replace(/[^A-Z]/g, "");
}

function getCourseTopics() {
  const subject = getSubjectCode(getSelectedCourseCode());
  return subjectTemplates[subject] || fallbackTopics;
}

function scoreResource(resource, inputs, profile) {
  const topicMatches = resource.topics.filter(topic => inputs.weakTopics.includes(topic)).length;
  const topicScore = topicMatches > 0 ? topicMatches * 22 : 4;
  const styleScore = resource.style === inputs.style ? 18 : 5;
  const goalScore = resource.goals.includes(inputs.goal) ? 16 : 2;
  const accessScore = scoreAccess(resource, inputs.access);
  const subjectScore = scoreSubjectFit(resource, inputs.subject);
  const urgencyScore = Math.max(0, 18 - inputs.days * 0.65);
  const gradePressure = inputs.grade < 70 ? 15 : inputs.grade < 82 ? 9 : 4;
  const timeFit = resource.hours <= inputs.hours ? 10 : -18;
  const preferenceMultiplier = profile[resource.style] || 1;
  const effectiveness = resource.impact * preferenceMultiplier;
  const total = topicScore + styleScore + goalScore + accessScore + subjectScore + urgencyScore + gradePressure + timeFit + effectiveness * 4 - resource.difficulty * 2;
  const roi = Math.max(0.5, total / Math.max(resource.hours, 0.5) / 10);

  return {
    ...resource,
    topicMatches,
    score: Number(total.toFixed(1)),
    roi: Number(roi.toFixed(1)),
    expectedGain: Number((roi * resource.hours * 0.55).toFixed(1))
  };
}

function scoreAccess(resource, access) {
  if (access === "any") return 6;
  if (access === resource.access) return 14;
  if (access === "campus" && resource.type === "campus support") return 14;
  if (access === "online" && resource.access === "quick") return 8;
  if (access === "quick" && resource.hours <= 0.9) return 12;
  return -8;
}

function scoreSubjectFit(resource, subject) {
  const area = getSubjectArea(subject);
  if (resource.type === "campus support") return 8;
  if (area === "computing" && ["practice", "examples", "assessment", "reflection"].includes(resource.type)) return 10;
  if (area === "quantitative" && ["practice", "examples", "review", "assessment"].includes(resource.type)) return 10;
  if (area === "science" && ["practice", "video", "notes", "campus support"].includes(resource.type)) return 9;
  if (area === "writing" && ["campus support", "planning", "research", "reading"].includes(resource.type)) return 12;
  if (area === "humanities" && ["research", "reading", "notes", "peer learning"].includes(resource.type)) return 10;
  if (area === "social" && ["reading", "research", "notes", "video"].includes(resource.type)) return 9;
  if (area === "business" && ["practice", "examples", "planning", "assessment"].includes(resource.type)) return 10;
  if (area === "language" && ["review", "practice", "video", "peer learning"].includes(resource.type)) return 9;
  if (area === "arts" && ["peer learning", "campus support", "reflection", "video"].includes(resource.type)) return 8;
  if (area === "health" && ["case study", "reading", "research", "notes"].includes(resource.type)) return 8;
  return 3;
}

function getSubjectArea(subject) {
  const areas = {
    computing: ["CMSC", "IS", "DATA"],
    quantitative: ["MATH", "STAT", "MGMT", "PHYS"],
    science: ["BIOL", "CHEM", "ENCH", "ENES", "GES"],
    writing: ["ENGL"],
    humanities: ["HIST", "PHIL", "ANCS", "JDST", "LLC"],
    social: ["AAST", "AMST", "ANTH", "ECON", "GLBL", "GWST", "POLI", "PSYC", "SOCY"],
    business: ["ACCT", "MGMT", "ECON"],
    language: ["ARBC", "CHIN", "FREN", "GERM", "JPNS", "KORE", "LATN", "SPAN"],
    arts: ["ART", "DANC", "MCS", "MUSC", "THTR"],
    health: ["AGNG", "HAPP", "PUBH", "SOWK"],
    education: ["EDUC", "HONR", "MLSP", "UNIV"]
  };
  return Object.entries(areas).find(([, subjects]) => subjects.includes(subject))?.[0] || "general";
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
  risk += inputs.goal === "catchup" ? 7 : 0;
  risk -= plan.reduce((sum, item) => sum + item.expectedGain, 0);
  risk = Math.max(5, Math.min(95, Number(risk.toFixed(1))));

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
  const planFocus = summarizeFocus(inputs, plan);
  els.summaryCards.innerHTML = [
    { value: `${usedHours}h`, label: `${inputs.hours} hours available` },
    { value: `+${projectedGain}`, label: "estimated grade impact" },
    { value: `${risk.value}%`, label: `${risk.label.toLowerCase()} success risk` },
    { value: planFocus.value, label: planFocus.label }
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

function summarizeFocus(inputs, plan) {
  const campusCount = plan.filter(item => item.access === "campus").length;
  if (inputs.access === "campus") return { value: `${campusCount}`, label: "campus resources in plan" };
  if (inputs.goal === "assignment") return { value: "Rubric", label: "assignment-first strategy" };
  if (inputs.goal === "catchup") return { value: "Catch-up", label: "priority recovery plan" };
  if (inputs.goal === "mastery") return { value: "Mastery", label: "long-term learning plan" };
  return { value: "Exam", label: "deadline-focused plan" };
}

function explainRecommendation(item, inputs) {
  const matches = item.topics.filter(topic => inputs.weakTopics.includes(topic));
  const topicText = matches.length ? matches.map(capitalize).join(", ") : "general review";
  const goalText = item.goals.includes(inputs.goal) ? `fits your ${formatGoal(inputs.goal)} goal` : "supports related study needs";
  return `${item.hours} hour(s), targets ${topicText}, ${goalText}, expected impact +${item.expectedGain}.`;
}

function renderTable(ranked) {
  els.table.innerHTML = `
    <div class="table-row header">
      <span>Resource</span><span>Score</span><span>Hours</span><span>ROI</span>
    </div>
    ${ranked.slice(0, 10).map(item => `
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

function formatGoal(goal) {
  return {
    exam: "exam prep",
    assignment: "assignment",
    catchup: "catch-up",
    mastery: "mastery"
  }[goal];
}

els.course.addEventListener("change", () => {
  els.customCourseLabel.classList.toggle("hidden", els.course.value !== "CUSTOM");
  renderTopics();
  renderResults();
});

els.form.addEventListener("input", event => {
  if (event.target.id === "customCourse") {
    renderTopics();
    renderResults();
  }
  if (["grade", "days", "hours", "style", "goal", "access"].includes(event.target.id)) renderResults();
});

els.form.addEventListener("submit", event => {
  event.preventDefault();
  renderResults();
});

els.reset.addEventListener("click", () => {
  localStorage.removeItem("learnwiseProfile");
  els.course.value = "CMSC 201";
  els.customCourse.value = "CMSC 201";
  els.customCourseLabel.classList.add("hidden");
  els.grade.value = 78;
  els.days.value = 5;
  els.hours.value = 10;
  els.style.value = "visual";
  els.goal.value = "exam";
  els.access.value = "any";
  renderTopics();
  renderResults();
});

els.feedback.addEventListener("click", event => {
  if (event.target.matches("button[data-title]")) saveRating(event.target);
});

initializeCourses();
renderTopics();
renderResults();
