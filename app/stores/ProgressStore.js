
import clone from 'lodash/lang/clone';
import defer from 'lodash/function/defer';

import BaseStore from './BaseStore';

export default class ProgressStore extends BaseStore {

  constructor(flux) {
    super();

    const loginActions = flux.getActions('login');
    const progressActions = flux.getActions('progress');
    const sheetMusicActions = flux.getActions('sheetmusic');

    const actions = [

      // Login actions
      { name: 'facebookLogin', func: loginActions.facebookLogin },
      { name: 'login', func: loginActions.login },
      { name: 'register', func: loginActions.register },
      { name: 'resetPassword', func: loginActions.resetPassword },
      { name: 'resetPasswordConfirm', func: loginActions.resetPasswordConfirm },

      // Sheet music actions
      { name: 'getSheetMusic', func: sheetMusicActions.getSheetMusic },
      { name: 'search', func: sheetMusicActions.search },
      { name: 'sheetMusicList', func: sheetMusicActions.getSheetMusicList },
      { name: 'trendingSheetMusic', func: sheetMusicActions.getTrendingSheetMusic },

    ];

    // Register each action's success and failure handler
    actions.forEach(action => {
      this.registerAsync(action.func,
                         () => this.handleStart(action.name),
                         () => this.handleEnd(action.name),
                         () => this.handleEnd(action.name));
    });

    this.register(progressActions.resetProgress, this.resetProgress);
    this.register(progressActions.addProgress, this.handleStart);
    this.register(progressActions.removeProgress, this.handleEnd);
    this.state = { inProgress: [] };
  }

  /**
   * Resets the progress array to its initial state.
   */
  resetProgress() {
    this.setState({ inProgress: [] });
  }

  /**
   * Called when a function has just been called.
   */
  handleStart(param) {
    const inProgress = clone(this.state.inProgress);
    if (inProgress.indexOf(param) === -1) {
      inProgress.push(param);
      this.setState({ inProgress });
    }
  }

  /**
   * Called when a function is finished. The reason we defer the setState call is so that inProgress
   * is modified last.
   */
  handleEnd(param) {
    const inProgress = clone(this.state.inProgress);
    inProgress.splice(inProgress.indexOf(param));
    defer(() => this.setState({ inProgress }));
  }

}
