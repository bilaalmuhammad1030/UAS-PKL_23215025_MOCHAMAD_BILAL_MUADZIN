(function(){
  var page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(page!=='index.html'&&sessionStorage.getItem('isLoggedIn')!=='true'){location.replace('index.html');return;}
  // Bersumber dari Jadwal Simpatika Semester 2; hanya data yang diperlukan aplikasi.
  var guru=[
    {id:'g1',nama:'Mukhamad Khasanudin, Lc., M.Pd.',kode:'MA-MH-GR-001',telepon:'0817-289-748',mapel:'Bahasa Arab'},
    {id:'g2',nama:'Nurrahman, S.H., M.Pd.',kode:'MA-MH-GR-002',telepon:'0819-1063-7151',mapel:'Al-Qur\'an Hadis'},
    {id:'g3',nama:'Nur Zaini, M.Pd.',kode:'MA-MH-GR-003',telepon:'0898-8386-882',mapel:'Akidah Akhlak'},
    {id:'g4',nama:'Noval Ali Hibtullah, Lc., M.A.',kode:'MA-MH-GR-004',telepon:'0852-3699-1848',mapel:'Bahasa Inggris'},
    {id:'g5',nama:'Ahmad Miftahudin, Lc., M.E.',kode:'MA-MH-GR-005',telepon:'0857-0228-2697',mapel:'Fikih'},
    {id:'g6',nama:'Muh Maufur, S.Sos.',kode:'MA-MH-GR-006',telepon:'0813-9375-0612',mapel:'Sosiologi'},
    {id:'g7',nama:'Rahmat Fathurahman, B.Sc.',kode:'MA-MH-GR-007',telepon:'0878-8865-5912',mapel:'Pancasila'},
    {id:'g8',nama:'Purniasih, S.S.',kode:'MA-MH-GR-008',telepon:'0896-6928-6313',mapel:'Bahasa Indonesia'},
    {id:'g9',nama:'Abdullatif, B.Sc.',kode:'MA-MH-GR-009',telepon:'0823-2855-5644',mapel:'Bahasa Jawa'},
    {id:'g10',nama:'Jaudatullaeli, S.Sy.',kode:'MA-MH-GR-010',telepon:'0877-7004-1992',mapel:'Ekonomi'},
    {id:'g11',nama:'Sarah Haula, S.E.',kode:'MA-MH-GR-011',telepon:'0814-7707-1205',mapel:'Ke-NU-an'},
    {id:'g12',nama:'Dwi Maulidia Putri, S.Pd.',kode:'MA-MH-GR-012',telepon:'0889-8830-4776',mapel:'Matematika'},
    {id:'g13',nama:'Ahmad Munaji, S.H.I.',kode:'MA-MH-GR-013',telepon:'0878-3513-3678',mapel:'Ilmu Tafsir'}];
  var mapel=[
    {id:'m1',kode:'PSL',nama:'Pancasila',kelas:'X',guruId:'g7'},
    {id:'m2',kode:'KNU',nama:'Ke-NU-an',kelas:'XII',guruId:'g11'},
    {id:'m3',kode:'IMH',nama:'Ilmu Hadis',kelas:'X',guruId:'g9'},
    {id:'m4',kode:'IMT',nama:'Ilmu Tafsir',kelas:'XI',guruId:'g13'},
    {id:'m5',kode:'BIO',nama:'Biologi',kelas:'XI',guruId:'g12'},
    {id:'m6',kode:'MAT',nama:'Matematika',kelas:'X',guruId:'g12'},
    {id:'m7',kode:'INF',nama:'Informatika',kelas:'X',guruId:'g2'},
    {id:'m8',kode:'BING',nama:'Bahasa Inggris',kelas:'X',guruId:'g4'},
    {id:'m9',kode:'FIS',nama:'Fisika',kelas:'XII',guruId:'g12'},
    {id:'m10',kode:'KIM',nama:'Kimia',kelas:'X',guruId:'g12'},
    {id:'m11',kode:'FIK',nama:'Fikih',kelas:'X',guruId:'g5'},
    {id:'m12',kode:'JAWA',nama:'Bahasa Jawa',kelas:'X',guruId:'g9'},
    {id:'m13',kode:'SOS',nama:'Sosiologi',kelas:'X',guruId:'g6'},
    {id:'m14',kode:'PJS',nama:'Pendidikan Jasmani, Olahraga, dan Kesehatan',kelas:'X',guruId:'g3'},
    {id:'m15',kode:'SNR',nama:'Seni Rupa',kelas:'X',guruId:'g3'},
    {id:'m16',kode:'SNB',nama:'Seni Budaya',kelas:'XI',guruId:'g8'},
    {id:'m17',kode:'GEO',nama:'Geografi',kelas:'X',guruId:'g10'},
    {id:'m18',kode:'SKI',nama:'Sejarah Kebudayaan Islam',kelas:'X',guruId:'g9'},
    {id:'m19',kode:'BIN',nama:'Bahasa Indonesia',kelas:'X',guruId:'g8'},
    {id:'m20',kode:'AAK',nama:'Akidah Akhlak',kelas:'X',guruId:'g3'},
    {id:'m21',kode:'EKO',nama:'Ekonomi',kelas:'X',guruId:'g10'},
    {id:'m22',kode:'SEJ',nama:'Sejarah',kelas:'X',guruId:'g6'},
    {id:'m23',kode:'BAR',nama:'Bahasa Arab',kelas:'X',guruId:'g1'},
    {id:'m24',kode:'USH',nama:'Ushul Fikih',kelas:'XI',guruId:'g5'},
    {id:'m25',kode:'QHS',nama:'Al-Qur\'an Hadis',kelas:'X',guruId:'g2'}];
  var kumpul=[
    {id:'p1',guruId:'g7',mapelId:'m1',kelas:'X',semester:'Genap',tahun:'2025/2026',tanggal:'2026-07-10',status:'Disetujui',catatan:'Sudah lengkap'},
    {id:'p2',guruId:'g11',mapelId:'m2',kelas:'XII',semester:'Genap',tahun:'2025/2026',tanggal:'2026-07-09',status:'Menunggu Verifikasi',catatan:'Menunggu pemeriksaan'},
    {id:'p3',guruId:'g9',mapelId:'m3',kelas:'X',semester:'Genap',tahun:'2025/2026',tanggal:'2026-07-08',status:'Perlu Revisi',catatan:'Perbaiki kisi-kisi'},
    {id:'p4',guruId:'g13',mapelId:'m4',kelas:'XI',semester:'Genap',tahun:'2025/2026',tanggal:'2026-07-07',status:'Disetujui',catatan:'Sesuai format'},
    {id:'p5',guruId:'g12',mapelId:'m5',kelas:'XI',semester:'Genap',tahun:'2025/2026',tanggal:'2026-07-06',status:'Menunggu Verifikasi',catatan:''}];
  var dataVersion='simpatika-semester-2-v4';
  if(localStorage.getItem('dataVersion')!==dataVersion){
    localStorage.setItem('dataGuru',JSON.stringify(guru));
    localStorage.setItem('dataMapel',JSON.stringify(mapel));
    localStorage.setItem('dataPengumpulan',JSON.stringify(kumpul));
    localStorage.setItem('dataVersion',dataVersion);
  }
  function localPhone(value){
    return String(value==null?'':value).trim().replace(/^\+62[\s-]*/,'0').replace(/^62(?=\d)/,'0');
  }
  // Konversi otomatis nomor lama dari +62 ke awalan 0 tanpa menghapus data pengguna.
  try{
    var savedGuru=JSON.parse(localStorage.getItem('dataGuru'))||[];
    var repairedPhone=false;
    savedGuru.forEach(function(item){
      var normalized=localPhone(item.telepon);
      if(item.telepon!==normalized){item.telepon=normalized;repairedPhone=true}
    });
    if(repairedPhone)localStorage.setItem('dataGuru',JSON.stringify(savedGuru));
  }catch(e){}
  // Perbaiki data lama yang statusnya kosong agar badge tetap memiliki label.
  try{
    var savedPengumpulan=JSON.parse(localStorage.getItem('dataPengumpulan'))||[];
    var repairedStatus=false;
    savedPengumpulan.forEach(function(item){
      if(!item.status||!String(item.status).trim()){
        item.status='Menunggu Verifikasi';
        repairedStatus=true;
      }
    });
    if(repairedStatus)localStorage.setItem('dataPengumpulan',JSON.stringify(savedPengumpulan));
  }catch(e){}
  window.App={
    get:function(key){try{return JSON.parse(localStorage.getItem(key))||[]}catch(e){return[]}},
    set:function(key,val){if(key==='dataGuru')val.forEach(function(item){item.telepon=localPhone(item.telepon)});localStorage.setItem(key,JSON.stringify(val))},
    id:function(prefix){return prefix+Date.now()+Math.random().toString(16).slice(2)},
    esc:function(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})},
    toast:function(msg){if(/dihapus/i.test(msg)){this.deleted(msg);return}if(/ditambah|diperbarui/i.test(msg)){this.success(msg);return}var t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(window._toast);window._toast=setTimeout(function(){t.classList.remove('show')},2200)},
    success:function(msg){
      var box=document.getElementById('successCelebration');
      if(!box){
        box=document.createElement('div');
        box.id='successCelebration';
        box.className='success-celebration';
        box.setAttribute('role','status');
        box.setAttribute('aria-live','polite');
        box.innerHTML='<div class="success-card"><div class="success-sparkles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="success-check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"></circle><path d="M14 27l8 8 17-18"></path></svg></div><strong>Berhasil!</strong><p></p><div class="success-progress" aria-hidden="true"><span></span></div></div>';
        document.body.appendChild(box);
      }
      box.querySelector('p').textContent=msg;
      clearTimeout(window._successTimer);
      box.classList.remove('show');
      void box.offsetWidth;
      box.classList.add('show');
      window._successTimer=setTimeout(function(){box.classList.remove('show')},1900);
    },
    deleted:function(msg){
      var box=document.getElementById('deleteCelebration');
      if(!box){
        box=document.createElement('div');
        box.id='deleteCelebration';
        box.className='success-celebration is-delete';
        box.setAttribute('role','status');
        box.setAttribute('aria-live','polite');
        box.innerHTML='<div class="success-card"><div class="success-sparkles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="success-check delete-icon" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"></circle><path d="M18 20h16l-1 19H19L18 20zm-3 0h22M22 16h8M23 25v9m6-9v9"></path></svg></div><strong>Data Dihapus</strong><p></p><div class="success-progress" aria-hidden="true"><span></span></div></div>';
        document.body.appendChild(box);
      }
      box.querySelector('p').textContent=msg;
      clearTimeout(window._deleteTimer);
      box.classList.remove('show');
      void box.offsetWidth;
      box.classList.add('show');
      window._deleteTimer=setTimeout(function(){box.classList.remove('show')},1800);
    },
    statusClass:function(s){return s==='Disetujui'?'approved':s==='Perlu Revisi'?'revision':'waiting'},
    layout:function(){
      document.querySelectorAll('[data-logout]').forEach(function(button){
        button.onclick=function(){sessionStorage.removeItem('isLoggedIn');location.replace('index.html')};
      });
      var phoneInput=document.getElementById('telepon');
      if(phoneInput)phoneInput.addEventListener('input',function(){
        if(/^\+62/.test(phoneInput.value.trim()))phoneInput.value=localPhone(phoneInput.value);
      });
      var toggle=document.getElementById('menuToggle');
      var side=document.querySelector('.sidebar');
      var back=document.querySelector('.sidebar-backdrop');
      if(!toggle||!side)return;

      toggle.textContent='';
      toggle.setAttribute('aria-label','Buka menu navigasi');
      toggle.setAttribute('aria-controls','mainSidebar');
      toggle.setAttribute('aria-expanded','true');
      toggle.setAttribute('title','Buka atau tutup menu');
      side.id='mainSidebar';
      side.querySelectorAll('.nav a').forEach(function(link){
        var label=link.textContent.trim();
        var parts=label.split(/\s+/);
        var icon=parts.shift();
        link.innerHTML='<span class="nav-icon" aria-hidden="true">'+icon+'</span><span class="nav-label">'+parts.join(' ')+'</span>';
        link.setAttribute('aria-label',parts.join(' '));
        link.setAttribute('title',parts.join(' '));
      });

      function mobile(){return window.matchMedia('(max-width: 900px)').matches}
      function updateButton(open){
        toggle.setAttribute('aria-expanded',String(open));
        toggle.setAttribute('aria-label',open?'Tutup menu navigasi':'Buka menu navigasi');
      }
      function closeMobileMenu(){
        side.classList.remove('open');
        if(back)back.classList.remove('show');
        updateButton(false);
      }

      toggle.onclick=function(){
        if(mobile()){
          var isOpen=side.classList.toggle('open');
          if(back)back.classList.toggle('show',isOpen);
          updateButton(isOpen);
        }else{
          document.body.classList.toggle('sidebar-collapsed');
          updateButton(!document.body.classList.contains('sidebar-collapsed'));
        }
      };
      if(back)back.onclick=closeMobileMenu;
      document.addEventListener('keydown',function(event){
        if(event.key==='Escape'&&mobile())closeMobileMenu();
      });
      window.addEventListener('resize',function(){
        side.classList.remove('open');
        if(back)back.classList.remove('show');
        updateButton(mobile()?false:!document.body.classList.contains('sidebar-collapsed'));
      });
      updateButton(mobile()?false:true);
    }
  };
  document.addEventListener('DOMContentLoaded',function(){
    App.layout();
    var footer=document.querySelector('.footer');
    if(footer)footer.textContent='Copyright © 2026 By 23215025-Mochamad Bilal Muadzin';
    document.addEventListener('pointerdown',function(e){
      var target=e.target.closest('button,.btn,.nav a');
      if(!target||!target.animate||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      target.animate([
        {transform:'scale(1)'},
        {transform:'scale(.96)',offset:.45},
        {transform:'scale(1)'}
      ],{duration:220,easing:'ease-out'});
    });
  });
})();
