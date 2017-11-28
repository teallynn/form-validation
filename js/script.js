// Initial formatting: focus on name field, hide job role, hide shirt color menu.
$('#name').focus();
$('#other-title').hide();
$('#shirt-colors').hide();


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

/*
 *
 */
 function updateAvailableActivities(activity) {
   if (activity.hasClass('tues-9-1')) {
     if (activity.is(':checked')) {
       $('.tues-9-2').attr('disabled', true);
     } else {
       $('.tues-9-2').attr('disabled', false);
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
