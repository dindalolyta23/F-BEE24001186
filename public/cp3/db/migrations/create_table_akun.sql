-- CREATE TABLE Akun
CREATE TABLE IF NOT EXISTS Akun (
    ID_Akun SERIAL PRIMARY KEY,  -- Menggunakan SERIAL untuk auto-increment
    ID_Nasabah INT,
    Tipe_Akun VARCHAR(50),
    Saldo DECIMAL(15, 2),
    Tanggal_Dibuat DATE,
    FOREIGN KEY (ID_Nasabah) REFERENCES Nasabah(ID_Nasabah)
);
CREATE INDEX idx_nasabah_nama ON Nasabah(Nama);

//DROP TABLE IF EXISTS Akun;