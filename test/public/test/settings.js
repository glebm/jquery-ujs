var App = App || {};

App.ajax_timeout = 1000;
App.confirmation_message = 'Are you absolutely sure?';

App.timeout = function(){
  setTimeout(function() { start(); }, App.ajax_timeout);
};

App.assert_callback_invoked = function(callback_name) {
  ok(true, callback_name + ' callback should have been invoked');
};

App.assert_callback_not_invoked = function(callback_name) {
  ok(false, callback_name + ' callback should not have been invoked');
};

App.assert_get_request = function(request_env){
  equal(request_env['REQUEST_METHOD'], 'GET', 'request type should be GET');
};

App.assert_post_request = function(request_env){
  equal(request_env['REQUEST_METHOD'], 'POST', 'request type should be POST');
};

App.assert_request_path = function(request_env, path) {
  equal(request_env['PATH_INFO'], path, 'request should be sent to right url');
};

App.teardown = function(){
  // undelegate all live handlers except ones namespaced with "rails"
  var data = $.data(document);
  if (data.events && data.events.live)
    $.each(data.events.live.slice(0), function() {
      if (this.origType.split('.').indexOf('rails') < 0) $(this.selector).die();
    })
};

$(document).bind('submit', function(e) {
  if (!e.isDefaultPrevented()) {
    var form = $(e.target), action = form.attr('action'),
        name = 'form-frame' + jQuery.guid++,
        iframe = $('<iframe />', {id: name, name: name});

    if (action.indexOf('iframe') < 0) form.attr('action', action + '?iframe=true')
    form.attr('target', name);
    $('#qunit-fixture').append(iframe);
  }
})
