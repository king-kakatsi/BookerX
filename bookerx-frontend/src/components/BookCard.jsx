import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, BACKGROUND_COLOR, WHITE } from '../theme/colors';
import { buyBook } from '../controllers/book_controller';

/**
 * BookCard component: displays a book with image, name, price, description, and action buttons.
 * Props:
 *   - book: { id, name, price, description, imageUrl, authorId }
 *   - currentUser: { id, role }
 *   - onEdit, onDelete, onBuy: callback functions
 */
const BookCard = ({ book, currentUser, onEdit, onDelete, onBuy }) => {

  const isAuthor = currentUser && book.authorId === currentUser.id;
  const isAdmin = currentUser && currentUser.role === 'Admin';
  const purchasedIds = JSON.parse(localStorage.getItem('purchasedBookIds') || '[]');
  const isBought = purchasedIds.includes(book.id);


  
  return (
    <div
      style={{
        width: 320,
        background: BACKGROUND_COLOR,
        borderRadius: 8,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={book.name}
          style={{ width: '100%', height: 180, objectFit: 'cover' }}
        />
      )}
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: PRIMARY_COLOR, fontWeight: 600, fontSize: 20, marginBottom: 2 }}>{book.name}</div>
        {book.category && (
          <div style={{ color: '#888', fontSize: 15, marginBottom: 6 }}>{book.category}</div>
        )}
        <div style={{ color: '#2e7dff', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>{book.price} GHS</div>
        <div
          style={{
            color: SECONDARY_COLOR,
            fontSize: 15,
            marginBottom: 12,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: 60,
            maxHeight: 60,
            lineHeight: '1.3em',
            height: '3.9em',
            whiteSpace: 'normal',
          }}
        >
          {book.description}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          {!isAuthor && !isBought && (
            <button
              style={{
                background: SECONDARY_COLOR,
                color: WHITE,
                border: '1px solid ' + SECONDARY_COLOR,
                borderRadius: 8,
                padding: '6px 18px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onClick={async () => {
                if (!currentUser || !currentUser.id) {
                  alert('Please login or register to buy this book.');
                  return;
                }
                try {
                  const token = localStorage.getItem('token');
                  const res = await buyBook(book.id, token);
                  alert(res.message);
                } catch (err) {
                  alert('Purchase failed.');
                }
              }}
            >
              Buy
            </button>
          )}
          {!isAuthor && isBought && (
            <span style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 16 }}>Bought</span>
          )}
          {isAuthor && (
            <button
              style={{
                background: 'transparent',
                color: '#2e7dff',
                border: '1px solid #2e7dff',
                borderRadius: 8,
                padding: '6px 14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onClick={() => onEdit && onEdit(book)}
            >
              Edit
            </button>
          )}
          {(isAuthor || isAdmin) && (
            <button
              style={{
                background: 'transparent',
                color: '#e53935',
                border: '1px solid #e53935',
                borderRadius: 8,
                padding: '6px 14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onClick={() => onDelete && onDelete(book)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard; 