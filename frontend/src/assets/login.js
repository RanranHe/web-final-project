function formCheckValid() {
  document.onmousedown = document.onkeydown = document.onkeyup = function () {
    const elements = Array.from(document.getElementsByClassName('input'));
    elements.forEach(ele => {
      if (ele.value !== '') {
        ele.classList.add('has-val');
      } else ele.classList.remove('has-val');
    });

    const email = document.getElementById('email');
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
      email.parentElement.classList.add('alert-validate');
    } else {
      email.parentElement.classList.remove('alert-validate')
    }

    const pass = document.getElementById('pass');
    const passV = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!pass.value.match(passV)) {
      pass.parentElement.classList.add('alert-validate')
    } else {
      pass.parentElement.classList.remove('alert-validate')
    }
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

exports = {
  formCheckValid
};

