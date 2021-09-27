let confirm_modal = (action, text) => {
  let modal = document.querySelector('.modal-confirm');
  modal.classList.toggle('is-active');
  document.querySelector('.modal-card-title').innerHTML = text;
  document.querySelector('.modal-form').setAttribute('action', action);
  document.querySelector('.modal-cancel').addEventListener('click', (ev) => {
    modal.classList.remove('is-active');
  });
  document.querySelector('.modal-background').addEventListener('click', (ev) => {
    modal.classList.remove('is-active');
  });
};

let onLoad = () => {
  const matchEvent = (ev, sel) => ev.target.matches(sel);

  document.addEventListener('click', (ev) => {
    if (matchEvent(ev, '.navbar-burger')) {
      document.querySelector('.navbar-burger').classList.toggle('is-active');
      document.querySelector('.navbar-menu').classList.toggle('is-active');
    }
    if (matchEvent(ev, '.notification .delete')) {
      ev.target.parentNode.remove();
    }
    if (matchEvent(ev, '.delete-confirm')) {
      confirm_modal(ev.target.dataset.action, ev.target.dataset.text);
    }
  });
  document.addEventListener('change', (ev) => {
    if (matchEvent(ev, 'input.cover-url')) {
      let value = ev.target.value;
      document.querySelector('figure.image img').src = value;
    }
  });
  document.addEventListener('reset', (ev) => {
    let image_form = document.querySelector('figure.image img');
    if (image_form) {
      image_form.src = '../../images/placeholder.png';
    }
  });
};
document.addEventListener('DOMContentLoaded', onLoad);
