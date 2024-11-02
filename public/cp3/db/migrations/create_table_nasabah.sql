-- CREATE TABLE Nasabah
CREATE TABLE IF NOT EXISTS Nasabah (
    ID_Nasabah SERIAL PRIMARY KEY,  -- Menggunakan SERIAL untuk auto-increment
    Nama VARCHAR(100),
    Alamat VARCHAR(255),
    No_Telepon VARCHAR(20),
    Email VARCHAR(100),
    Tanggal_Lahir DATE
);
CREATE INDEX idx_akun_id_nasabah ON Akun(ID_Nasabah);

//DROP TABLE IF EXISTS Nasabah;
