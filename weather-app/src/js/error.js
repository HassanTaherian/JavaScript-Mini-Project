function getMessage(message, type) {
  const errorMessage = document.createElement('div');
  errorMessage.innerHTML = message;
  errorMessage.className = 'lead alert alert-warning';
  switch (type) {
    case 'error':
      errorMessage.classList.add('alert-danger');
      break;

    case 'warning':
      errorMessage.classList.add('alert-warning');
      break;

    default:
      break;
  }
  return errorMessage;
}


function handleNotFindCity(city) {
  const errorMessage = `Sorry, we can't find ${city}. Please try again`,
    img404 = document.createElement('img'),
    ui = new UI();
    console.log(1)
  img404.setAttribute('src', 'img/404.png');
  img404.className = 'img-fluid';
  ui.toggleLoadImage(false);

  loadingImageContainer.appendChild(getMessage(errorMessage, 'error'));
  loadingImageContainer.appendChild(img404);
  changeLocationForm.classList.toggle('d-none');
}


function unknownLocation() {
  const errorMessage = document.createElement('div');
  errorMessage.innerHTML = 'Error! can\'t get your location';
  errorMessage.className = 'lead alert alert-warning';

  const guideMessage = document.createElement('p');
  guideMessage.innerHTML = 'Please let us to get your location or enter it manually!';
  guideMessage.className = 'lead text-left pl-2 mt-5';

  appContent.appendChild(errorMessage);
  appContent.appendChild(guideMessage);
  changeLocationForm.classList.toggle('d-none');
}
