
import { Store } from 'flummox';

export default class ProgressStore extends Store {

  constructor(flux) {

    super();

    const loginActions = flux.getActions('login');
    const progressActions = flux.getActions('progress');

    let actions = [
      { name: 'login', func: loginActions.login },
      { name: 'register', func: loginActions.register },
      { name: 'facebookLogin', func: loginActions.facebookLogin },
    ];

    // Register each action's success and failure handler
    actions.forEach(action => {
      this.registerAsync(action.func,
        this.handleStart(action.name),
        this.handleEnd(action.name),
        this.handleEnd(action.name));
    });

    this.register(progressActions.resetProgress, this.resetProgress);
    this.state = { inProgress: [] };
  }

  resetProgress() {
    this.setState({ inProgress: [] });
  }

  handleStart(param) {
    return () => {
      let { inProgress } = this.state;
      inProgress.push(param);
      this.setState({ inProgress });
    };
  }

  handleEnd(param) {
    return () => {
      let { inProgress } = this.state;
      inProgress.splice(inProgress.indexOf(param));
      this.setState({ inProgress });
    };
  }

  inProgress(item) {
    return this.state.inProgress.indexOf(item) !== -1;
  }

}
