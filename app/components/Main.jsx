
import fluxMixin from 'flummox/mixin';
import React from 'react';

let Main = React.createClass({
  mixins: [fluxMixin(['login'])],

  getInitialState() {
    return {
      ayyLmao: 'ayy lmao',
    };
  },

  onClick() {
    this.flux.getActions('login').loginUser('dude');
  },

  render() {
    return (
      <div>{this.state.ayyLmao} hh<button onClick={this.onClick}>hi</button></div>
    );
  },

});

export default Main;

