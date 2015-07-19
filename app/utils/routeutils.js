import flattenDeep from 'lodash/array/flattenDeep';

/**
 * This function allows us to call asynchronous functions on the server-side. When a
 * request is made to our Express server, we will make a call to prefetchRouteData()
 * within any component that needs prefetched data. This will allow us to populate our
 * stores before calling React.renderToString on the server-side. Once our stores are
 * populated, we can call React.renderToString, which will generate our HTML.
 *
 * This function is necessary if we want to actually make requests on the server-side.
 *
 * @param {Array.Route} routes An array of routes matched by react-router. This array
 *     contains all the routes relevant to the current request, so we don't have to
 *     call routeWillRun on every single request.
 * @param {Object} params The object we want to pass into the routeWillRun call in all
 *     of our components.
 *   @param {Flux} params.flux The flux object.
 *   @param {Object} params.state The current router state, including URL parameters.
 *
 * @return {Promise} After calling each routeWillRun call for all the relevant routes,
 *     we will get an array of Promises. We want to make sure we resolve everything,
 *     so we wrap the promise in another promise that resolves no matter what. Once
 *     all these promises are fully resolved, we can assume that the stores are updated
 *     with the correct data. So essentially, once the Promise returned by this function
 *     resolves, we can operate under the assumption that all our stores are fully
 *     updated with the correct information, and call functions like React.renderToString.
 */
export function prefetchRouteData(components, params) {
  let matchedPromises = components
    .map(component => component.routeWillRun)
    .filter(routeWillRun => typeof routeWillRun === 'function')
    .map(routeWillRun => routeWillRun(params));

  return Promise.all(flattenDeep(matchedPromises).map(promise => {
    if (promise && typeof promise.then === 'function') {
      return new Promise(resolve => promise.then(resolve, resolve));
    } else {
      return promise;
    }
  }));
}
