$(document).ready(function() {
  var currentDateTime = dayjs().format('dddd, MMMM D YYYY, h:mm A');
  $('#currentDay').text(currentDateTime);
  $('.saveBtn').on('click', function() {
  
  var value = $(this).siblings('.description').val();
  var timeBlockId = $(this).parent().attr('id');

    localStorage.setItem(timeBlockId, value);
  });   

  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var savedValue = localStorage.getItem(timeBlockId);

    if (savedValue !== null) {
      $(this).children('.description').val(savedValue);
    }
  });
  var timeBlocks = $(".time-block");

  
  timeBlocks.each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  
  function updateTimeBlockBackgroundColors() {
    
    var currentHour = moment().format("HH");

    // Loop through each time slot element
    $(".time-block").each(function () {
      var timeSlot = $(this);
      var timeSlotHour = timeSlot.attr("data-hour");
    
      // Remove any old classes before adding new classes
      timeSlot.removeClass("past present future");
    
      // Compare the time slot hour to the current hour
      if (timeSlotHour < currentHour) {
        // Time slot is in the past
        timeSlot.addClass("past");
      } else if (timeSlotHour === currentHour) {
        // Time slot is in the present
        timeSlot.addClass("present");
      } else {
        // Time slot is in the future
        timeSlot.addClass("future");
      }
    });
  }
  updateTimeBlockBackgroundColors();
  
  setInterval(function() {
    updateTimeBlockBackgroundColors();
  }, 300);
});