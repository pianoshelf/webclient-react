
import { Store } from 'flummox';


export default class MessageStore extends Store {

  constructor(flux) {

    super();

    const loginActions = flux.getActions('login');
    this.register(loginActions.loginUser, this.loginUser);

    this.state = {};

  }

  loginUser(content) {
    this.setState({
      loggedIn: true,
      ayyLmao: content,
    });
  }

  logoutUser(content) {

  }



}

