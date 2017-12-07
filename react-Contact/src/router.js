define(function() {
	var $ = Framework7.$;

    function init() {
		$(document).on('pageBeforeInit', function (e) {
			var page = e.detail.page;
			load(page.name, page.query);
		});
    }

	/
	function load(moduleName, query) {
		require(['build/' + moduleName + '/'+ moduleName + 'View'], function(module) {
			module.init(query);
		});
	}

	
	function sendMessage(moduleName, message) {
		require(['build/' + moduleName + '/'+ moduleName + 'View'], function(module) {
			module.receiveMessage(message);
		});
	}

	return {
        init: init,
		load: load,
		sendMessage: sendMessage
    };
});