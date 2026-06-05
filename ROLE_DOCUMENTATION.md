# Dokumentasi Hak Akses Role (RBAC) - NPMS

Nippon Production Monitoring System (NPMS) mengimplementasikan Role-Based Access Control (RBAC) untuk menjaga integritas data lantai produksi (shop floor) dan memastikan alur kerja First-In-First-Out (FIFO) berjalan sesuai prosedur perusahaan PT. Indonesia Nippon Seiki.

Berikut adalah rincian fungsionalitas, tanggung jawab, dan menu akses untuk masing-masing role:

---

## Ringkasan Matriks Akses Menu

| Menu / Halaman | Operator (operator) | Supervisor (supervisor) | Manager (manager) |
| :--- | :---: | :---: | :---: |
| **Dashboard** | Ya | Ya | Ya |
| **Part Input** (Part In / Sub-Assy) | Ya | Tidak | Tidak |
| **FIFO Check** (Validasi Sequence) | Ya | Ya | Tidak |
| **Part Out** (Part Out / Assy) | Ya | Tidak | Tidak |
| **Production Data** (Log Transaksi) | Tidak | Ya | Ya |
| **Reports** (Cetak & Ekspor Laporan) | Tidak | Ya | Ya |
| **Settings** (Pengaturan System & User) | Tidak | Tidak | Ya |

---

## Detail Fungsionalitas Setiap Role

### 1. Operator (`operator`)
* **Fungsi Utama**: Melaksanakan transaksi harian penerimaan (Part In) dan pengeluaran barang (Part Out) di area produksi serta memeriksa kesesuaian alur FIFO.
* **Menu Yang Didapat**:
  * **Dashboard**: Memantau ringkasan pencapaian produksi harian dan status jalur perakitan.
  * **Part Input**: Menginput komponen yang baru masuk dari jalur Sub-Assy dengan memindai barcode / lot (format `SC1 126-xx`) untuk didata ke dalam bucket penyimpanan.
  * **FIFO Check**: Memindai lot nomor untuk memvalidasi posisi antrean bahan baku sebelum digunakan di lini Assy.
  * **Part Out**: Mencatat pengeluaran komponen yang dikirim ke jalur perakitan (Assy) serta mendapatkan peringatan jika melanggar urutan FIFO.
* **Prosedur Kerja Yang Harus Dilakukan**:
  1. Setiap awal shift, lakukan login menggunakan akun operator.
  2. Ketika ada komponen Sub-Assy baru selesai dibuat, buka menu **Part Input** dan scan barcode untuk mendaftarkannya ke database (Bucket lokasi akan teralokasi otomatis).
  3. Sebelum mengirimkan material ke jalur Perakitan (Assy), lakukan pemindaian di menu **FIFO Check**.
  4. Jika sistem menyatakan status **Compliant (Ready to use)**, gunakan material tersebut dan catat pengeluarannya di menu **Part Out**.
  5. Jika sistem memberikan peringatan **Warning / FIFO Violation**, laporkan ke **Supervisor** untuk mendapatkan persetujuan manual (approval queue).

### 2. Supervisor (`supervisor`)
* **Fungsi Utama**: Mengontrol kedisiplinan alur FIFO, meninjau log riwayat produksi, mengevaluasi peringatan (alerts), dan menyetujui pelepasan material yang tertahan.
* **Menu Yang Didapat**:
  * **Dashboard**: Memantau tingkat kepatuhan FIFO (FIFO Compliance rate) secara real-time dan meninjau daftar alert aktif.
  * **Production Data**: Melihat seluruh riwayat transaksi masuk dan keluar secara mendetail.
  * **FIFO Check**: Melakukan audit lot antrean material di area penyimpanan.
  * **Reports**: Meninjau laporan produksi harian/mingguan/bulanan, mencetak label kode QR, dan mengekspor laporan ke format PDF/Excel.
* **Prosedur Kerja Yang Harus Dilakukan**:
  1. Pantau status dashboard secara berkala, terutama persentase kepatuhan FIFO (FIFO Compliance Rate).
  2. Jika muncul **FIFO Violation** atau **Low Stock Warning** pada panel notifikasi / alerts, lakukan pengecekan fisik ke bucket lokasi di gudang penyimpanan.
  3. Lakukan audit harian menggunakan menu **Production Data** untuk melacak produktivitas operator.
  4. Unduh dan cetak laporan berkala di menu **Reports** sebagai dokumentasi meeting koordinasi harian.

### 3. Manager (`manager`)
* **Fungsi Utama**: Menganalisis efisiensi pabrik secara makro, memonitor kapasitas produksi, serta mengelola konfigurasi sistem dan manajemen user (operator/supervisor).
* **Menu Yang Didapat**:
  * **Dashboard**: Melihat performa produksi dan analitik pabrik secara keseluruhan.
  * **Production Data**: Memantau log transaksi lengkap sebagai bahan audit tingkat tinggi.
  * **Reports**: Mengakses seluruh laporan performa bulanan dan tahunan.
  * **Settings**: Mengelola akun pengguna (menambah/mengedit operator & supervisor) serta mengonfigurasi kapasitas mesin dan jumlah operator aktif di setiap lintasan produksi (`SC-1`, `SS-2`, dll.).
* **Prosedur Kerja Yang Harus Dilakukan**:
  1. Gunakan menu **Settings** untuk mendaftarkan akun operator atau supervisor baru yang bertugas di pabrik.
  2. Evaluasi kapasitas lintasan produksi di menu **Settings (Production Lines)** jika terjadi bottleneck atau penurunan efisiensi.
  3. Tinjau performa bulanan di menu **Reports** untuk perencanaan kapasitas produksi (Capacity Planning) jangka panjang.
