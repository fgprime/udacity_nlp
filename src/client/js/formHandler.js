import { analyzeText } from "./analyzeText";

function showResults(data) {
  const root = document.getElementById("results");

  const getExistingContainer = root.firstChild;
  if (getExistingContainer) root.removeChild(getExistingContainer);

  const container = document.createElement("div");

  let agreement = document.createElement("div");
  agreement.textContent = `Agreement: ${data.agreement}`;
  container.appendChild(agreement);

  let irony = document.createElement("div");
  irony.textContent = `Irony: ${data.irony}`;
  container.appendChild(irony);

  let subjectivity = document.createElement("div");
  subjectivity.textContent = `Subjectivity: ${data.subjectivity}`;
  container.appendChild(subjectivity);

  root.appendChild(container);
}

async function handleSubmit(event) {
  event.preventDefault();

  const formElement = document.querySelector("form");
  const formData = new FormData(formElement);

  if (!formData.get("text") || formData.get("text").length === 0) {
    alert("Please input a text in the input field.");
    return;
  }
  const formDataObject = Object.fromEntries(formData.entries());

  const textInformation = await analyzeText(formDataObject);
  showResults(textInformation);
}

export { handleSubmit };
