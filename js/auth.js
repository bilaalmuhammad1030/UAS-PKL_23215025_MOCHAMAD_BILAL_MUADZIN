(function(){
  var page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(page!=='index.html'&&sessionStorage.getItem('isLoggedIn')!=='true'){location.replace('index.html');return;}
  // Bersumber dari Jadwal Simpatika Semester 2; hanya data yang diperlukan aplikasi.
  var guru=[
    {id:'g1',nama:'Mukhamad Khasanudin, Lc., M.Pd.',kode:'MA-MH-GR-001',telepon:'+62 817-289-748',mapel:'Bahasa Arab'},
    {id:'g2',nama:'Nurrahman, S.H., M.Pd.',kode:'MA-MH-GR-002',telepon:'+62 819-1063-7151',mapel:'Al-Qur\'an Hadis'},
    {id:'g3',nama:'Nur Zaini, M.Pd.',kode:'MA-MH-GR-003',telepon:'+62 898-8386-882',mapel:'Akidah Akhlak'},
    {id:'g4',nama:'Noval Ali Hibtullah, Lc., M.A.',kode:'MA-MH-GR-004',telepon:'+62 852-3699-1848',mapel:'Bahasa Inggris'},
    {id:'g5',nama:'Ahmad Miftahudin, Lc., M.E.',kode:'MA-MH-GR-005',telepon:'+62 857-0228-2697',mapel:'Fikih'},
    {id:'g6',nama:'Muh Maufur, S.Sos.',kode:'MA-MH-GR-006',telepon:'+62 813-9375-0612',mapel:'Sosiologi'},
    {id:'g7',nama:'Rahmat Fathurahman, B.Sc.',kode:'MA-MH-GR-007',telepon:'+62 878-8865-5912',mapel:'Pancasila'},
    {id:'g8',nama:'Purniasih, S.S.',kode:'MA-MH-GR-008',telepon:'+62 896-6928-6313',mapel:'Bahasa Indonesia'},
    {id:'g9',nama:'Abdullatif, B.Sc.',kode:'MA-MH-GR-009',telepon:'+62 823-2855-5644',mapel:'Bahasa Jawa'},
    {id:'g10',nama:'Jaudatullaeli, S.Sy.',kode:'MA-MH-GR-010',telepon:'+62 877-7004-1992',mapel:'Ekonomi'},
    {id:'g11',nama:'Sarah Haula, S.E.',kode:'MA-MH-GR-011',telepon:'+62 814-7707-1205',mapel:'Ke-NU-an'},
    {id:'g12',nama:'Dwi Maulidia Putri, S.Pd.',kode:'MA-MH-GR-012',telepon:'+62 889-8830-4776',mapel:'Matematika'},
    {id:'g13',nama:'Ahmad Munaji, S.H.I.',kode:'MA-MH-GR-013',telepon:'+62 878-3513-3678',mapel:'Ilmu Tafsir'}];
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
  window.App={
    get:function(key){try{return JSON.parse(localStorage.getItem(key))||[]}catch(e){return[]}},
    set:function(key,val){localStorage.setItem(key,JSON.stringify(val))},
    id:function(prefix){return prefix+Date.now()+Math.random().toString(16).slice(2)},
    esc:function(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})},
    toast:function(msg){var t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(window._toast);window._toast=setTimeout(function(){t.classList.remove('show')},2200)},
    statusClass:function(s){return s==='Disetujui'?'approved':s==='Perlu Revisi'?'revision':'waiting'},
    layout:function(){document.querySelectorAll('[data-logout]').forEach(function(b){b.onclick=function(){sessionStorage.removeItem('isLoggedIn');location.replace('index.html')}});var toggle=document.getElementById('menuToggle'),side=document.querySelector('.sidebar'),back=document.querySelector('.sidebar-backdrop');if(toggle)toggle.onclick=function(){side.classList.toggle('open');back.classList.toggle('show')};if(back)back.onclick=function(){side.classList.remove('open');back.classList.remove('show')};}
  };
  document.addEventListener('DOMContentLoaded',function(){
    App.layout();
    var footer=document.querySelector('.footer');
    if(footer)footer.textContent='Copyright © 2026 By 23215025-Mochamad Bilal Muadzin';
    document.addEventListener('pointerdown',function(e){
      var target=e.target.closest('button,.btn,.nav a,.stat-card,tbody tr,input,select,textarea');
      if(!target)return;
      target.classList.remove('is-clicked'); void target.offsetWidth;
      target.classList.add('is-clicked');
      setTimeout(function(){target.classList.remove('is-clicked')},320);
    });
  });
})();
