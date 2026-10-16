const form = document.getElementById("formDaftar");
const inputNama = document.getElementById("nama");
const inputUsername = document.getElementById("username");
const inputEmail = document.getElementById("email");
const inputHp = document.getElementById("noHp");
const inputTgl = document.getElementById("tglLahir");
const inputPassword = document.getElementById("password");
const inputKonfirmasi = document.getElementById("konfirmasi");
const cekLihat = document.getElementById("lihatPassword");
const cekSetuju = document.getElementById("setuju");
const kotakHasil = document.getElementById("hasil");


function tampilError(input, idError, pesan) {
    document.getElementById(idError).textContent = pesan;
    if (input) {
        input.classList.add("salah");
        input.classList.remove("benar");
    }
}

function hapusError(input, idError) {
    document.getElementById(idError).textContent = "";
    if (input) {
        input.classList.remove("salah");
        input.classList.add("benar");
    }
}


function cekNama() {
    let nama = inputNama.value.trim();
    let polaNama = /^[a-zA-Z\s]+$/;

    if (nama === "") {
        tampilError(inputNama, "errorNama", "Nama tidak boleh kosong");
        return false;
    } else if (!polaNama.test(nama)) {
        tampilError(inputNama, "errorNama", "Nama hanya boleh berisi huruf");
        return false;
    } else if (nama.length < 3) {
        tampilError(inputNama, "errorNama", "Nama minimal 3 huruf");
        return false;
    }
    hapusError(inputNama, "errorNama");
    return true;
}

function cekUsername() {
    let username = inputUsername.value.trim();
    let polaUsername = /^[a-zA-Z0-9_]+$/;

    if (username === "") {
        tampilError(inputUsername, "errorUsername", "Username tidak boleh kosong");
        return false;
    } else if (username.length < 5) {
        tampilError(inputUsername, "errorUsername", "Username minimal 5 karakter");
        return false;
    } else if (!polaUsername.test(username)) {
        tampilError(inputUsername, "errorUsername", "Username hanya boleh huruf, angka, dan _");
        return false;
    }
    hapusError(inputUsername, "errorUsername");
    return true;
}

function cekEmail() {
    let email = inputEmail.value.trim();
    let polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        tampilError(inputEmail, "errorEmail", "Email tidak boleh kosong");
        return false;
    } else if (!polaEmail.test(email)) {
        tampilError(inputEmail, "errorEmail", "Format email tidak valid");
        return false;
    }
    hapusError(inputEmail, "errorEmail");
    return true;
}

function cekHp() {
    let hp = inputHp.value.trim();
    let polaHp = /^08[0-9]{8,11}$/;

    if (hp === "") {
        tampilError(inputHp, "errorHp", "Nomor HP tidak boleh kosong");
        return false;
    } else if (!polaHp.test(hp)) {
        tampilError(inputHp, "errorHp", "Nomor HP harus diawali 08 dan berisi 10-13 angka");
        return false;
    }
    hapusError(inputHp, "errorHp");
    return true;
}

function cekTanggal() {
    let tgl = inputTgl.value;

    if (tgl === "") {
        tampilError(inputTgl, "errorTgl", "Tanggal lahir harus diisi");
        return false;
    }

    let lahir = new Date(tgl);
    let sekarang = new Date();
    let umur = sekarang.getFullYear() - lahir.getFullYear();
    let selisihBulan = sekarang.getMonth() - lahir.getMonth();
    if (selisihBulan < 0 || (selisihBulan === 0 && sekarang.getDate() < lahir.getDate())) {
        umur--;
    }

    if (lahir > sekarang) {
        tampilError(inputTgl, "errorTgl", "Tanggal lahir tidak boleh di masa depan");
        return false;
    } else if (umur < 13) {
        tampilError(inputTgl, "errorTgl", "Umur minimal 13 tahun untuk mendaftar");
        return false;
    }
    hapusError(inputTgl, "errorTgl");
    return true;
}

function cekGender() {
    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender === null) {
        tampilError(null, "errorGender", "Pilih jenis kelamin");
        return false;
    }
    hapusError(null, "errorGender");
    return true;
}

function cekPassword() {
    let pass = inputPassword.value;

    if (pass === "") {
        tampilError(inputPassword, "errorPassword", "Password tidak boleh kosong");
        return false;
    } else if (pass.length < 8) {
        tampilError(inputPassword, "errorPassword", "Password minimal 8 karakter");
        return false;
    } else if (!/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
        tampilError(inputPassword, "errorPassword", "Password harus ada huruf besar dan angka");
        return false;
    }
    hapusError(inputPassword, "errorPassword");
    return true;
}

