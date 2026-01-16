const casesDiv = document.getElementById("cases");

function saveCase() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const cases = JSON.parse(localStorage.getItem("cases") || "[]");
  cases.push({ title, content });

  localStorage.setItem("cases", JSON.stringify(cases));
  renderCases();
}

function renderCases() {
  casesDiv.innerHTML = "";
  const cases = JSON.parse(localStorage.getItem("cases") || "[]");

  cases.forEach(c => {
    const div = document.createElement("div");
    div.textContent = c.title;
    casesDiv.appendChild(div);
  });
}

renderCases();
