# Backend notifikasi Telegram (Vercel)

Paket ini mengirim **notifikasi status saja** ke Telegram setelah Formspree berhasil menerima formulir.
Kode referensi enam digit, OTP, PIN, kata sandi, nomor telepon, dan isi formulir tidak dikirim ke Telegram.

## Isi paket
- `index.html` — halaman HTML yang sudah diperbarui: ikon dihapus, aksen hijau toska, tombol Konfirmasi.
- `api/telegram.js` — endpoint backend yang mengirim notifikasi status tetap ke Telegram.
- `vercel.json` — konfigurasi fungsi Vercel.

## Cara memasang di Vercel
1. Buat folder proyek berisi file-file dari paket ini, lalu unggah/push ke repositori Git.
2. Impor repositori tersebut di Vercel dan lakukan Deploy.
3. Di Vercel, buka **Project → Settings → Environment Variables**.
4. Tambahkan:
   - `TELEGRAM_BOT_TOKEN` = token bot Telegram (rahasia; jangan pernah ditaruh di HTML).
   - `TELEGRAM_CHAT_ID` = ID chat/grup tujuan notifikasi.
5. Redeploy setelah Environment Variables disimpan.
6. Pastikan halaman HTML ini di-host pada proyek Vercel yang sama dengan endpoint `/api/telegram`.
   Jika halaman berada di domain berbeda, endpoint perlu disesuaikan dan diberi pembatasan origin/CORS.

## Mendapatkan chat ID
- Kirim `/start` ke bot Telegram.
- Untuk mengetahui chat ID, gunakan bot/alat tepercaya atau panggil `getUpdates` dari lingkungan aman setelah mengirim pesan ke bot.
- Untuk grup, tambahkan bot ke grup dan pastikan bot memiliki izin mengirim pesan.

## Pengujian
Setelah deploy, tekan **Konfirmasi** pada halaman. Jika Formspree berhasil, backend akan mengirim notifikasi status ke chat Telegram, lalu browser diarahkan ke `https://kode-resi.vercel.app`.

Jangan gunakan endpoint ini untuk meneruskan OTP, PIN, kata sandi, atau kode autentikasi. Endpoint sengaja hanya menerima satu jenis event status tetap.
