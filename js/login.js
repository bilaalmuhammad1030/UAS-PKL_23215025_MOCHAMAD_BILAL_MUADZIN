document.addEventListener('DOMContentLoaded',function(){
  if(sessionStorage.getItem('isLoggedIn')==='true'){location.replace('dashboard.html');return}
  var form=document.getElementById('loginForm'),pass=document.getElementById('password'),toggle=document.getElementById('togglePassword'),msg=document.getElementById('loginMessage');
  toggle.addEventListener('click',function(){var show=pass.type==='password';pass.type=show?'text':'password';toggle.textContent=show?'Sembunyikan':'Lihat';toggle.setAttribute('aria-label',show?'Sembunyikan kata sandi':'Tampilkan kata sandi')});
  form.addEventListener('submit',function(e){e.preventDefault();if(document.getElementById('username').value.trim()==='admin'&&pass.value==='admin123'){sessionStorage.setItem('isLoggedIn','true');msg.style.color='#176b43';msg.textContent='Berhasil masuk. Anda sedang diarahkan...';setTimeout(function(){location.href='dashboard.html'},450)}else{msg.style.color='#b42318';msg.textContent='Nama pengguna atau kata sandi salah.'}});
  document.addEventListener('pointerdown',function(e){var target=e.target.closest('button,input,.feature-list span');if(!target)return;target.classList.remove('is-clicked');void target.offsetWidth;target.classList.add('is-clicked');setTimeout(function(){target.classList.remove('is-clicked')},320)});
});
