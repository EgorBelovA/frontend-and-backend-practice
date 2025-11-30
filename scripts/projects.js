$(document).ready(function () {
  $('.btn-group button').click(function () {
    $('.btn-group button').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).text().trim().toLowerCase();
    const cards = $('.projects-list .project-card');

    cards.fadeOut(200);

    setTimeout(() => {
      if (filter === 'все') {
        cards.fadeIn(200);
      } else {
        cards.each(function () {
          const tags = $(this).data('tags') || '';
          if (tags.toLowerCase().includes(filter)) {
            $(this).fadeIn(200);
          }
        });
      }
    }, 200);
  });
});
