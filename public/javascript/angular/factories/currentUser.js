app.factory('CurrentUser', myCurrentUserFunction);

function myCurrentUserFunction($resource) {
  return {
    user: null
  }
};