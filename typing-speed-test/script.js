const api_key = "cSTiUMBsBwKkLjVjV9RCyQ==gSjxbqYa0JtWgUX9";
const api_url = "https://api.api-ninjas.com/v1/loremipsum?paragraphs=10";

async function genWords() {
  const response = await fetch(api_url, { headers: { "X-Api-Key": api_key } });
  const data = await response.json();
  return data["text"];
}

window.addEventListener("DOMContentLoaded", async function (e) {
//   document.getElementById("paragraph").innerText = await genWords();
  let para = await genWords();
  console.log(para);
});
