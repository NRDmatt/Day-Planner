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
    
    var currentHour = dayjs().hour();

    $('.time-block').each(function() {
      var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);

      $(this).removeClass('past present future');

      if (timeBlockHour < currentHour) {
        $(this).addClass('past');
      } else if (timeBlockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }
  updateTimeBlockBackgroundColors();
  
  setInterval(function() {
    updateTimeBlockBackgroundColors();
  }, 300);
});