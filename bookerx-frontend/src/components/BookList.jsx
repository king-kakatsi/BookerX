import React from 'react';
import BookCard from './BookCard';

/**
 * BookList component: displays a scrollable list of BookCard.
 * Props:
 *   - books: array of book objects
 *   - currentUser: user object
 *   - onEdit, onDelete, onBuy: callback functions
 */
const BookList = ({ books, currentUser, onEdit, onDelete, onBuy }) => {


  if (!books || books.length === 0) {
    return <div style={{ textAlign: 'center', color: '#888', marginTop: 40, fontSize: 20 }}>No book found</div>;
  }


  
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      justifyContent: 'center',
      padding: '1rem 0',
    }}>
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          currentUser={currentUser}
          onEdit={onEdit}
          onDelete={onDelete}
          onBuy={onBuy}
        />
      ))}
    </div>
  );
};

export default BookList; 