import Divider from './Divider'

const photos = [1, 2, 3, 4, 5, 6]

export default function Gallery() {
  return (
    <section id="gallery">
      <div className="center">
        <h2 className="serif reveal" style={{ fontSize: 34, color: 'var(--green)', marginTop: 6 }}>
          Galeri
        </h2>
        <Divider />
      </div>
      <div className="gallery-grid">
        {photos.map((n) => (
          <img
            key={n}
            className="gallery-img reveal"
            src={`assets/${n}_gallery.jpg`}
            alt={`Galeri ${n}`}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  )
}
