class BankAccount {
    // Tambahkan parameter di constructor
    constructor(accountNumber, accountHolderName, accountBalance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.saldo = accountBalance; // Gunakan saldo dari parameter (default: 0)
    }

    // Metode untuk menambah saldo (deposit) dengan menggunakan Promise dan setTimeout
    deposit(amount) {
        return new Promise((resolve, reject) => {
            if (amount <= 0 || isNaN(amount)) {
                reject("Jumlah tidak valid. Harap masukkan angka yang lebih besar dari 0.");
            } else {
                setTimeout(() => {
                    this.saldo += amount;
                    resolve(`Rp${amount} berhasil ditambahkan. Saldo Anda sekarang: Rp${this.saldo}`);
                }, 1000); // Simulasi selama 1 detik
            }
        });
    }

    // Metode untuk mengurangi saldo (withdraw) dengan menggunakan Promise dan setTimeout
    withdraw(amount) {
        return new Promise((resolve, reject) => {
            if (amount <= 0 || isNaN(amount)) {
                reject("Jumlah tidak valid. Harap masukkan angka yang lebih besar dari 0.");
            } else if (amount > this.saldo) {
                reject("Jumlah melebihi saldo yang tersedia. Harap masukkan jumlah yang lebih kecil.");
            } else {
                setTimeout(() => {
                    this.saldo -= amount;
                    resolve(`Rp${amount} berhasil dikurangi. Saldo Anda sekarang: Rp${this.saldo}`);
                }, 1000); // Simulasi selama 1 detik
            }
        });
    }

    // Menampilkan saldo saat ini
    getBalance() {
        return `Saldo Anda saat ini: Rp${this.saldo};`
    }

    
}

// Membuat instance dari BankAccount menggunakan constructor baru
let akunBank = new BankAccount("123456", "Dinda Lolyta", 5000); // Mengisi parameter sesuai gambar: accountNumber, accountHolderName, dan saldo awal

// Fungsi untuk menampilkan saldo di halaman
function updateSaldoDisplay() {
    document.getElementById("saldo-display").textContent = akunBank.getBalance();
}

// Fungsi validasi login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "binaracademy" && password === "dindin123") {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("bank-actions").style.display = "block";
    } else {
        alert("Username atau Password salah.");
    }


}

// Fungsi untuk mengakses metode deposit di kelas BankAccount dengan async/await


// Fungsi main() untuk menjalankan program utama
function main() {
    const loginButton = document.getElementById("login-button");
    loginButton.onclick = () => {
        let loginSuccess = login(); // Memanggil fungsi login dan mengecek apakah login berhasil
        if (loginSuccess) {
            alert(`Selamat datang, ${akunBank.accountHolderName}!\nNomor Rekening: ${akunBank.accountNumber}\nSaldo Awal: Rp${akunBank.saldo}`);
            updateSaldoDisplay(); // Menampilkan saldo awal setelah login
        }
    };
}

module.exports = BankAccount