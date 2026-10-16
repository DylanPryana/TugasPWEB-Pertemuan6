// ambil elemen-elemen dari html
const pilihProvinsi = document.getElementById("pilihProvinsi");
const pilihKota = document.getElementById("pilihKota");
const pilihKecamatan = document.getElementById("pilihKecamatan");
const inputKataKunci = document.getElementById("kataKunci");
const tombolCari = document.getElementById("tombolCari");
const pesanError = document.getElementById("pesanError");
const bagianHasil = document.getElementById("bagianHasil");
const ringkasanHasil = document.getElementById("ringkasanHasil");
const daftarHasil = document.getElementById("daftarHasil");


// fungsi buat ngosongin dropdown, sisain option pertama aja
function kosongkanDropdown(dropdown, teksAwal) {
    dropdown.innerHTML = "";
    let opsi = document.createElement("option");
    opsi.value = "";
    opsi.textContent = teksAwal;
    dropdown.appendChild(opsi);
}

// fungsi buat isi dropdown dari array nama
function isiDropdown(dropdown, daftarNama) {
    daftarNama.forEach(function (nama) {
        let opsi = document.createElement("option");
        opsi.value = nama;
        opsi.textContent = nama;
        dropdown.appendChild(opsi);
    });
}


// pas halaman dibuka, isi dropdown provinsi
isiDropdown(pilihProvinsi, Object.keys(dataKodePos));


// kalau provinsi dipilih -> isi kota
pilihProvinsi.addEventListener("change", function () {
    kosongkanDropdown(pilihKota, "-- Pilih Kota/Kabupaten --");
    kosongkanDropdown(pilihKecamatan, "-- Pilih Kecamatan --");
    pilihKecamatan.disabled = true;

    let provinsi = pilihProvinsi.value;
    if (provinsi === "") {
        pilihKota.disabled = true;
        return;
    }

    isiDropdown(pilihKota, Object.keys(dataKodePos[provinsi]));
    pilihKota.disabled = false;
});


// kalau kota dipilih -> isi kecamatan
pilihKota.addEventListener("change", function () {
    kosongkanDropdown(pilihKecamatan, "-- Pilih Kecamatan --");

    let provinsi = pilihProvinsi.value;
    let kota = pilihKota.value;
    if (kota === "") {
        pilihKecamatan.disabled = true;
        return;
    }

    isiDropdown(pilihKecamatan, Object.keys(dataKodePos[provinsi][kota]));
    pilihKecamatan.disabled = false;
});


// fungsi utama buat nyari kode pos
function cariKodePos() {
    let provinsi = pilihProvinsi.value;
    let kota = pilihKota.value;
    let kecamatan = pilihKecamatan.value;
    let kataKunci = inputKataKunci.value.trim().toLowerCase();

    pesanError.textContent = "";

    // minimal harus pilih provinsi atau ketik kata kunci
    if (provinsi === "" && kataKunci === "") {
        pesanError.textContent = "Pilih provinsi atau masukkan kata kunci dulu ya";
        bagianHasil.style.display = "none";
        return;
    }

    let hasil = [];

    // loop semua data, terus saring sesuai pilihan user
    for (let namaProv in dataKodePos) {
        if (provinsi !== "" && namaProv !== provinsi) continue;

        for (let namaKota in dataKodePos[namaProv]) {
            if (kota !== "" && namaKota !== kota) continue;

            for (let namaKec in dataKodePos[namaProv][namaKota]) {
                if (kecamatan !== "" && namaKec !== kecamatan) continue;

                let daftarKel = dataKodePos[namaProv][namaKota][namaKec];
                daftarKel.forEach(function (item) {
                    // cek kata kunci, bisa nama kelurahan atau kode posnya
                    let cocok = kataKunci === "" ||
                        item.kelurahan.toLowerCase().includes(kataKunci) ||
                        item.kodePos.includes(kataKunci);

                    if (cocok) {
                        hasil.push({
                            kelurahan: item.kelurahan,
                            kodePos: item.kodePos,
                            kecamatan: namaKec,
                            kota: namaKota,
                            provinsi: namaProv
                        });
                    }
                });
            }
        }
    }

    tampilkanHasil(hasil, inputKataKunci.value.trim());
}


// fungsi buat nampilin hasil dalam bentuk card
function tampilkanHasil(hasil, kataKunci) {
    bagianHasil.style.display = "block";
    daftarHasil.innerHTML = "";

    let teksKunci = kataKunci !== "" ? ' dengan kata kunci "' + kataKunci + '"' : "";

    if (hasil.length === 0) {
        ringkasanHasil.textContent = "Hasil pencarian kode pos" + teksKunci + " tidak ditemukan.";
        let kosong = document.createElement("div");
        kosong.className = "kosong";
        kosong.textContent = "Data tidak ditemukan :(";
        daftarHasil.appendChild(kosong);
        return;
    }

    ringkasanHasil.textContent = "Hasil pencarian kode pos" + teksKunci +
        " telah ditemukan sebanyak " + hasil.length + " buah.";

    hasil.forEach(function (item) {
        let kartu = document.createElement("div");
        kartu.className = "kartu";

        let judul = document.createElement("div");
        judul.className = "kartu-judul";
        judul.textContent = item.kelurahan;

        let isi = document.createElement("div");
        isi.className = "kartu-isi";

        let kode = document.createElement("div");
        kode.className = "kode";
        kode.textContent = item.kodePos;

        let detail = document.createElement("p");
        detail.textContent = "Kelurahan " + item.kelurahan + ", Kecamatan " + item.kecamatan +
            ", " + item.kota + ", " + item.provinsi;

        isi.appendChild(kode);
        isi.appendChild(detail);
        kartu.appendChild(judul);
        kartu.appendChild(isi);
        daftarHasil.appendChild(kartu);
    });
}


// tombol cari diklik
tombolCari.addEventListener("click", cariKodePos);

// biar bisa cari pakai tombol enter juga
inputKataKunci.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        cariKodePos();
    }
});