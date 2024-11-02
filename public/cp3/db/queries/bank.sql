-- Insert Nasabah tanpa mencantumkan kolom ID_Nasabah, biarkan auto-increment menanganinya
INSERT INTO Nasabah (Nama, Alamat, No_Telepon, Email, Tanggal_Lahir)
VALUES ('John Doe', 'Jl. Merdeka No.123', '081234567890', 'john@example.com', '1985-10-15');

-- Insert data Akun terkait Nasabah dan ambil ID_Akun yang dihasilkan
INSERT INTO Akun (ID_Nasabah, Tipe_Akun, Saldo, Tanggal_Dibuat)
VALUES (1, 'Tabungan', 5000000, '2024-01-01');

-- Mengambil ID_Akun yang baru saja dimasukkan
-- (Jika menggunakan PostgreSQL, kita bisa menggunakan RETURNING)
-- Kita akan menggunakan asumsi bahwa ID_Akun yang dihasilkan adalah 1 (karena ini adalah insert pertama)
INSERT INTO Transaksi (ID_Akun, Tipe_Transaksi, Jumlah, Tanggal_Transaksi)
VALUES (1, 'Kredit', 1000000, '2024-01-05');

-- Select data Nasabah beserta Akun yang dimiliki
SELECT Nasabah.Nama, Akun.ID_Akun, Akun.Saldo
FROM Nasabah
JOIN Akun ON Nasabah.ID_Nasabah = Akun.ID_Nasabah;

-- Update Saldo Akun dengan menambah Deposit
UPDATE Akun
SET Saldo = Saldo + 500000
WHERE ID_Akun = 1;  -- Ganti dengan ID_Akun yang sesuai

-- Update Saldo Akun dengan menarik Withdraw
UPDATE Akun
SET Saldo = Saldo - 200000
WHERE ID_Akun = 1;  -- Ganti dengan ID_Akun yang sesuai

-- Hapus Transaksi dengan ID tertentu (pastikan ID ini ada di tabel Transaksi)
DELETE FROM Transaksi WHERE ID_Transaksi = 1;  -- Ganti dengan ID_Transaksi yang sesuai


