// Начальная функция

(function(){
	if ($('.js-data').length > 0) {
		$('.js-data').mask('00.00.0000');
	}

	if ($('.js-phone').length > 0) {
		$('.js-phone').mask('+7(000)000-00-00');
	}

	if ($('.reg__input-file').length > 0) {
		$('.reg__input-file').on('change', e => {
			$('.reg__group-file label').text(e.target.files.item(0).name)
		})
	}
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

(function(){
	if ($('.athlete-page').length === 0) return
	
	$('.main-slider').slick({
    arrows: true,
    slidesToShow: 5,
    vertical: true,
    infinite: false,
    asNavFor: ".info-slider",
    initialSlide: 0,
    focusOnSelect: true,
    responsive:[
      {
        breakpoint: 767,
        settings: {
          vertical: false,
          arrows: false
        }
      },{
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          vertical: false,
          arrows: false
        }
      }

    ]
  });

  $('.info-slider').slick({
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    infinite: false,
    asNavFor: ".main-slider",
    initialSlide: 0
  });

	let timeHours = document.querySelector('.time_hours-span'),
	timeMinutes = document.querySelector('.time_minutes-span'),
	locationDuration = document.querySelector('.location_duration-span'),
	locationTake = document.querySelector('.location_take-span');

	let eventList = [
		{
			title: "Это первый обычный день",
			start: "2020-06-19",
			time: "15:00",
			description: "Первая дата",
			locDur: "ЗИЛ, 1 час 20 минут",
			locTake: "Лопатки, ласты, грузы"
		},{
			title: "Соревнования",
			start: "2020-06-22",
			time: "12:30",
			description: "Заплыв",
			locDur: "Солнышко, 1 час 45 минут",
			locTake: "Лопатки, ласты, грузы"
		},{
			title: "Соревнования",
			start: "2020-06-15",
			time: "10:00",
			description: "Заплыв",
			locDur: "Дельфин, 3 часа 10 минут",
			locTake: "Лопатки, ласты, грузы"
		},{
			title: "dd",
			start: "2020-06-04",
			end: "2020-06-08",
			time: "13:20",
			description: "Заплыв два",
			locDur: "Аврора, 2 часа 40 минут",
			locTake: "Лопатки, ласты, грузы"
		}
	]

	var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'dayGrid', 'timeGrid', 'list' ],
    locale: 'ru', //язык ррусский
    height: 'auto',
    contentHeight: 100,
    eventStartEditable: false,
    navLinks: true, // делает дни кликабельными
    
    eventLimitText: "", 
    header: {
      left: 'prev,next today',
      center: 'addEventButton',
      right: 'title'
    },
    customButtons: {
      addEventButton: {
        text: 'Добавить событие',
        click: function() {
          var dateStr = prompt('Введите дату в формате ГГГГ-ММ-ДД');
          var date = new Date(dateStr + 'T00:00:00'); // will be in local time

          if (!isNaN(date.valueOf())) { // valid?
            calendar.addEvent({
              title: '',
              start: date,
              time: "12:00",
              description: "Заплыв два",
              locDur: "Бассейн, 1 час 30 минут",
              locTake: "Лопатки, ласты, грузы"
            });
            alert('Отлично. Теперь обновите вашу базу данных ...');
          } else {
            alert('Неправильная дата.');
          }
        }
      }
    },
    buttonText: { // показывает какой текст будет в кнопках
      today: 'Сегодня',
    },
    editable: true,
    firstDay: 1, // день с которого начинается неделя 1=пн
    selectable: true,

    eventSources: [
      [
				{
					"title": "Это первый обычный день",
					"start": "2020-06-20",
					"time": "18:00",
					"description": "Первая дата"
				},{
					"title": "Соревнования",
					"start": "2020-06-23",
					"end": "2020-06-06",
					"description": "Заплыв"
				},{
					"title": "Соревнования",
					"start": "2020-06-16",
					"description": "Заплыв"
				},{
					"title": "dd",
					"start": "2020-06-04",
					"end": "2020-06-08",
					"description": "Заплыв два"
				}
			]
    ],

    
  //что будет происходить при клике currentdate;
  navLinkDayClick: function(date, jsEvent) {
    currentDateSplit = date.toJSON().split("T")[0];
    // console.log(currentDateSplit);
    // console.log(date.getDate());
    calendar.select( date );
    
    timeHours.textContent = '';
    timeMinutes.textContent = '';
    locationDuration.textContent = 'На эту дату нет событий';
    locationTake.textContent = '';

    eventList.forEach(function(i) {
      if(currentDateSplit === i.start) {
        // console.log('Сегодня есть событие');
        timeHours.textContent = (i.time[0]+i.time[1]);
        timeMinutes.textContent = (i.time[3]+i.time[4]);

        locationDuration.textContent = i.locDur;
        locationTake.textContent = i.locTake;
      }
    });
  }

  });


	calendar.render();

})();

// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl = document.getElementById('calendar');

//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: 'dayGridMonth',
//     headerToolbar: {
//       center: 'addEventButton'
//     },
//     customButtons: {
//       addEventButton: {
//         text: 'Добавить событие',
//         click: function() {
//           var dateStr = prompt('Enter a date in YYYY-MM-DD format');
//           var date = new Date(dateStr + 'T00:00:00'); // will be in local time

//           if (!isNaN(date.valueOf())) { // valid?
//             calendar.addEvent({
//               title: 'dynamic event',
//               start: date,
//               allDay: true
//             });
//             alert('Great. Now, update your database...');
//           } else {
//             alert('Invalid date.');
//           }
//         }
//       }
//     }
//   });

//   calendar.render();
// });