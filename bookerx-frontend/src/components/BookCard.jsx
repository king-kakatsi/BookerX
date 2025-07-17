import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR, BACKGROUND_COLOR, WHITE } from '../theme/colors';

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
        <div style={{ color: PRIMARY_COLOR, fontWeight: 600, fontSize: 20, marginBottom: 4 }}>{book.name}</div>
        <div style={{ color: '#2e7dff', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>{book.price} FCFA</div>
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
          }}
        >
          {book.description}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
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
            onClick={() => {
              if (!currentUser || !currentUser.id) {
                alert('Please login or register to buy this book.');
                return;
              }
              onBuy && onBuy(book);
            }}
          >
            Buy
          </button>
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