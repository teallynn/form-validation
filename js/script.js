/* Initial formatting:  -focus on name field,
 *                      -hide other job role text field,
 *                      -hide shirt color menu,
 *                      -hide alternate payment method information.
 */
$('#name').focus();
$('#other-title').hide();
$('#shirt-colors').hide();
$('#paypal').hide();
$('#bitcoin').hide();


/* Display and focus the other field for the job role section if the title is
 * 'other' hide the text field when title is not 'other'.
 */
 function showOtherJobRoleField(title) {
   if (title === 'other') {
     $('#other-title').show();
     $('#other-title').focus();
   } else {
     $('#other-title').hide();
   }
 }


// Event Listeneer for Job Role selection menu
$('#title').change( function(e) {
  let title = $(this).val();
  showOtherJobRoleField(title);
});


/* Display the color selection menu. Options are only those colors available
 * for the selected style.
 */
 function showShirtColors(style) {
   $('#shirt-colors').show();
   if (style == 'js puns') {
     $('#select-color').prop('selected', true);
     $('.heart-js').hide();
     $('.js-puns').show();
   } else if (style == 'heart js') {
     $('#select-color').prop('selected', true);
     $('.js-puns').hide();
     $('.heart-js').show();
   } else if (style == 'Select Theme') {
     $('#shirt-colors').hide();
   }

 }


// Event Listeneer for shirt style selection menu
$('#design').change( function(e) {
  let style = $(this).val();
  $('#blank-color').attr('selected');
  showShirtColors(style);
});

let totalCost = 0;

/* Updates the totalCOst variable when an activity checkbix is checked or
 * unchecked.
 */
function updateActivityCost(activity) {
  if (activity.hasClass('100')) {
    if (activity.is(':checked')) {
      totalCost += 100;
    } else {
      totalCost -= 100;
    }
  } else if (activity.hasClass('200')) {
    if (activity.is(':checked')) {
      totalCost += 200;
    } else {
      totalCost -= 200;
    }
  }
  return totalCost
}

// Disables an activity checkbox and changes text color to light gray
function disableActivity(altActivity) {
  altActivity.attr('disabled', true);
  altActivity.parent().css('color', '#6d6d6d');
}

// Enables an activity checkbox and changes text color to black
 function enableActivity(altActivity) {
   altActivity.attr('disabled', false);
   altActivity.parent().css('color', '#000000');
 }


/* When an activity is checked a conflicting activity check box is disabled and
 * text color is changed to gray to indicat unavailabilty. When the box is
 * unchecked the changes are reversed.
 */
 function updateAvailableActivities(activity) {
   if (activity.hasClass('tues-9-1')) {
     let other = $('.tues-9-2');
     if (activity.is(':checked')) {
       disableActivity(other);
     } else {
       enableActivity(other);
     }
   }
   else if (activity.hasClass('tues-9-2')) {
     let other = $('.tues-9-1')
     if (activity.is(':checked')) {
       disableActivity(other);
     } else {
       enableActivity(other);
     }
   } else if (activity.hasClass('tues-1-1')) {
     let other = $('.tues-1-2');
     if (activity.is(':checked')) {
       disableActivity(other);
     } else {
       enableActivity(other);
     }
   } else if (activity.hasClass('tues-1-2')) {
     let other = $('.tues-1-1');
     if (activity.is(':checked')) {
       disableActivity(other);
     } else {
       enableActivity(other);
     }
   }
 }


// Event Listener for activity checkboxes
$(':checkbox').on('click', function() {
  let activity = $(this);
  let cost = updateActivityCost(activity);
  $('#total-cost').text('Total: $' + totalCost);
  updateAvailableActivities(activity);
});


// Event Listener for payment selection menu
$('#payment').change(function() {
  let method = $(this).val();
  if (method == 'paypal') {
    $('#credit-card').hide();
    $('#bitcoin').hide();
    $('#paypal').show();
  } else if (method == 'bitcoin') {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  } else {
    $('#bitcoin').hide();
    $('#paypal').hide();
    $('#credit-card').show();
  }
});


/*******************
 * Form validation *
 *******************
 */
const name = $('#name');
const email = $('#mail');
const cardNumber = $('#cc-num');
const zipCode = $('#zip');
const cvv = $('#cvv');


