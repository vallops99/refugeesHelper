"use strict";

(function() {
	new Choices('#user-subcategory', {
    	search: false,
	});

	if (window.isFormIssued) {
		if (window.hasFormErros) {
			$('#give-form-modal-error').modal();
		} else {
			$('#give-form-modal-success').modal();
		}
	}
})();