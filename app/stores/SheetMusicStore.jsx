
// Import internal modules
import BaseStore from './BaseStore';

// Export store
export default class SheetMusicStore extends BaseStore {

  constructor(flux) {
    super();

    const sheetMusicActions = flux.getActions('sheetmusic');
    this.register(sheetMusicActions.getSheetMusicList, this.getSheetMusicList);

    this.state = {};
  }

  getSheetMusicList(res) {
    const { results, count } = JSON.parse(res.text);

    this.setState({
      sheetMusicList: { results, count },
    });
  }

}

