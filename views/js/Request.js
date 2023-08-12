

class Request {
  static async get(url) {
    const rawData = await fetch(url, {method: "GET"});
    return await rawData.json();
  }
  static async post(url, data) {
    const headers = new Headers();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const rawData = await fetch(url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    });
    return await rawData.json();
  }
}
