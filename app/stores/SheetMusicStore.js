
// Import internal modules
import BaseStore from './BaseStore';

// Export store
export default class SheetMusicStore extends BaseStore {

  constructor(flux) {
    super();

    const sheetMusicActions = flux.getActions('sheetmusic');
    this.register(sheetMusicActions.getMostPopularSheetMusic, this.getMostPopularSheetMusic);

    this.state = {
      mostPopularSheetMusic: [],
    };
  }

  getMostPopularSheetMusic(res) {
    const { results } = JSON.parse(res.text);

    this.setState({
      mostPopularSheetMusic: results,
    });
  }

}

