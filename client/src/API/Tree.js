class TreeAPI {
    static async fetchAll() {
        return await fetch('/trees', {
          method: 'GET',
        }).then(response => response.json())
          .catch(err => console.log(err))
          .then(jsonData => jsonData);
    }

    static async findById(id) {
        return await fetch(`/trees/tree/${id}`, {
          method: 'GET',
        }).then(response => response.json())
          .catch(err => console.log(err))
          .then(jsonData => jsonData);
    }

    static async fetchTimelineForTree(treeId, offset, numberOfItems) {
      return await fetch(`/trees/tree/timeline/${treeId}?offset=${offset}&numberOfItems=${numberOfItems}`, {
        method: 'GET',
      }).then(response => response.json())
        .catch(err => console.log(err))
        .then(jsonData => jsonData);
    }
}

export default TreeAPI;
