$(document).ready(function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    $('body').addClass('dark-mode');
    $('.darkmode').html('<i class="bi bi-sun"></i>');
  }

  $('.darkmode').click(function () {
    $('body').toggleClass('dark-mode');

    if ($('body').hasClass('dark-mode')) {
      $(this).html('<i class="bi bi-sun"></i>');
      localStorage.setItem('theme', 'dark');
    } else {
      $(this).html('<i class="bi bi-moon"></i>');
      localStorage.setItem('theme', 'light');
    }
  });

  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    const form = $(this)[0];
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      alert('Сообщение отправлено!');
      form.reset();
      $(form).removeClass('was-validated');
    }

    $(form).addClass('was-validated');
  });
});
