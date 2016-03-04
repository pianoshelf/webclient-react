/**
 * @module analytics
 * A set of utility functions for Google Analytics.
 */

import config from '../../config';

const VALID_ACTIONS = ['login', 'error', 'click', 'scroll', 'load'];

/**
 * Loads google analytics on the browser.
 */
export function loadAnalytics() {
  // Load autotrack
  require('autotrack/lib/plugins/social-tracker');

  // Create ga array
  window.GoogleAnalyticsObject = 'ga';
  window.ga = window.ga || ((...args) => {
    window.ga.q = window.ga.q || [];
    window.ga.q.push(...args);
  });
  window.ga.l = 1 * new Date();

  // Load the google analytics script
  const scriptElement = document.createElement('script');
  const firstScript = document.getElementsByTagName('script')[0];
  scriptElement.async = true;
  scriptElement.src = '//www.google-analytics.com/analytics.js';
  firstScript.parentNode.insertBefore(scriptElement, firstScript);

  // Initialize analytics
  window.ga('create', config.googleAnalytics.trackingId, 'auto');
  window.ga('require', 'socialTracker');
  window.ga('require', 'displayfeatures');
  window.ga('require', 'linkid');
}

/**
 * Creates an event tracker function.
 *
 * @param {String} category The event category. This indicates what high-level section of the site
 *   the analytics event is coming from. For example, we would put "Browse Page" here for all
 *   events coming from the Browse page.
 *
 * @return {Function} An event tracker function.
 */
export function createEventTracker(category) {
  if (process.env.NODE_ENV === 'development' && !category) {
    throw Error('Please specify a category.');
  }

  /**
   * Tracks user events.
   *
   * @param {String} action The event action. This indicates what the user did to trigger
   *   this event. For example, did the user click something? Did they scroll? The action must be a
   *   part of the actions constant above.
   * @param {String} label The event label. This indicates what was the thing they
   *   performed an action on. For example, did they click on a sheet music in the Browse page?
   * @param {Boolean} [nonInteraction=false] Whether the event should be recorded as a
   *   non-interaction event. For example, is this event automatically happening? Or did a user
   *   have to actually do something to make it happen? (i.e autoplaying videos)
   */
  return function trackEvent(action, label, nonInteraction = false) {
    if (process.env.NODE_ENV === 'development') {
      if (!window) {
        throw Error('Cannot call trackEvent from the server-side.');
      } else if (!label) {
        throw Error('Please specify a label.');
      } else if (VALID_ACTIONS.indexOf(action) === -1) {
        throw Error('Invalid action sent to trackEvent. Check analytics.js for valid actions.');
      }
    }

    // Send the event to Google Analytics
    window.ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      nonInteraction,
    });
  };
}

/**
 * Tracks browser page views.
 *
 * @param {Object} location The location object.
 */
export function trackPageView({ pathname, search, hash }) {
  if (process.env.NODE_ENV === 'development' && !window) {
    throw Error('Cannot call trackPageView from the server-side.');
  }
  window.ga('send', 'pageview', `${pathname}${search}${hash}`);
}