function cekKonfirmasi() {
    let konfirmasi = inputKonfirmasi.value;

    if (konfirmasi === "") {
        tampilError(inputKonfirmasi, "errorKonfirmasi", "Konfirmasi password harus diisi");
        return false;
    } else if (konfirmasi !== inputPassword.value) {
        tampilError(inputKonfirmasi, "errorKonfirmasi", "Password tidak sama");
        return false;
    }
    hapusError(inputKonfirmasi, "errorKonfirmasi");
    return true;
}

function cekPersetujuan() {
    if (!cekSetuju.checked) {
        tampilError(null, "errorSetuju", "Kamu harus menyetujui syarat dan ketentuan");
        return false;
    }
    hapusError(null, "errorSetuju");
    return true;
}


function hitungKekuatan() {
    let pass = inputPassword.value;
    let skor = 0;

    if (pass.length >= 8) skor++;
    if (/[A-Z]/.test(pass)) skor++;
    if (/[a-z]/.test(pass)) skor++;
    if (/[0-9]/.test(pass)) skor++;
    if (/[^a-zA-Z0-9]/.test(pass)) skor++; 

    let bar = document.getElementById("isiBar");
    let teks = document.getElementById("teksKekuatan");

    if (pass === "") {
        bar.style.width = "0";
        teks.textContent = "";
    } else if (skor <= 2) {
        bar.style.width = "33%";
        bar.style.background = "#e74c3c";
        teks.textContent = "Lemah";
        teks.style.color = "#e74c3c";
    } else if (skor <= 4) {
        bar.style.width = "66%";
        bar.style.background = "#f39c12";
        teks.textContent = "Sedang";
        teks.style.color = "#f39c12";
    } else {
        bar.style.width = "100%";
        bar.style.background = "#2ecc71";
        teks.textContent = "Kuat";
        teks.style.color = "#2ecc71";
    }
}


inputNama.addEventListener("blur", cekNama);
inputUsername.addEventListener("blur", cekUsername);
inputEmail.addEventListener("blur", cekEmail);
inputHp.addEventListener("blur", cekHp);
inputTgl.addEventListener("change", cekTanggal);
inputKonfirmasi.addEventListener("input", cekKonfirmasi);

inputPassword.addEventListener("input", function () {
    hitungKekuatan();
    if (inputKonfirmasi.value !== "") cekKonfirmasi();
});

inputHp.addEventListener("input", function () {
    inputHp.value = inputHp.value.replace(/[^0-9]/g, "");
});

cekLihat.addEventListener("change", function () {
    let tipe = cekLihat.checked ? "text" : "password";
    inputPassword.type = tipe;
    inputKonfirmasi.type = tipe;
});

document.querySelectorAll('input[name="gender"]').forEach(function (radio) {
    radio.addEventListener("change", cekGender);
});
cekSetuju.addEventListener("change", cekPersetujuan);


form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    let hasilCek = [
        cekNama(),
        cekUsername(),
        cekEmail(),
        cekHp(),
        cekTanggal(),
        cekGender(),
        cekPassword(),
        cekKonfirmasi(),
        cekPersetujuan()
    ];

    let semuaValid = hasilCek.every(function (x) { return x === true; });

    if (!semuaValid) {
        kotakHasil.style.display = "none";
        alert("Masih ada data yang salah, cek lagi ya!");
        return;
    }

    let gender = document.querySelector('input[name="gender"]:checked').value;

    kotakHasil.innerHTML =
        "<h3>Registrasi Berhasil!</h3>" +
        "<table>" +
        "<tr><td>Nama</td><td>: " + inputNama.value.trim() + "</td></tr>" +
        "<tr><td>Username</td><td>: " + inputUsername.value.trim() + "</td></tr>" +
        "<tr><td>Email</td><td>: " + inputEmail.value.trim() + "</td></tr>" +
        "<tr><td>No HP</td><td>: " + inputHp.value + "</td></tr>" +
        "<tr><td>Tgl Lahir</td><td>: " + inputTgl.value + "</td></tr>" +
        "<tr><td>Gender</td><td>: " + gender + "</td></tr>" +
        "</table>";
    kotakHasil.style.display = "block";

    form.reset();
    hitungKekuatan();

    document.querySelectorAll("input").forEach(function (inp) {
        inp.classList.remove("benar", "salah");
    });
});

form.addEventListener("reset", function () {
    document.querySelectorAll(".pesan-error").forEach(function (el) {
        el.textContent = "";
    });
    document.querySelectorAll("input").forEach(function (inp) {
        inp.classList.remove("benar", "salah");
    });
    setTimeout(hitungKekuatan, 0);
    kotakHasil.style.display = "none";
});
