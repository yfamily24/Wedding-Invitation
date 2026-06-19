// ============================================================
//  Edit everything about the invitation here in one place.
// ============================================================
export const config = {
  groom: {
    name: 'Ilham Ramadhan',
    father: 'Ramadi Yudo',
    mother: 'Ima Suryati',
  },
  bride: {
    name: 'Devi Ajeng Juwitasari',
    father: 'Hari Suhartono',
    mother: 'Titi Hayati',
  },

  // Target date/time of the wedding (ISO 8601, WIB = +07:00)
  weddingDate: '2026-11-14T09:00:00+07:00',
  dateLabel: 'Sabtu, 14 November 2026',

  events: [
    {
      title: 'Akad Nikah',
      day: '14',
      dateLabel: 'Sabtu, 14 November 2026',
      time: 'Pukul 08.00 – 10.00 WIB',
      note: '',
    },
    {
      title: 'Resepsi',
      day: '14',
      dateLabel: 'Sabtu, 14 November 2026',
      time: 'Pukul 11.00 – 14.00 WIB',
      note: '',
    },
  ],

  venue: {
    name: 'Hotel Bumi Bandhawa',
    address: ['Jl. Konstitusi I No.16, Cigadung,', 'Kec. Cibeunying Kaler, Kota Bandung,', 'Jawa Barat 40191'],
    mapsEmbed:
      'https://maps.google.com/maps?q=Hotel%20Bumi%20Bandhawa%20Jl.%20Konstitusi%20I%20No.16%20Bandung&t=&z=15&ie=UTF8&iwloc=&output=embed',
    mapsLink:
      'https://www.google.com/maps/search/?api=1&query=Hotel+Bumi+Bandhawa+Jl.+Konstitusi+I+No.16+Cigadung+Bandung',
  },

  music: {
    src: 'assets/song.mp3',
    title: 'Canon in D Major',
    artist: 'Kevin MacLeod',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    licenseLabel: 'CC BY 4.0',
  },

  rsvp: {
    // Web App URL hasil deploy Google Apps Script (berakhiran /exec).
    // Pastikan deployment di-set "Who has access: Anyone".
    endpoint:
      'https://script.google.com/macros/s/AKfycbzvxWA1aChoEI_dRqOiRp0BR47ZvuUJncJR1cWZplGCIqLTtn8lEC0vWJmMswe8rxBA3Q/exec',
  },

  verse: {
    text:
      'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
    ref: 'Q.S. AR-RUM : 21',
  },
}
