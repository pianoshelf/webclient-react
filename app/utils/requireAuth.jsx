/**
 * This function returns a react-router transition callback that makes sure
 * a user is authenticated before proceeding. It makes an async call to the
 * getUsers API.
 *
 * @param {Flux} flux The flux object
 *
 * @return {Function} Callback to feed into react-router
 */
export default function requireAuth(flux) {
  return (nextState, transition, callback) => {
    const loginActions = flux.getActions('login');
    loginActions.getUser(flux).then(() => {
      callback();
    }).catch(() => {
      transition.to('/login/', { redirect: nextState.location.pathname });
      callback();
    });
  };
}
