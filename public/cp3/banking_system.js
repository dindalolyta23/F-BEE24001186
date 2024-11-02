const { resolve } = require('path');
const BankAccount = require('./bank_account')
const account = new BankAccount("12","Dinda Lolyta Buma Lestari",2000000)
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask(questionText){
    return new Promise(resolve => rl.question(questionText, answer => resolve(answer)));
}

function displaySaldo(){
    console.log(account.getBalance())
}

async function tambahSaldo() {
    let jumlah = parseFloat(await ask("Masukkan jumlah saldo yang ingin ditambahkan: "));
    try {
        let message = await account.deposit(jumlah); // Tunggu hasil Promise dari deposit()
        console.log(message);
        displaySaldo(); // Perbarui saldo setelah penambahan berhasil
    } catch (error) {
        console.log(error); // Tampilkan pesan error jika terjadi kesalahan
    }
}

// Fungsi untuk mengakses metode withdraw di kelas BankAccount dengan async/await
async function kurangiSaldo() {
    let jumlah = parseFloat(await ask("Masukkan jumlah saldo yang ingin dikurangi: "));
    try {
        let message = await account.withdraw(jumlah); // Tunggu hasil Promise dari withdraw()
        console.log(message);
        displaySaldo(); // Perbarui saldo setelah pengurangan berhasil
    } catch (error) {
        console.log(error); // Tampilkan pesan error jika terjadi kesalahan
    }
}

async function main(){
    while (true) {
        console.log("\nTentukan Pilihan Anda:");
        console.log("1. Ambil Saldo");
        console.log("2. Setor Saldo");
        console.log("3. Tampil Saldo");
        console.log("4. Keluar");

        const pilihan = parseInt(await ask("Masukkan Pilihan Anda: "));
        switch (pilihan) {
            case 1:
                await kurangiSaldo();
                break;
            case 2:
                await tambahSaldo();
                break;
            case 3:
                displaySaldo();
                break;
            case 4:
                console.log("Keluar dari sistem.");
                rl.close(); // Tutup readline interface
                return; // Keluar dari program
            default:
                console.log("Pilihan tidak valid, silakan coba lagi.");
        }
    }
}

main()