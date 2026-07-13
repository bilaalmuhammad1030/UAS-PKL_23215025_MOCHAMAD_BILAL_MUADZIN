document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('search');
  var statusFilter = document.getElementById('filterStatus');
  var kelasFilter = document.getElementById('filterKelas');
  var reportTable = document.getElementById('reportTable');
  var reportCount = document.getElementById('reportCount');

  function render() {
    var guru = App.get('dataGuru');
    var mapel = App.get('dataMapel');
    var query = searchInput.value.toLowerCase();
    var selectedStatus = statusFilter.value;
    var selectedKelas = kelasFilter.value;
    var data = App.get('dataPengumpulan').filter(function (item) {
      var guruItem = guru.find(function (value) { return value.id === item.guruId; });
      var mapelItem = mapel.find(function (value) { return value.id === item.mapelId; });
      var searchable = (guruItem ? guruItem.nama : '') + ' ' + (mapelItem ? mapelItem.nama : '') + ' ' + item.tahun + ' ' + (item.catatan || '');
      return (!selectedStatus || item.status === selectedStatus) &&
        (!selectedKelas || item.kelas === selectedKelas) &&
        searchable.toLowerCase().includes(query);
    }).sort(function (a, b) { return b.tanggal.localeCompare(a.tanggal); });

    reportCount.textContent = 'Menampilkan ' + data.length + ' data.';
    document.getElementById('printTotal').textContent = data.length;
    reportTable.innerHTML = data.length ? data.map(function (item, index) {
      var guruItem = guru.find(function (value) { return value.id === item.guruId; });
      var mapelItem = mapel.find(function (value) { return value.id === item.mapelId; });
      return '<tr><td>' + (index + 1) + '</td><td>' + App.esc(guruItem ? guruItem.nama : 'Data guru dihapus') + '</td><td>' + App.esc(mapelItem ? mapelItem.nama : 'Data mapel dihapus') + '<small class="report-cell-detail">Kelas ' + App.esc(item.kelas) + '</small></td><td>' + App.esc(item.semester) + '<small class="report-cell-detail">' + App.esc(item.tahun) + '</small></td><td>' + App.esc(item.tanggal) + '</td><td><span class="badge ' + App.statusClass(item.status) + '">' + App.esc(item.status) + '</span></td><td>' + App.esc(item.catatan || '-') + '</td></tr>';
    }).join('') : '<tr><td colspan="7" class="empty">Data laporan tidak ditemukan.</td></tr>';
  }

  var today = new Date();
  var fullDate = new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(today);
  document.getElementById('printDate').textContent = fullDate;
  document.getElementById('signatureDate').textContent = fullDate;

  [searchInput, statusFilter, kelasFilter].forEach(function (element) {
    element.addEventListener('input', render);
    element.addEventListener('change', render);
  });
  document.getElementById('printReport').addEventListener('click', function () { window.print(); });
  render();
});
