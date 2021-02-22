export function minLengthValidation(inputData, minLength, inputContainer) {
  const { value } = inputData;

  if (!value.length) {
    inputContainer.classList.remove("success", "error");
    return false;
  } else if (value.length >= minLength) {
    console.log('entra aqui');
    inputContainer.classList.add("success");
    inputContainer.classList.remove("error");
    return true;
  } else {
    inputContainer.classList.add("error");
    inputContainer.classList.remove("success");
    return false;
  }
}

export function emailValidation(inputData, inputContainer) {
  // eslint-disable-next-line no-useless-escape
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const { value } = inputData;

  removeClassErrorSuccess(inputContainer);

  if (!value.length) {
    inputContainer.classList.remove("error");
    return false;
  }

  const resultValidation = emailValid.test(value);
  if (resultValidation) {
    inputContainer.classList.add("success");
    return true;
  } else {
    inputContainer.classList.add("error");
    return false;
  }
}

function removeClassErrorSuccess(inputContainer) {
  inputContainer.classList.remove("success");
  inputContainer.classList.remove("error");
}