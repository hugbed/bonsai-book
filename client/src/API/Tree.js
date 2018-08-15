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

    static async fetchMaintenanceTypes() {
      return await Fetch.get('/trees/maintenance/types');
    }

    // todo: should use add tree to add acquisition instead
    static async addAcquisitionForTree(treeId, acquisition) {
      return await Fetch.post(`/trees/tree/acquisition`, {
        tree_id: treeId,
        acquisition: acquisition
      });
    }

    // todo: should use add tree to add acquisition instead
    static async addMaintenanceForTree(treeId, maintenance) {
      return await Fetch.post(`/trees/tree/maintenance/${treeId}`, {
        ...maintenance
      });
    }

    static async addPhotoForTree(treeId, { date, comment }, file) {
      try {
        const filename = await Fetch.postFile('/trees/tree/photo/file', file);

        return await Fetch.post("/trees/tree/photo", {
          tree_id: treeId,
          date: date,
          filepath: filename,
          comment: comment
        });
      } catch (e) {
        console.log("Can't upload file");
        throw e;
      }
    }
}

export default TreeAPI;
