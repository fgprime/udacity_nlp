async function analyzeText(formData) {
  return await fetch("http://localhost:8081/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      return res.json();
    })
    .then(function (data) {
      return data;
    });
}

export { analyzeText };
