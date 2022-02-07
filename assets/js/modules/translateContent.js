export default async function translateContent() {


  async function getResponse() {
    const response = await fetch("https://translate.mentality.rip/translate", {
      method: "POST",
      body: JSON.stringify({
        q: 'oi',
        source: "pt",
        target: "es",
        format: "html",
        api_key: "brunotestando"

      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    console.log(data)
  }

  getResponse();


}