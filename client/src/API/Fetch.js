class Fetch {
  static async get(url) {
      return await fetch(url, {
        method: 'GET',
      }).then(response => response.json())
        .catch(err => console.log(err))
        .then(jsonData => jsonData);
    }

    static async post(url, body) {
      return await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => response.json())
        .catch(err => console.log(err))
        .then(jsonData => jsonData);
    }

    static async put(url, body) {
      return await fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => response.json())
        .catch(err => console.log(err))
        .then(jsonData => jsonData);
    }

    static async postFile(url, file) {
      let data = new FormData();
      data.append("file", file);
      const result = await fetch(url, {
        method: "POST",
        body: data
      }).then(response => response.json());
      return result.filename;
    }
}

export default Fetch;
