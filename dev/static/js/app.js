// Начальная функция

(function(){
	$('.js-data').mask('00.00.0000');
	$('.js-phone').mask('+7(000)000-00-00');
})();

// функция валидации формы
(function(){

	if ($('[data-validation]').length) {
		initializeValidate();
	}
	if($('.form')) {
		clearForm();
	}

	function clearForm(){
		var inputs = $('.form').find('input, textarea'),
			newVal = '';

		for(i=0;i<inputs.length;i++) {
			inputs.eq(i).val(newVal);
		}
	}

	/* Validate Form */
	function initializeValidate() {
		$('[data-validation]').each(function () {
		    var validator = $(this),
		        inputs = validator.find('input:not(:checkbox, [type=hidden]), textarea'),
		        submit = validator.find('button[type=submit]'),
						stopSubmit = 0,
						isSubmited = false;

		    validator.on('change keyup', 'input[data-name]', function () {
						if (!isSubmited) return
		        var elm = $(this);
		        checkValidity(elm);
		    });

		    validator.on('change keyup', '.js-password', function () {
					if (!isSubmited) return
					checkPassword()
				});
				
				$('.reg__persdata').change(() => {
					$('.reg__persdata-wrp').removeClass('invalid')
				})

		    submit.on('click', function (e) {
					isSubmited = true
					stopSubmit = 0;

					for (var i = 0; i < inputs.length; i++) {

							var input = inputs[i];

							if (input.checkValidity() == true) {
									var elm = input;
									checkValidity(elm);
							}

							if ($(input).parent().hasClass('invalid')) {
									stopSubmit++;
							}
					}

					checkPassword()

					if (
						$('.js-password').eq(0).parent().hasClass('invalid') || 
						$('.js-password').eq(1).parent().hasClass('invalid')
					) {
						stopSubmit++
					}

					if (!$('.reg__persdata').prop('checked')) {
						stopSubmit++
						$('.reg__persdata-wrp').addClass('invalid')
					}

					if (stopSubmit > 0) {
						e.preventDefault();
					}
		    });
		});
	}

	function checkPassword() {
		const passwordElem1 = $('.js-password').eq(0)
		const parentElem1 = passwordElem1.parent()
		const passwordElem2 = $('.js-password').eq(1)
		const parentElem2 = passwordElem2.parent()

		if (passwordElem1.val() !== passwordElem2.val()) {
			parentElem1.addClass('invalid')
			parentElem2.addClass('invalid')
			return
		}

		if (passwordElem1.val().length === 0) {
			parentElem1.addClass('invalid')
		} else {
			parentElem1.removeClass('invalid')
		}

		if (passwordElem2.val().length === 0) {
			parentElem2.addClass('invalid')
		} else {
			parentElem2.removeClass('invalid')
		}
	}

	function checkValidity(elm) {
	    var elm = $(elm),
	        val = elm.val(),
	        block = elm.parent(),
	        name_reg = /^[A-Za-zА-Яа-яЁё\-\s]+$/,
					text_reg = /^[A-Za-zА-Яа-яёЁ\s\d]/,
	        mail_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
	        phone_reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/,
	        num_reg = /^\d+$/;


	    if (elm.prop('disabled')) {
	        return;
	    } else if (elm.is('[data-name="name"]')) {
	        if (name_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="email"]')) {
	        if (mail_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="phone"]')) {
	        if (phone_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="num"]')) {
	        if (num_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="text"]')) {
	        if (text_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } 
	}
})();