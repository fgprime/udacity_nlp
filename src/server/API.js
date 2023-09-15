/* Global Variables */
const dotenv = require("dotenv");
dotenv.config();

const meaningcloudService = "https://api.meaningcloud.com/sentiment-2.1";
const meaningcloudApiKey = process.env.API_KEY;

console.log(`Your API key is ${meaningcloudApiKey}`);

async function getMeaning(text) {
  let queries = [];
  queries.push(`lang=en`);
  queries.push(`key=${meaningcloudApiKey}`);
  queries.push(`txt=${encodeURIComponent(text)}`);

  const query = queries.join("&");

  const url = `${meaningcloudService}?${query}`;
  const response = await fetch(url, {});
  try {
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error", error);
  }
}
module.exports = { getMeaning };
