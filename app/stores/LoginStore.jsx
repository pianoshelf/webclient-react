
import { Store } from 'flummox';


export default class MessageStore extends Store {

  constructor(flux) {

    super();

    const loginActions = flux.getActions('login');


  }

}

