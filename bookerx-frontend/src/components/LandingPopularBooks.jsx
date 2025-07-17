import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from '../theme/colors';

const books = [
  {
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    title: 'The Art of Coding',
    author: 'Jane Doe',
    price: '12.99'
  },
  {
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80',
    title: 'React for Beginners',
    author: 'John Smith',
    price: '15.50'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    title: 'Mastering ASP.NET',
    author: 'Emily Clark',
    price: '18.00'
  },
  {
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
    title: 'Design Patterns',
    author: 'Robert Martin',
    price: '14.75'
  }
];

const LandingPopularBooks = () => (
  <section style={{ background: 'linear-gradient(90deg, #f3eaff 60%, #fff 100%)', padding: '2.5rem 0' }}>
    <div className="container">
      <div className="row justify-content-center mb-4">
        <div className="col-12 text-center">
          <h2 style={{ color: PRIMARY_COLOR, fontWeight: 700, fontSize: '2rem' }}>Popular Books</h2>
          <p style={{ color: SECONDARY_COLOR, fontSize: 16 }}>Discover some of the most loved books by our community.</p>
        </div>
      </div>
      <div className="row justify-content-center g-4">
        {books.map((b, i) => (
          <div key={i} className="col-12 col-sm-6 col-lg-3 d-flex align-items-stretch">
            <div className="card w-100 h-100 text-center p-3" style={{ border: 'none', boxShadow: '0 2px 12px rgba(80,0,120,0.06)' }}>
              <img src={b.image} alt={b.title} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }} />
              <h5 style={{ color: PRIMARY_COLOR, fontWeight: 600 }}>{b.title}</h5>
              <div style={{ color: SECONDARY_COLOR, fontSize: 15, marginBottom: 4 }}>{b.author}</div>
              <div style={{ color: '#43a047', fontWeight: 700, fontSize: 16 }}>${b.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LandingPopularBooks; 