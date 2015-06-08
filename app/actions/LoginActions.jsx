
import { Actions } from 'flummox';



export default class LoginActions extends Actions {

  loginUser(content) {
    // TODO actually do something
    return new Promise((resolve, reject) => { resolve(content) });
  }


}


