"use strict";

(function() {
	new Choices('#user-subcategory', {
    	search: false,
	});

	if (window.is_form_submitted) {
		if (window.form_code) {
			$('#give-form-modal-error').modal();
		} else {
			$('#give-form-modal-success').modal();
		}
	}
})();