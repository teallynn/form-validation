/******************************************************************
 * Initial formatting:  -focus on name field,
 *                      -hide other job role text field,
 *                      -hide shirt color menu,
 *                      -hide alternate payment method information.
 ******************************************************************
 */
$('#name').focus();
$('#other-title').hide();
$('#colors-js-puns').hide();
$('#color option:nth-child(1)').hide();
$('#paypal').hide();
$('#bitcoin').hide();


/********************
 * Job Role Section *
 ********************
 */

/* Display and focus the other field for the job role section if the title is
 * 'other', hide the text field when title is not 'other'.
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


/*****************
 * Shirt Section *
 *****************
 */

/* Display the color selection menu. Options are only those colors available
 * for the selected style. When design selection is changed the first color
 * choice for that design is automatically selected.
 */
function showShirtColors(style) {
 $('#colors-js-puns').show();
 if (style === 'js puns') {
   $('#color option:nth-child(2)').show();
   $('#color option:nth-child(3)').show();
   $('#color option:nth-child(4)').show();
   $('#color option:nth-child(5)').hide();
   $('#color option:nth-child(6)').hide();
   $('#color option:nth-child(7)').hide();
   $('#color option:nth-child(2)').prop('selected', true);
 } else if (style === 'heart js') {
   $('#color option:nth-child(5)').show();
   $('#color option:nth-child(6)').show();
   $('#color option:nth-child(7)').show();
   $('#color option:nth-child(2)').hide();
   $('#color option:nth-child(3)').hide();
   $('#color option:nth-child(4)').hide();
   $('#color option:nth-child(5)').prop('selected', true);
 } else if (style == 'Select Theme') {
   $('#colors-js-puns').hide();
 }
}

// Event Listeneer for shirt style selection menu
$('#design').change( function(e) {
  let style = $(this).val();
  //$('#select-design').hide();
  //$('#select-color').show();
  //$('#select-color').prop('selected', true);

  showShirtColors(style);
});


/********************
 * Activity Section *
 ********************
 */

let totalCost = 0;

/* Updates the totalCOst variable when an activity checkbox is checked or
 * unchecked.
 */
