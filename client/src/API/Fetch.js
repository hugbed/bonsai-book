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
}

export default Fetch;