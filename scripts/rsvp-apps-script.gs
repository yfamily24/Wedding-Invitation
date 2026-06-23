/**
 * RSVP -> Google Sheets  (Undangan Ilham & Devi)  + ANTI-SPAM
 * ----------------------------------------------------------------
 * CARA PAKAI (deploy ulang setelah mengganti kode ini):
 * 1. Spreadsheet -> Extensions -> Apps Script.
 * 2. Hapus kode lama, TEMPEL seluruh isi file ini, Save.
 * 3. Deploy -> Manage deployments -> Edit (pensil) -> Version: "New version"
 *    -> Deploy.  (Who has access tetap "Anyone".)
 *    URL /exec tetap sama, jadi tidak perlu ubah config.js.
 *
 * PENTING:
 * - TOKEN di bawah HARUS sama persis dengan config.rsvp.token di situs.
 * - Kolom "Approved" (F) adalah moderasi: dinding publik (jika nanti dibuat)
 *   HANYA menampilkan baris yang Approved = TRUE.
 *   Tips: blok kolom F -> menu Insert -> Checkbox, agar mudah dicentang.
 * - Kolom "Flag" (G) berisi "SPAM?" bila terdeteksi mengandung link/kata judi,
 *   supaya gampang kamu sortir & hapus.
 */

var SHEET_ID = '19-P8h4lZZn6Xj96ghXoFpCJ5bAmMy9tcUicemRYUL_A';
var SHEET_NAME = 'RSVP';
var TOKEN = 'ilhamdevi-2026-r5v9'; // <-- harus sama dgn config.rsvp.token

var HEADERS = ['Waktu', 'Nama', 'Kehadiran', 'Jumlah Tamu', 'Ucapan & Doa', 'Approved', 'Flag'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = JSON.parse(e.postData.contents);

    // --- Lapisan 1: token rahasia (tolak bot yg tembak URL langsung) ---
    if (data.token !== TOKEN) {
      return json({ result: 'ignored' }); // diam-diam diabaikan
    }
    // --- Lapisan 2: honeypot (field tersembunyi; kalau terisi = bot) ---
    if (data.website) {
      return json({ result: 'ignored' });
    }

    // --- Lapisan 3: filter konten (link / kata judi-phishing) ---
    var flag = (isSpam(data.message) || isSpam(data.name)) ? 'SPAM?' : '';

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    ensureHeaders(sheet);

    // --- Lapisan 4: moderasi -> Approved default FALSE ---
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.attend || '',
      data.guests || '',
      data.message || '',
      false,
      flag
    ]);

    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

/** true bila teks mengandung link/URL atau kata kunci judi/phishing. */
function isSpam(text) {
  if (!text) return false;
  var t = String(text).toLowerCase();
  // link / URL — wedding wish hampir tak pernah berisi link
  if (/https?:\/\/|www\.|t\.me|wa\.me|bit\.ly|\b[a-z0-9-]+\.(com|net|org|xyz|io|live|club|vip|link|me|id|site|online|store|info)\b/i.test(t)) {
    return true;
  }
  var bad = ['judi', 'slot', 'gacor', 'togel', 'casino', 'kasino', 'jackpot',
    'maxwin', 'pragmatic', 'rtp ', 'depo', 'deposit', 'withdraw', 'bandar',
    'new member', 'link alternatif', 'situs resmi', 'akun pro', 'scatter',
    'zeus', 'olympus', 'cuan', 'wd '];
  for (var i = 0; i < bad.length; i++) {
    if (t.indexOf(bad[i]) >= 0) return true;
  }
  return false;
}

/**
 * GET:
 *  - tanpa parameter  -> status endpoint.
 *  - ?wishes=1        -> daftar ucapan yg sudah di-approve (untuk dinding publik nanti).
 *    Mendukung ?callback=fn (JSONP) agar bisa dibaca lintas-domain dari situs.
 */
function doGet(e) {
  if (e && e.parameter && e.parameter.wishes === '1') {
    return wishesJson(e);
  }
  return json({ status: 'ok', message: 'RSVP endpoint aktif' });
}

function wishesJson(e) {
  var out = [];
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet && sheet.getLastRow() > 1) {
    var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues();
    rows.forEach(function (r) {
      if (r[5] === true && r[4]) { // Approved == TRUE && ada ucapan
        out.push({ name: r[1], attend: r[2], message: r[4] });
      }
    });
  }
  var payload = JSON.stringify({ result: 'success', wishes: out });
  var cb = e && e.parameter && e.parameter.callback;
  if (cb) {
    return ContentService.createTextOutput(cb + '(' + payload + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json(JSON.parse(payload));
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
