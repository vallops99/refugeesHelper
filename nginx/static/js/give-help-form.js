"use strict";

function maskPhoneNumberInput() {
	$("input#user-phone-number").on("input", function () {
		let newValue = '';
		[...this.value.split('-')].forEach((letter, index) => {
			newValue += letter;
			if (!((index + 1) % 3)) {
				newValue += '-';
			}
		});
		this.value = newValue;
	})
}

// (function() {
// 	maskPhoneNumberInput();
// })();