function updateActivityCost(activity) {
  $('.activities').append('<span id="total-cost"></span>')
  if (activity.attr('name') != 'all') {
    if (activity.is(':checked')) {
      totalCost += 100;
    } else {
      totalCost -= 100;
    }
  } else if (activity.attr('name') === 'all') {
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
   if (activity.attr('name') === 'js-frameworks') {
     let other = $('input[name="express"]');
     if (activity.is(':checked')) {
       disableActivity(other);
     } else {
       enableActivity(other);
     }
   } else if (activity.attr('name') === 'express') {
     let other = $('input[name="js-frameworks"]');
     if (activity.is(':checked')) {
       disableActivity(other);
     } else {
       enableActivity(other);
     }
   } else if (activity.attr('name') === 'js-libs') {
     let other = $('input[name="node"]')
     if (activity.is(':checked')) {
       disableActivity(other);
     } else {
       enableActivity(other);
     }
   } else if (activity.attr('name') === 'node') {
     let other = $('input[name="js-libs"]');
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


/*******************
 * Payment Section *
 *******************
 */

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
const $name = $('#name');
const $email = $('#mail');
const $cardNumber = $('#cc-num');
const $zipCode = $('#zip');
const $cvv = $('#cvv');


/* The following functions create (and append to the html document) error
 * messages that correlate to each section and a general error message for the
 * bottom of the page to alert the user that there may be an error message
 * elsewhere on the page out of sight.
 */
function createNameError() {
  let $nameError = $('<span id="name-error" style="color: red">Please enter a name.</span>');
  $nameError.insertAfter($name);
  $nameError.hide();
}

function createEmailError() {
  let $emailError = $('<span id="email-error" style="color: red">Please enter a valid email address.</span>');
  $emailError.insertAfter($email);
  $emailError.hide();
}

function createActivityError() {
  let $activityError = $('<p id="activity-error" style="color: red">Please choose at least 1 activity:</p>');
  $activityError.insertBefore($('input[name="all"]'));
  $activityError.hide();
}

function createCardNumberError() {
  let $cardError1 = $('<span id="card-error-blank" style="color: red">Please enter a credit card number</span>');
  let $cardError2 = $('<span id="card-error-short" style="color: red">Please enter a number that is between 13 and 16 digits long.</span>');
  $cardError1.insertAfter($cardNumber);
  $cardError2.insertAfter($cardNumber);
  $cardError1.hide();
  $cardError2.hide();
}

function createZipError() {
  let $zipError = $('<span id="zip-error" style="color: red">Please enter a valid zip code.</span>');
  $zipError.insertAfter($zipCode);
  $zipError.hide();
}

function createCVVError() {
  let $cvvError = $('<span id="cvv-error" style="color: red">Please enter a 3 digit cvv code.</span>');
  $cvvError.insertAfter($cvv);
  $cvvError.hide();
}

function createErrorMessages() {
  let $generalError = $('<span id="gen-error" style="color: red">You have one or more errors in your form. Please correct them and resubmit.</span>');
  $generalError.insertBefore($('button'));
  $generalError.hide();
  createNameError();
  createEmailError();
  createActivityError();
  createCardNumberError();
  createZipError();
  createCVVError();
}

createErrorMessages();


/* The following functions check the input from the user to validate that it
 * fits the requirements for the type of information expected and returns a
 * boolean value true if the input is acceptable and false if it is not (and
 * requires an error message.)
 */
function validateName() {
  let input = $name.val();
  let nameRegEx = /[a-z]+/i;
  let match = nameRegEx.test(input);
  if (match) {
    $name.css('border', '2px solid #c1deeb');
    $('#name-error').hide();
  } else {
    $name.css('border', '2px solid red');
    $('#name-error').show();
  }
  return match;
}

function validateEmail() {
  let input = $email.val();
  let emailRegEx = /[^@]+@[^@.]+\.[a-z]/i;
  let match = emailRegEx.test(input);
  if (match) {
    $email.css('border', '2px solid #c1deeb');
    $('#email-error').hide();
  } else {
    $email.css('border', '2px solid red');
    $('#email-error').show();
  }
  return match;
}

function validateActivity() {
  let $activities = $('input:checked');
  let match = true;
  if ($activities.length == 0) {
    $('#activity-error').show();
    match = false;
  } else if ($activities.length > 0) {
    $('#activity-error').hide();
    match = true;
  }
  return match;
}

function validateCardNumber() {
  let input = $cardNumber.val();
  let cardRegEx = /^\d{13,16}$/;
  let match = cardRegEx.test(input);
  if (match) {
    $cardNumber.css('border', '2px solid #c1deeb');
    $('#card-error-blank').hide();
    $('#card-error-short').hide();
  } else if (!match && input == ''){
    $cardNumber.css('border', '2px solid red');
    $('#card-error-blank').show();
    $('#card-error-short').hide();
  } else if (!match && input.length > 0) {
    $cardNumber.css('border', '2px solid red');
    $('#card-error-short').show();
    $('#card-error-blank').hide();
  }
  return match;
}

function validateZipCode() {
  let input = $zipCode.val();
  let zipRegEx = /^\d{5}$/;
  let match = zipRegEx.test(input);
  if (match) {
    $zipCode.css('border', '2px solid #c1deeb');
    $('#zip-error').hide();
  } else {
    $zipCode.css('border', '2px solid red');
    $('#zip-error').show();
  }
  return match;
}

function validateCVV() {
  let input = $cvv.val();
  let cvvRegEx = /^\d{3}$/;
  let match = cvvRegEx.test(input);
  if (match) {
    $cvv.css('border', '2px solid #c1deeb');
    $('#cvv-error').hide();
  } else {
    $cvv.css('border', '2px solid red');
    $('#cvv-error').show();
  }
  return match;
}

/* Event Listener for form validation. Checks all form fields with validattion
 * functions. If any return false it prevents page submission and error messages
 * are displayed by those functions and the listener displays a general error.
 * If all validation functions return true the form is submitted.
 */
let form = $('form');
$('button').on('click', function() {
  form.submit(function() {
    let valName = validateName();
    let valEmail = validateEmail();
    let valActivity = validateActivity();
    let valCredit = true;
    if ($('#payment').val() == 'credit card' || $('#payment').val() == 'select_method') {
      let valCard = validateCardNumber();
      let valZip = validateZipCode();
      let valCVV = validateCVV();
      if (!valCard || !valZip || !valCVV) {
        valCredit = false;
      }
    }
    if (!valName || !valEmail || !valActivity || !valCredit) {
      event.preventDefault();
      $('#gen-error').show();
    } else {
      $('#gen-error').hide();
    }
  });
});

/*Event Listener on email form field displays an error message as user is typing
 * until the input matches the acceptable email format.
 */
$email.keyup(function() {
  validateEmail();
});
