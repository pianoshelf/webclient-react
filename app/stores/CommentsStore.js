
// Import internal modules
import BaseStore from './BaseStore';

// Export store
export default class CommentsStore extends BaseStore {

  constructor(flux) {
    super();

    const sheetMusicActions = flux.getActions('sheetmusic');
    this.register(sheetMusicActions.getComments, this.getComments);

    this.state = {
      commentResult: {},
    };
  }

  getComments(res) {
    const result = JSON.parse(res.text);
    this.setState({
      commentResult: result,
    });
  }

}
