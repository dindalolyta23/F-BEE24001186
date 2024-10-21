-- CREATE TABLE Transaksi
CREATE TABLE IF NOT EXISTS Transaksi (
    ID_Transaksi SERIAL PRIMARY KEY,  -- Menggunakan SERIAL untuk auto-increment
    ID_Akun INT,
    Tipe_Transaksi VARCHAR(10),
    Jumlah DECIMAL(15, 2),
    Tanggal_Transaksi DATE,
    FOREIGN KEY (ID_Akun) REFERENCES Akun(ID_Akun)
);
CREATE INDEX idx_transaksi_id_akun ON Transaksi(ID_Akun);

//DROP TABLE IF EXISTS Transaksi;
