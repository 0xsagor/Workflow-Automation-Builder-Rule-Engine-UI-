let rules = JSON.parse(localStorage.getItem("workflow_rules")) || [];

function addRule() {
  const condition = document.getElementById("condition").value.trim();
  const action = document.getElementById("action").value.trim();
  if (!condition || !action) return;

  rules.push({ id: Date.now(), condition, action });
  localStorage.setItem("workflow_rules", JSON.stringify(rules));

  document.getElementById("condition").value = "";
  document.getElementById("action").value = "";
  renderRules();
}

function renderRules() {
  const list = document.getElementById("rules");
  list.innerHTML = "";

  rules.forEach(r => {
    const li = document.createElement("li");
    li.innerText = `IF ${r.condition} THEN ${r.action}`;
    list.appendChild(li);
  });
}

function run() {
  const value = Number(document.getElementById("testValue").value);
  const log = document.getElementById("log");
  log.innerHTML = "";

  rules.forEach(r => {
    try {
      const result = Function("value", `return ${r.condition}`)(value);
      if (result) {
        const li = document.createElement("li");
        li.innerText = `Action executed: ${r.action}`;
        log.appendChild(li);
      }
    } catch {
      const li = document.createElement("li");
      li.innerText = `Invalid condition: ${r.condition}`;
      log.appendChild(li);
    }
  });
}

renderRules();
