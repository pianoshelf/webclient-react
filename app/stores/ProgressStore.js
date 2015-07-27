
import defer from 'lodash/function/defer';

import BaseStore from './BaseStore';

export default class ProgressStore extends BaseStore {

  constructor(flux) {

    super();

    const loginActions = flux.getActions('login');
    const progressActions = flux.getActions('progress');

    let actions = [
      { name: 'login', func: loginActions.login },
      { name: 'register', func: loginActions.register },
      { name: 'resetPassword', func: loginActions.resetPassword },
      { name: 'resetPasswordConfirm', func: loginActions.resetPasswordConfirm },
      { name: 'facebookLogin', func: loginActions.facebookLogin },
    ];

    // Register each action's success and failure handler
    actions.forEach(action => {
      this.registerAsync(action.func,
                         () => this.handleStart(action.name),
                         () => this.handleEnd(action.name),
                         () => this.handleEnd(action.name));
    });

    this.register(progressActions.resetProgress, this.resetProgress);
    this.state = { inProgress: [] };
  }

  resetProgress() {
    defer(() => this.setState({ inProgress: [] }));
  }

  handleStart(param) {
    let { inProgress } = this.state;
    inProgress.push(param);
    defer(() => this.setState({ inProgress }));
  }

  handleEnd(param) {
    let { inProgress } = this.state;
    inProgress.splice(inProgress.indexOf(param));
    defer(() => this.setState({ inProgress }));
  }

}

