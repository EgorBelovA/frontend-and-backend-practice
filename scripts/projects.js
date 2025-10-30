$(document).ready(function () {
  $('.btn-group button').click(function () {
    $('.btn-group button').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).text().trim().toLowerCase();

    const cards = $('.col-md-6.col-lg-4');

    cards.fadeOut(200);

    setTimeout(() => {
      if (filter === 'все') {
        cards.fadeIn(200);
      } else {
        cards
          .filter(function () {
            const tags = $(this).find('.project-card').data('tags') || '';
            return tags.toLowerCase().includes(filter);
          })
          .fadeIn(200);
      }
    }, 200);
  });
});
