document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('collectForm');
  var editIdInput = document.getElementById('editId');
  var formTitle = document.getElementById('formTitle');
  var guruSelect = document.getElementById('guruId');
  var mapelSelect = document.getElementById('mapelId');
  var kelasSelect = document.getElementById('kelas');
  var semesterSelect = document.getElementById('semester');
  var tahunInput = document.getElementById('tahun');
  var tanggalInput = document.getElementById('tanggal');
  var statusSelect = document.getElementById('status');
  var catatanInput = document.getElementById('catatan');
  var cancelEdit = document.getElementById('cancelEdit');
  var searchInput = document.getElementById('search');
  var statusFilter = document.getElementById('filterStatus');
  var kelasFilter = document.getElementById('filterKelas');
  var tableBody = document.getElementById('collectTable');

  function guru() {
    return App.get('dataGuru');
  }

  function mapel() {
    return App.get('dataMapel');
  }

  function choices(selectedGuru, selectedMapel) {
    guruSelect.innerHTML = '<option value="">Pilih guru</option>' + guru().map(function (item) {
      return '<option value="' + item.id + '" ' + (item.id === selectedGuru ? 'selected' : '') + '>' + App.esc(item.nama) + '</option>';
    }).join('');

    mapelSelect.innerHTML = '<option value="">Pilih mata pelajaran</option>' + mapel().map(function (item) {
      return '<option value="' + item.id + '" ' + (item.id === selectedMapel ? 'selected' : '') + '>' + App.esc(item.nama) + ' - Kelas ' + App.esc(item.kelas) + '</option>';
    }).join('');
  }

  function resetForm() {
    form.reset();
    editIdInput.value = '';
    formTitle.textContent = 'Tambah Pengumpulan';
    cancelEdit.hidden = true;
    choices('', '');
    tanggalInput.value = new Date().toISOString().slice(0, 10);
    statusSelect.value = 'Menunggu Verifikasi';
  }

  function render() {
    var dataGuru = guru();
    var dataMapel = mapel();
    var query = searchInput.value.toLowerCase();
    var selectedStatus = statusFilter.value;
    var selectedKelas = kelasFilter.value;

    var data = App.get('dataPengumpulan').filter(function (item) {
      var guruItem = dataGuru.find(function (value) { return value.id === item.guruId; });
      var mapelItem = dataMapel.find(function (value) { return value.id === item.mapelId; });
      var text = (guruItem ? guruItem.nama : '') + ' ' + (mapelItem ? mapelItem.nama : '') + ' ' + (item.catatan || '') + ' ' + item.tahun;
      return (!selectedStatus || item.status === selectedStatus) &&
        (!selectedKelas || item.kelas === selectedKelas) &&
        text.toLowerCase().includes(query);
    });

    tableBody.innerHTML = data.length ? data.map(function (item, index) {
      var guruItem = dataGuru.find(function (value) { return value.id === item.guruId; });
      var mapelItem = dataMapel.find(function (value) { return value.id === item.mapelId; });
      return '<tr><td>' + (index + 1) + '</td>' +
        '<td>' + App.esc(guruItem ? guruItem.nama : 'Data guru dihapus') + '</td>' +
        '<td>' + App.esc(mapelItem ? mapelItem.nama : 'Data mapel dihapus') + '</td>' +
        '<td>' + App.esc(item.kelas) + '</td>' +
        '<td>' + App.esc(item.semester) + '</td>' +
        '<td>' + App.esc(item.tahun) + '</td>' +
        '<td>' + App.esc(item.tanggal) + '</td>' +
        '<td><span class="badge ' + App.statusClass(item.status) + '">' + App.esc(item.status) + '</span></td>' +
        '<td>' + App.esc(item.catatan || '-') + '</td>' +
        '<td><div class="actions"><button class="btn btn-small btn-secondary" data-edit="' + item.id + '">Edit</button><button class="btn btn-small btn-danger" data-del="' + item.id + '">Hapus</button></div></td></tr>';
    }).join('') : '<tr><td colspan="10" class="empty">Data pengumpulan tidak ditemukan.</td></tr>';
  }

  mapelSelect.addEventListener('change', function () {
    var selected = mapel().find(function (item) { return item.id === mapelSelect.value; });
    if (selected) {
      kelasSelect.value = selected.kelas;
      if (!guruSelect.value) guruSelect.value = selected.guruId;
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = App.get('dataPengumpulan');
    var editId = editIdInput.value;
    var item = {
      id: editId || App.id('p'),
      guruId: guruSelect.value,
      mapelId: mapelSelect.value,
      kelas: kelasSelect.value,
      semester: semesterSelect.value,
      tahun: tahunInput.value.trim(),
      tanggal: tanggalInput.value,
      status: statusSelect.value,
      catatan: catatanInput.value.trim()
    };

    if (editId) {
      data = data.map(function (value) { return value.id === editId ? item : value; });
    } else {
      data.push(item);
    }

    App.set('dataPengumpulan', data);
    App.success(editId ? 'Data pengumpulan berhasil diperbarui.' : 'Data pengumpulan berhasil ditambahkan.');
    resetForm();
    render();
  });

  tableBody.addEventListener('click', function (event) {
    var id = event.target.dataset.edit || event.target.dataset.del;
    if (!id) return;

    var data = App.get('dataPengumpulan');
    var item = data.find(function (value) { return value.id === id; });
    if (!item) return;

    if (event.target.dataset.edit) {
      editIdInput.value = item.id;
      choices(item.guruId, item.mapelId);
      kelasSelect.value = item.kelas;
      semesterSelect.value = item.semester;
      tahunInput.value = item.tahun;
      tanggalInput.value = item.tanggal;
      statusSelect.value = item.status || 'Menunggu Verifikasi';
      catatanInput.value = item.catatan || '';
      formTitle.textContent = 'Edit Pengumpulan';
      cancelEdit.hidden = false;
      scrollTo({ top: 0, behavior: 'smooth' });
    } else if (confirm('Hapus data pengumpulan ini?')) {
      App.set('dataPengumpulan', data.filter(function (value) { return value.id !== id; }));
      App.toast('Data pengumpulan dihapus.');
      render();
    }
  });

  [searchInput, statusFilter, kelasFilter].forEach(function (element) {
    element.addEventListener('input', render);
    element.addEventListener('change', render);
  });

  cancelEdit.addEventListener('click', resetForm);
  resetForm();
  render();
});
