/**
 * Sets the history state with a specified value.
 * @param {string} value - The value to set in history state.
 */
export function setState(value) {
  window.history.pushState({ type: value }, null);
}

/**
 * Retrieves the current state from the history object.
 * @returns {string|null} The current state type or null if none set.
 */
export function getState() {
  return window.history.state?.type || null;
}

export default { setState, getState };
