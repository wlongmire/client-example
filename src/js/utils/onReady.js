function onReady (cb) {
  if (document.readyState === 'complete') {
    return cb();
  }

  document.addEventListener(
    'DOMContentLoaded',
    cb,
    false
  );
};

module.exports = onReady;
