function createTimelineItem(title, date, status, description) {
  const statusClass =
    status === 'completed'
      ? 'bg-success'
      : status === 'in-progress'
      ? 'bg-warning'
      : 'bg-secondary';
  const statusIcon =
    status === 'completed'
      ? 'bi-check-lg'
      : status === 'in-progress'
      ? 'bi-arrow-clockwise'
      : 'bi-clock';

  const dateText =
    status === 'in-progress'
      ? `${date} - в процессе`
      : status === 'planned'
      ? `Планируется на ${date}`
      : date;

  return `
      <div class="timeline-item ${status}">
        <div class="timeline-marker ${statusClass}">
          <i class="bi ${statusIcon}"></i>
        </div>
        <div class="timeline-content">
          <h5 class="mb-1">${title}</h5>
          <p class="text-muted small mb-1">${dateText}</p>
          <p class="mb-0">${description}</p>
        </div>
      </div>
    `;
}

$('#saveEntry').click(function () {
  const title = $('#entryTitle').val().trim();
  const date = $('#entryDate').val();
  const status = $('#entryStatus').val();
  const description = $('#entryDescription').val().trim();

  if (!title || !date || !status || !description) {
    alert('Пожалуйста, заполните все поля!');
    return;
  }

  const newEntry = createTimelineItem(title, date, status, description);

  $('.timeline').prepend(newEntry);

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('ru-RU');

  const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
  entries.unshift({
    title: title,
    date: formattedDate,
    status: status,
    description: description,
    timestamp: Date.now(),
  });
  localStorage.setItem('diaryEntries', JSON.stringify(entries));

  $('#entryForm')[0].reset();
  const modal = bootstrap.Modal.getInstance(
    document.getElementById('addEntryModal')
  );

  modal.hide();

  showSuccessMessage('Запись успешно добавлена!');
});

function showSuccessMessage(message) {
  const alertHtml = `
      <div class="alert alert-success alert-dismissible fade show position-fixed" 
           style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
           role="alert">
        <i class="bi bi-check-circle me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  $('body').append(alertHtml);

  setTimeout(() => {
    $('.alert-success').alert('close');
  }, 3000);
}

function loadSavedEntries() {
  const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
  entries.forEach((entry) => {
    const newEntry = createTimelineItem(
      entry.title,
      entry.date,
      entry.status,
      entry.description
    );
    $('.timeline').prepend(newEntry);
  });
}

loadSavedEntries();

$('#entryDate').val(new Date().toISOString().split('T')[0]);

$(document).ready(function () {
  $('.btn-group button').click(function () {
    $('.btn-group button').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).text().toLowerCase();

    if (filter === 'все') {
      $('.project-card').fadeIn(300);
    } else {
      $('.project-card').fadeOut(300);
      setTimeout(() => {
        $(`.project-card[data-tags*="${filter}"]`).fadeIn(300);
      }, 300);
    }
  });

  $('[data-bs-target^="#projectModal"]').on('hide.bs.modal', function () {
    document.activeElement?.blur();
  });
});