// Error message functions.
function createNameError() {
  let nameError = $('<span id="name-error" style="color: red">Please enter a name.</span>');
  nameError.insertAfter(name);
  nameError.hide();
}

function createEmailError() {
  let emailError = $('<span id="email-error" style="color: red">Please enter a valid email address.</span>');
  emailError.insertAfter(email);
  emailError.hide();
}

function createActivityError() {
  let activityError = $('<span id="activity-error" style="color: red">Please choose at least 1 activity.</span>');
  activityError.insertBefore($('#total-cost'));
  activityError.hide();
}

function createCardNumberError() {
  let cardError1 = $('<span id="card-error-blank" style="color: red">Please enter a credit card number</span>');
  let cardError2 = $('<span id="card-error-short" style="color: red">Please enter a number that is between 13 and 16 digits long.</span>');
  cardError1.insertAfter(cardNumber);
  cardError2.insertAfter(cardNumber);
  cardError1.hide();
  cardError2.hide();
}

function createZipError() {
  let zipError = $('<span id="zip-error" style="color: red">Please enter a valid zip code.</span>');
  zipError.insertAfter(zipCode);
  zipError.hide();
}

function createCVVError() {
  let cvvError = $('<span id="cvv-error" style="color: red">Please enter a 3 digit cvv code.</span>');
  cvvError.insertAfter(cvv);
  cvvError.hide();
}

function createErrorMessages() {
  createNameError();
  createEmailError();
  createActivityError();
  createCardNumberError();
  createZipError();
  createCVVError();
}

createErrorMessages();

// Validation Functions
function validateName() {
  let input = name.val();
  let nameRegEx = /[a-z]+/i;
  let match = nameRegEx.test(input);
  if (match) {
    name.css('border', '2px solid #c1deeb');
    $('#name-error').hide();
  } else {
    name.css('border', '2px solid red');
    $('#name-error').show();
  }
}

function validateEmail() {
  let input = email.val();
  let emailRegEx = /[^@]+@[^@.]+\.[a-z]/i;
  let match = emailRegEx.test(input);
  if (match) {
    email.css('border', '2px solid #c1deeb');
    $('#email-error').hide();
  } else {
    email.css('border', '2px solid red');
    $('#email-error').show();
  }
}

function validateActivity() {
  let activities = $(':checked');
  if (activities.length == 0) {
    $('#activity-error').show();
  } else if (activities.length > 0) {
    $('#activity-error').hide();
  }
}

function validateCardNumber() {
  let input = cardNumber.val();
  let cardRegEx = /\d{13,16}/;
  let match = cardRegEx.test(input);
  console.log(match);
  if (match) {
    cardNumber.css('border', '2px solid #c1deeb');
    $('#card-error-blank').hide();
    $('#card-error-short').hide();
  } else if (!match && input == ''){
    cardNumber.css('border', '2px solid red');
    $('#card-error-blank').show();
    $('#card-error-short').hide();
  } else if (!match && input.length > 0) {
    cardNumber.css('border', '2px solid red');
    $('#card-error-short').show();
    $('#card-error-blank').hide();
  }
}

function validateZipCode() {
  let input = zipCode.val();
  let zipRegEx = /\d{5}/;
  let match = zipRegEx.test(input);
  if (match) {
    zipCode.css('border', '2px solid #c1deeb');
    $('#zip-error').hide();
  } else {
    zipCode.css('border', '2px solid red');
    $('#zip-error').show();
  }
}

function validateCVV() {
  let input = cvv.val();
  let cvvRegEx = /\d{3}/;
  let match = cvvRegEx.test(input);
  if (match) {
    cvv.css('border', '2px solid #c1deeb');
    $('#cvv-error').hide();
  } else {
    cvv.css('border', '2px solid red');
    $('#cvv-error').show();
  }
}

// Event Listeners for form validation

let form = $('form');
$('#register').on('click', function() {
  form.submit(function() {
    event.preventDefault();
    validateName();
    validateEmail();
    validateCardNumber();
    validateZipCode();
    validateCVV();
  });
});

email.keyup(function() {
  validateEmail(email);
});
/*cardNumber.submit(validateCardNumber(cardNumber));
zipCode.submit(validateZipCode(zipCode));
cvv.submit(validateCVV(cvv));
*/
