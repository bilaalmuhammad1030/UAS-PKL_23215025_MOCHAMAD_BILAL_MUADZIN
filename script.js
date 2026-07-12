const formSoal = document.getElementById("formSoal");
const tabelSoal = document.getElementById("tabelSoal");
const pencarian = document.getElementById("pencarian");
const tombolSimpan = formSoal.querySelector(".btn-primary");

let dataSoal = muatData();
let indexSedangDiedit = null;

function muatData() {
    try {
        const dataTersimpan = JSON.parse(localStorage.getItem("dataSoal"));
        return Array.isArray(dataTersimpan) ? dataTersimpan : [];
    } catch (error) {
        console.error("Data lokal tidak dapat dibaca:", error);
        return [];
    }
}

function simpanData() {
    localStorage.setItem("dataSoal", JSON.stringify(dataSoal));
}

function escapeHTML(teks) {
    const elemen = document.createElement("div");
    elemen.textContent = String(teks ?? "");
    return elemen.innerHTML;
}

function formatTanggal(tanggal) {
    if (!tanggal) return "-";

    return new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

function kelasStatus(status) {
    if (status === "Disetujui") return "status-disetujui";
    if (status === "Perlu Revisi") return "status-revisi";
    return "status-menunggu";
}

function tampilkanData(keyword = "") {
    const kataKunci = keyword.trim().toLocaleLowerCase("id-ID");
    const hasilPencarian = dataSoal
        .map((data, index) => ({ data, index }))
        .filter(({ data }) => [
            data.namaGuru,
            data.mataPelajaran,
            data.kelas,
            data.semester,
            data.status
        ].some((nilai) => String(nilai).toLocaleLowerCase("id-ID").includes(kataKunci)));

    if (hasilPencarian.length === 0) {
        const pesan = kataKunci
            ? `Tidak ada hasil untuk “${escapeHTML(keyword.trim())}”.`
            : "Belum ada data pengumpulan soal.";

        tabelSoal.innerHTML = `
            <tr>
                <td colspan="8" class="data-kosong">${pesan}</td>
            </tr>
        `;
        hitungDashboard();
        return;
    }

    tabelSoal.innerHTML = hasilPencarian.map(({ data, index }, urutan) => `
        <tr>
            <td>${urutan + 1}</td>
            <td>${escapeHTML(data.namaGuru)}</td>
            <td>${escapeHTML(data.mataPelajaran)}</td>
            <td>${escapeHTML(data.kelas)}</td>
            <td>${escapeHTML(data.semester)}</td>
            <td>${formatTanggal(data.tanggal)}</td>
            <td>
                <span class="status ${kelasStatus(data.status)}">
                    ${escapeHTML(data.status)}
                </span>
            </td>
            <td>
                <div class="aksi-row">
                    <button type="button" class="btn-edit" data-aksi="edit" data-index="${index}">
                        Edit
                    </button>
                    <button type="button" class="btn-hapus" data-aksi="hapus" data-index="${index}">
                        Hapus
                    </button>
                </div>
            </td>
        </tr>
    `).join("");

    hitungDashboard();
}

function hitungDashboard() {
    document.getElementById("totalData").textContent = dataSoal.length;
    document.getElementById("totalDisetujui").textContent = dataSoal.filter(
        (data) => data.status === "Disetujui"
    ).length;
    document.getElementById("totalRevisi").textContent = dataSoal.filter(
        (data) => data.status === "Perlu Revisi"
    ).length;
    document.getElementById("totalMenunggu").textContent = dataSoal.filter(
        (data) => data.status === "Menunggu Verifikasi"
    ).length;
}

function ambilDataForm() {
    return {
        namaGuru: document.getElementById("namaGuru").value.trim(),
        mataPelajaran: document.getElementById("mataPelajaran").value.trim(),
        kelas: document.getElementById("kelas").value,
        semester: document.getElementById("semester").value,
        tanggal: document.getElementById("tanggal").value,
        status: document.getElementById("status").value
    };
}

function dataDuplikat(dataBaru) {
    return dataSoal.some((data, index) => (
        index !== indexSedangDiedit &&
        data.namaGuru.toLocaleLowerCase("id-ID") === dataBaru.namaGuru.toLocaleLowerCase("id-ID") &&
        data.mataPelajaran.toLocaleLowerCase("id-ID") === dataBaru.mataPelajaran.toLocaleLowerCase("id-ID") &&
        data.kelas === dataBaru.kelas &&
        data.semester === dataBaru.semester
    ));
}

function resetForm() {
    formSoal.reset();
    indexSedangDiedit = null;
    tombolSimpan.textContent = "Simpan Data";
    document.getElementById("tanggal").value = tanggalHariIni();
    document.getElementById("namaGuru").focus();
}

function editData(index) {
    const data = dataSoal[index];
    if (!data) return;

    indexSedangDiedit = index;
    Object.entries(data).forEach(([id, nilai]) => {
        const input = document.getElementById(id);
        if (input) input.value = nilai;
    });

    tombolSimpan.textContent = "Simpan Perubahan";
    formSoal.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("namaGuru").focus({ preventScroll: true });
    tampilkanToast("Silakan ubah data yang diperlukan.", "info");
}

async function hapusData(index) {
    const data = dataSoal[index];
    if (!data) return;

    const disetujui = await tampilkanKonfirmasi(
        "Hapus data?",
        `Data ${data.namaGuru} — ${data.mataPelajaran} akan dihapus permanen.`
    );
    if (!disetujui) return;

    dataSoal.splice(index, 1);
    simpanData();
    if (indexSedangDiedit === index) resetForm();
    indexSedangDiedit = null;
    tampilkanData(pencarian.value);
    tampilkanToast("Data berhasil dihapus.", "success");
}

function tampilkanToast(pesan, tipe = "success") {
    let wadah = document.querySelector(".toast-container");
    if (!wadah) {
        wadah = document.createElement("div");
        wadah.className = "toast-container";
        wadah.setAttribute("aria-live", "polite");
        document.body.appendChild(wadah);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${tipe}`;
    toast.textContent = pesan;
    wadah.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("toast-show"));
    setTimeout(() => {
        toast.classList.remove("toast-show");
        setTimeout(() => toast.remove(), 250);
    }, 3000);
}

function animasiDataBerhasil(sedangMengedit = false, indexEdit = null) {
    const teksTombol = tombolSimpan.textContent;
    tombolSimpan.textContent = "✓ Berhasil Disimpan";
    tombolSimpan.classList.add("btn-success-animation");

    const barisTarget = sedangMengedit
        ? tabelSoal.querySelector(`button[data-index="${indexEdit}"]`)?.closest("tr")
        : tabelSoal.querySelector("tr");
    barisTarget?.classList.add("row-baru");

    document.querySelectorAll(".card").forEach((card, index) => {
        card.style.setProperty("--delay", `${index * 70}ms`);
        card.classList.remove("card-update");
        void card.offsetWidth;
        card.classList.add("card-update");
    });

    const warna = ["#176b4d", "#2db37c", "#f3b33d", "#75c9a7"];
    const selebrasi = document.createElement("div");
    selebrasi.className = "success-particles";
    selebrasi.setAttribute("aria-hidden", "true");
    selebrasi.innerHTML = Array.from({ length: 16 }, (_, index) => `
        <i style="--x:${(Math.random() * 180 - 90).toFixed(0)}px;
                  --y:${(-50 - Math.random() * 110).toFixed(0)}px;
                  --r:${Math.random() * 360}deg;
                  --color:${warna[index % warna.length]};
                  --delay:${index * 18}ms"></i>
    `).join("");
    tombolSimpan.appendChild(selebrasi);

    document.querySelector(".success-popup-overlay")?.remove();
    const popupSukses = document.createElement("div");
    popupSukses.className = "success-popup-overlay";
    popupSukses.setAttribute("role", "status");
    popupSukses.setAttribute("aria-live", "assertive");
    popupSukses.innerHTML = `
        <div class="success-popup">
            <div class="success-check" aria-hidden="true">
                <svg viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="24"></circle>
                    <path d="M15 27l7 7 15-16"></path>
                </svg>
            </div>
            <strong>Data Berhasil Disimpan</strong>
            <span>${sedangMengedit ? "Perubahan data sudah diperbarui." : "Data baru sudah masuk ke dalam tabel."}</span>
        </div>
    `;
    document.body.appendChild(popupSukses);

    setTimeout(() => popupSukses.classList.add("success-popup-hide"), 1400);
    setTimeout(() => popupSukses.remove(), 1750);

    setTimeout(() => {
        tombolSimpan.classList.remove("btn-success-animation");
        tombolSimpan.textContent = teksTombol;
        selebrasi.remove();
        barisTarget?.classList.remove("row-baru");
        document.querySelectorAll(".card-update").forEach((card) => {
            card.classList.remove("card-update");
        });
    }, 1800);
}

function tampilkanKonfirmasi(judul, pesan) {
    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";
        overlay.innerHTML = `
            <div class="modal-konfirmasi" role="dialog" aria-modal="true" aria-labelledby="modalJudul">
                <h3 id="modalJudul">${escapeHTML(judul)}</h3>
                <p>${escapeHTML(pesan)}</p>
                <div class="modal-actions">
                    <button type="button" class="btn-batal">Batal</button>
                    <button type="button" class="btn-konfirmasi-hapus">Ya, Hapus</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const tutup = (hasil) => {
            document.removeEventListener("keydown", tekanEscape);
            overlay.remove();
            resolve(hasil);
        };
        const tekanEscape = (event) => event.key === "Escape" && tutup(false);

        overlay.querySelector(".btn-batal").addEventListener("click", () => tutup(false));
        overlay.querySelector(".btn-konfirmasi-hapus").addEventListener("click", () => tutup(true));
        overlay.addEventListener("click", (event) => event.target === overlay && tutup(false));
        document.addEventListener("keydown", tekanEscape);
        overlay.querySelector(".btn-batal").focus();
    });
}

