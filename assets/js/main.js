$(function () {
  var data = [
    {
      action: 'type',
      //clear: true,
      strings: ['startdust create network^400'],
      output: $('.mimik-run-output').html()
    }
  ];
  var scrolled = false;
  $(window).scroll(function () {
    console.log($(window).scrollTop())
    if(($(window).scrollTop() > 2500 && $(window).scrollTop() < 3000) && !scrolled) {
      scrolled = true;
      runScripts(data, 0);
    } else if ($(window).scrollTop() < 2000 && scrolled) {
      scrolled = false;
      data[0].clear = true;
    } else if ($(window).scrollTop() > 3800 && scrolled) {
      scrolled = false;
      data[0].clear = true;
    }
  });
});

function runScripts(data, pos) {
  var prompt = $('.prompt'),
    script = data[pos];
  if (script.clear === true) {
    $('.history').html('');
  }
  switch (script.action) {
    case 'type':
      // cleanup for next execution
      prompt.removeData();
      $('.typed-cursor').text('');
      prompt.typed({
        strings: script.strings,
        typeSpeed: 30,
        callback: function () {
          var history = $('.history').html();
          history = history ? [history] : [];
          history.push('$ ' + prompt.text());
          if (script.output) {
            history.push(script.output);
            prompt.html('');
            $('.history').html(history.join('<br>'));
          }
          // scroll to bottom of screen
          $('section.terminal').scrollTop($('section.terminal').height());
          // Run next script
          pos++;
          if (pos < data.length) {
            setTimeout(function () {
              runScripts(data, pos);
            }, script.postDelay || 1000);
          }
        }
      });
      break;
    case 'view':

      break;
  }
}