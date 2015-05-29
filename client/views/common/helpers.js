Template.registerHelper ('isRouteReady', function(){
  return Router
          && Router.current
          && Router.current()
          && (Router.current()._waitlist._notReadyCount == 0);
});
