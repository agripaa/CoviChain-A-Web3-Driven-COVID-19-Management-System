# CoviChain: A Web3-Driven COVID-19 Management System

CoviChain adalah aplikasi **CRUD** untuk pengelolaan data COVID-19 berbasis **Web3**. Proyek ini memadukan konsep blockchain dengan mekanisme pencatatan data pasien, hasil tes, serta status vaksinasi. Dengan CoviChain, setiap data yang disimpan memiliki integritas tinggi karena tercatat di jaringan blockchain, serta memudahkan pemilik data untuk memiliki kendali penuh atas informasi mereka.

## Fitur Utama

1. **Register & Login**  
   - Pengguna dapat mendaftarkan diri melalui *smart contract* dan login menggunakan **Metamask**.  
   - Setiap pengguna memiliki alamat dompet (wallet) unik sebagai identitas.

2. **CRUD Data COVID-19**  
   - **Create**: Tambah data pasien baru, termasuk ID pasien, hasil tes, tanggal tes, dan status vaksin.  
   - **Read**: Lihat seluruh data yang tersimpan atau cari data tertentu berdasarkan ID pasien.  
   - **Update**: Edit data yang sudah ada jika Anda adalah pemilik (owner) data tersebut.  
   - **Delete**: Hapus data jika Anda adalah pemilik. Sistem akan menolak aksi ini apabila Anda tidak memiliki hak kepemilikan.

3. **Keamanan & Transparansi**  
   - Pemilik data memiliki kendali penuh untuk mengedit atau menghapus data mereka.  
   - Setiap transaksi tercatat di blockchain, meningkatkan kepercayaan dan *auditability*.

## Persyaratan Sistem

- **Node.js** (disarankan versi LTS)
- **Hardhat** atau **Ganache** untuk jaringan lokal
- **Metamask** sebagai ekstensi browser untuk berinteraksi dengan dApp

## Cara Menjalankan

1. **Kloning Repo**  
```bash
git clone https://github.com/agripaa/CoviChain-A-Web3-Driven-COVID-19-Management-System.git
cd CoviChain-A-Web3-Driven-COVID-19-Management-System
```
2. **Instal Dependensi**
```bash
npm install
```
3. **Jalankan Server / Hardhat Node**
```bash
npx hardhat node
```
4. **Deploy Kontrak**
```bash
npx hardhat run scripts/deploy.js --network localhost
```
5. **Deploy Kontrak**
```bash
cd client
npm install
npm run dev
```
6. **Akses dApp**
Buka browser di **http://localhost:3000** dan pastikan Metamask terhubung ke jaringan lokal.

## Kontribusi
Ajukan *issue* atau *pull request* untuk perbaikan.  
Silakan laporkan bug atau saran di [Discussion/Issue tracker](./issues).

## Author
- **Website**: [agrievaxananda.tech](https://agrievaxananda.tech)  
- **Instagram**: [@this.agi](https://instagram.com/this.agi)  
- **GitHub**: [agripaa](https://github.com/agripaa)

## Lisensi
Proyek ini dilisensikan di bawah [MIT License](./LICENSE). Anda dapat memodifikasi, menggunakan, dan mendistribusikan sesuai kebutuhan Anda.

