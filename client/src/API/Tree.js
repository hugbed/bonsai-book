import Fetch from './Fetch';

class TreeAPI {
    static async fetchAll() {
      return await Fetch.get('/trees');
    }

    static async findById(id) {
      return await Fetch.get(`/trees/tree/${id}`);
    }

    static async fetchTimelineForTree(treeId, offset, numberOfItems) {
      return await Fetch.get(`/trees/tree/timeline/${treeId}?offset=${offset}&numberOfItems=${numberOfItems}`);
    }

    static async addNoteForTree(treeId, comment) {
      return await Fetch.post(`/trees/tree/note`, {
        tree_id: treeId,
        comment: comment
      });
    }

    static async fetchAcquisitionTypes() {
      return await Fetch.get('/trees/acquisition/types');
    }

    // todo: should use add tree to add acquisition instead
    static async addAcquisitionForTree(treeId, acquisition) {
      return await Fetch.post(`/trees/tree/acquisition`, {
        tree_id: treeId,
        acquisition: acquisition
      });
    }
}

export default TreeAPI;
