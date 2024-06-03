function checkConnection() {
  var networkState = navigator.onLine;
  if (networkState === false) {
    return false;
  } else {
    return true;
  }
}
