$(document).ready(function () {

	// shows and hides the time options 
	// for days when the shop is open
	$(".open").change(function () {
		var parent = $(this).parent("div");
		if (this.checked) {
			parent.find(".time-input").css("display","inline-block");
			parent.find(".closed").toggle();
		} else {
			parent.find(".time-input").css("display","none");
			parent.find(".closed").toggle();
		}
	});

	// shows or hides the additional input 
	// fields for split time days
	$(".showSplit").click(function(e){
		e.preventDefault();
		$(this).parent("div").find(".split").toggle();
	});

	// ================================
	// Validation
	// ================================

	// tests if time ranges over lap 
	function overlapTest() {
		var parent = $(this).parents(".day"), 
		timeValue1 = parseInt(parent.find("input[type=text]").eq(0).val(), 10),
		timeValue2 = parseInt(parent.find("input[type=text]").eq(1).val(), 10),
		splitValue1 = parseInt(parent.find("input[type=text]").eq(2).val(), 10),
		splitValue2 = parseInt(parent.find("input[type=text]").eq(3).val(), 10),
		meridiem1 = parseInt($("select").eq(0).val()),
		meridiem2 = parseInt($("select").eq(1).val()),
		meridiem3 = parseInt($("select").eq(2).val()),
		meridiem4 = parseInt($("select").eq(3).val()),

		time1 = timeValue1 + meridiem1,
		time2 = timeValue2 + meridiem2,
		time3 = splitValue1 + meridiem3,
		time4 = splitValue2 + meridiem4;

		if (time1 == 24) {
			time1 = 12
		}
		if (time2 == 24) {
			time2 = 12
		}
		if (time3 == 24) {
			time3 = 12
		}
		if (time4 == 24) {
			time4 = 12
		}
		if ($(".split").is(':visible')) {
			if ( (time1 <= time4) && (time2 >= time3) ) {
				$(".overlap").removeClass("hide");
			} else {
				$(".overlap").addClass("hide");
			}
		}
	};

	$("input[type=text]").blur(overlapTest);
	$("select").blur(overlapTest);

	// validates if user moves off of input 
	// without entering a time or does not
	// enter a valid time
	var timeRegex = /([01]?\d|2[0-3]):?([0-5]\d)?/;

	function regexTest() {
		var match = timeRegex.test($(this).val());
		if( !$(this).val() || !match) {
			$(this).addClass("warning");
			$(".error").removeClass("hide");
			return false;
		} else {
			$(this).removeClass("warning");
			$(".error").addClass("hide");
			return;
		}
	}
	// validates all visible inputs for 
	// a time entered 
	function numberTest() {
		if( $.trim($(this).val()).length == 0 ) {
			$(this).addClass("warning");
			$(".error").removeClass("hide");
			return false;
		} else {
			$(this).removeClass("warning");
			$(".error").addClass("hide");
			return
		};
	}

	$("input[type=text]").blur(regexTest);
	$("input[type=text]:visible").each(numberTest);

	// validate form on save click
	$('.save').click(function(event){
		var isValid = true;
		if ( $(".error").hasClass('hide') || $(".overlap").hasClass('hide')) {
			isValid = true;
		} else {
			isValid = false;
		}
		if (!isValid) {
			$(".error").removeClass("hide");;
		}
		return isValid;
	});
});

