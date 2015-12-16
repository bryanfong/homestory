
app.directive('navBar', navbarView);

function navbarView (){
  var directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl =  "templates/partials/navbar.html";
  directive.controller = "NavbarCtrl";
  return directive;
}