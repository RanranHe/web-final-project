function loginFormTextControl() {
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

function signUpFormTextControl() {
  document.onmousedown = document.onkeydown = document.onkeyup = function () {
    const elements = Array.from(document.getElementsByClassName('input'));
    elements.forEach(ele => {
      if (ele.value !== '') {
        ele.classList.add('has-val');
      } else ele.classList.remove('has-val');
    });
  };

  let showPass = 0;
  let showPass1 = 0;
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

  document.getElementById('showPass1').onclick = function () {
    const pass = document.getElementById('showPass1');
    if (showPass1 === 0) {
      document.getElementById('pass1').setAttribute('type', 'text');
      pass.classList.remove("fa-eye-slash");
      pass.classList.add("fa-eye");
      showPass1 = 1;
    } else {
      document.getElementById('pass1').setAttribute('type', 'password');
      pass.classList.remove('fa-eye');
      pass.classList.add("fa-eye-slash");
      showPass1 = 0;
    }
  }
}

function signUpcheckValid() {

  const email = document.getElementById('email');
  const pass = document.getElementById('pass');
  const pass1 = document.getElementById('pass1');
  const passV = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  function getValidation() {

    let check = false;
    if (filter.test(email.value) && pass.value.match(passV) && pass.value === pass1.value) {

      email.parentElement.classList.remove('alert-validate');
      pass.parentElement.classList.remove('alert-validate');
      pass1.parentElement.classList.remove('alert-validate');
      check = true;
    } else {
      if (!filter.test(email.value) || email.value === "") {
        email.parentElement.attributes.getNamedItem('data-validate').value = 'Email address not valid!';
        email.parentElement.classList.add('alert-validate');
      }
      if (filter.test(email.value)) {
        email.parentElement.classList.remove('alert-validate');
      }
      if (!pass.value.match(passV) || pass.value === "") {
        pass.parentElement.classList.add('alert-validate');
      }
      if (pass.value.match(passV)) {
        pass.parentElement.classList.remove('alert-validate')
      }
      if (pass.value !== pass1.value || pass1.value === "") {
        pass1.parentElement.classList.add('alert-validate');
      }
      if (pass.value === pass1.value) {
        pass1.parentElement.classList.remove('alert-validate');
      }
      check = false;
    }
    return check;
  }

  return getValidation();
}

function signUpExistUserAlert() {
  const email = document.getElementById('email');
  email.parentElement.attributes.getNamedItem('data-validate').value = 'Email already exists!';
  email.parentElement.classList.add('alert-validate');
}

function profileFormTextControl() {
  document.onmousedown = document.onkeydown = document.onkeyup = function () {
    const elements = Array.from(document.getElementsByClassName('input'));
    elements.forEach(ele => {
      if (ele.value !== '') {
        ele.classList.add('has-val');
      } else ele.classList.remove('has-val');
    });
  };
}

exports = {
  loginFormTextControl,
  signUpcheckValid,
  signUpFormTextControl,
  signUpExistUserAlert,
  profileFormTextControl
};