function tanggalHariIni() {
    const sekarang = new Date();
    const offsetLokal = sekarang.getTimezoneOffset() * 60000;
    return new Date(sekarang.getTime() - offsetLokal).toISOString().split("T")[0];
}

formSoal.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formSoal.reportValidity()) return;

    const dataBaru = ambilDataForm();
    if (dataDuplikat(dataBaru)) {
        tampilkanToast("Data guru dan mata pelajaran tersebut sudah tersimpan.", "warning");
        return;
    }

    const sedangMengedit = indexSedangDiedit !== null;
    if (sedangMengedit) {
        dataSoal[indexSedangDiedit] = dataBaru;
    } else {
        dataSoal.unshift(dataBaru);
    }

    const indexEditSebelumnya = indexSedangDiedit;
    simpanData();
    pencarian.value = "";
    tampilkanData();
    resetForm();
    animasiDataBerhasil(sedangMengedit, indexEditSebelumnya);
    tampilkanToast(
        sedangMengedit ? "Perubahan berhasil disimpan." : "Data berhasil ditambahkan.",
        "success"
    );
});

tabelSoal.addEventListener("click", (event) => {
    const tombol = event.target.closest("button[data-aksi]");
    if (!tombol) return;

    const index = Number(tombol.dataset.index);
    if (tombol.dataset.aksi === "edit") editData(index);
    if (tombol.dataset.aksi === "hapus") hapusData(index);
});

pencarian.addEventListener("input", (event) => tampilkanData(event.target.value));
pencarian.setAttribute("aria-label", "Cari data pengumpulan soal");

document.getElementById("tanggal").value = tanggalHariIni();
tampilkanData();
