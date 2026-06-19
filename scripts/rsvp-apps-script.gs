/**
 * RSVP -> Google Sheets  (Undangan Ilham & Devi)
 * ----------------------------------------------------------------
 * CARA PAKAI:
 * 1. Buka spreadsheet-mu di browser.
 * 2. Menu: Extensions (Ekstensi) -> Apps Script.
 * 3. Hapus kode contoh, lalu TEMPEL seluruh isi file ini.
 * 4. Klik Save (ikon disket).
 * 5. Klik "Deploy" -> "New deployment".
 *    - Pilih type: "Web app".
 *    - Description: bebas (mis. "RSVP").
 *    - Execute as: "Me".
 *    - Who has access: "Anyone".  <-- WAJIB, agar form bisa kirim.
 *    - Klik Deploy, lalu Authorize/izinkan akses ke Google-mu.
 * 6. SALIN "Web app URL" yang muncul (berakhiran /exec).
 *    Tempel URL itu ke: src/config.js  ->  rsvp.endpoint
 *
 * Untuk uji cepat: buka Web app URL di browser, harus muncul
 * {"status":"ok",...}.  Setiap submit form menambah 1 baris.
 */

var SHEET_ID = '19-P8h4lZZn6Xj96ghXoFpCJ5bAmMy9tcUicemRYUL_A';
var SHEET_NAME = 'RSVP';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // hindari tabrakan saat banyak tamu submit bersamaan
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // tulis header sekali kalau sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Waktu', 'Nama', 'Kehadiran', 'Jumlah Tamu', 'Ucapan & Doa']);
    }

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.attend || '',
      data.guests || '',
      data.message || ''
    ]);

    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json({ status: 'ok', message: 'RSVP endpoint aktif' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
