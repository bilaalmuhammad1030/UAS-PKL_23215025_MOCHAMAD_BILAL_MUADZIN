document.addEventListener('DOMContentLoaded',function(){
  if(sessionStorage.getItem('isLoggedIn')==='true'){location.replace('dashboard.html');return}
  var form=document.getElementById('loginForm'),pass=document.getElementById('password'),toggle=document.getElementById('togglePassword'),msg=document.getElementById('loginMessage');
  toggle.addEventListener('click',function(){var show=pass.type==='password';pass.type=show?'text':'password';toggle.textContent=show?'Sembunyikan':'Lihat';toggle.setAttribute('aria-label',show?'Sembunyikan kata sandi':'Tampilkan kata sandi')});
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(document.getElementById('username').value.trim()==='admin'&&pass.value==='admin123'){
      sessionStorage.setItem('isLoggedIn','true');
      var button=form.querySelector('.btn-login');
      button.disabled=true;
      button.querySelector('span').textContent='Login berhasil';
      msg.textContent='';
      var box=document.createElement('div');
      box.className='success-celebration login-success';
      box.setAttribute('role','status');
      box.setAttribute('aria-live','assertive');
      box.innerHTML='<div class="success-card"><div class="success-sparkles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="success-check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"></circle><path d="M14 27l8 8 17-18"></path></svg></div><strong>Login Berhasil!</strong><p>Selamat datang, Admin. Membuka dashboard...</p><div class="success-progress" aria-hidden="true"><span></span></div></div>';
      document.body.appendChild(box);
      requestAnimationFrame(function(){box.classList.add('show')});
      setTimeout(function(){location.href='dashboard.html'},1900);
    }else{
      msg.style.color='#b42318';
      msg.textContent='Nama pengguna atau kata sandi salah.';
      form.classList.remove('login-shake');
      void form.offsetWidth;
      form.classList.add('login-shake');
    }
  });
  document.addEventListener('pointerdown',function(e){var target=e.target.closest('button,input,.feature-list span');if(!target)return;target.classList.remove('is-clicked');void target.offsetWidth;target.classList.add('is-clicked');setTimeout(function(){target.classList.remove('is-clicked')},320)});
});
