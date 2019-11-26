function formTextControl() {
  document.onmousedown = document.onkeydown = document.onkeyup = function () {
    const elements = Array.from(document.getElementsByClassName('input'));
    elements.forEach(ele => {
      if (ele.value !== '') {
        ele.classList.add('has-val');
      } else ele.classList.remove('has-val');
    });
  };

  let showPass = 0;
  document.getElementById('showPass').onclick = function () {
    const pass = document.getElementById('showPass');
    if (showPass === 0) {
      document.getElementById('pass').setAttribute('type', 'text');
      pass.classList.remove("fa-eye-slash");
      pass.classList.add("fa-eye");
      showPass = 1;
    } else {
      document.getElementById('pass').setAttribute('type', 'password');
      pass.classList.remove('fa-eye');
      pass.classList.add("fa-eye-slash");
      showPass = 0;
    }
  };
}

function setLoginAlert() {
  const alert = document.getElementById('alert');
  alert.classList.add('alert');
  alert.innerHTML="Username/password doesn't match";
}

function removeLoginAlert() {
  const alert = document.getElementById('alert');
  if (alert !== null) {
    alert.classList.remove('alert');
    alert.innerHTML="";
  }
}

function checkValid() {
  const email = document.getElementById('email');
  const pass = document.getElementById('pass');

  const passV = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  function getValidation() {
    let check = false;
    if (filter.test(email.value) && pass.value.match(passV)) {
      email.parentElement.classList.remove('alert-validate');
      pass.parentElement.classList.remove('alert-validate');
      check = true;
    } else {
      if (!pass.value.match(passV)) {
        pass.parentElement.classList.add('alert-validate')
      }
      if (pass.value.match(passV)) {
        pass.parentElement.classList.remove('alert-validate')
      }
      if (!filter.test(email.value)) {
        email.parentElement.classList.add('alert-validate');
      }
      if (filter.test(email.value)) {
        email.parentElement.classList.remove('alert-validate');
      }
      check = false;
    }
    return check;
  }

  return getValidation();
}

function removeAlerts() {
  const email = document.getElementById('email');
  const pass = document.getElementById('pass');
  email.parentElement.classList.remove('alert-validate');
  pass.parentElement.classList.remove('alert-validate');
}

exports = {
  formTextControl,
  checkValid,
  removeAlerts,
  setLoginAlert,
  removeLoginAlert
};

