
export function createStartAction(type) {
  return { progress: 'start', type };
}

export function createProgressAction(type, payload) {
  return { progress: 'progress', type, payload };
}

export function createDoneAction(type, payload) {
  return { progress: 'done', type, payload };
}

export function createErrorAction(type, code, payload) {
  return { progress: 'error', type, code, payload };
}
