import { BACKGROUND_COLOR, TEXT_PRIMARY, TEXT_SECONDARY, BORDER_RADIUS_MEDIUM } from '../theme/colors';

// %%%%%% MY BOOKS PAGE COMPONENT %%%%%%%%%%%%
/**
 * My Books page component. Displays the user's personal book collection.
 * Example usage: <MyBooks />
 */
function MyBooks() {
    return (
        <div className="container py-5 mt-5" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: BORDER_RADIUS_MEDIUM }}>
            <h1 style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>My Books</h1>
            <p style={{ color: TEXT_SECONDARY }}>Your personal book collection.</p>
        </div>
    );
}

export default MyBooks;
// %%%%%% END - MY BOOKS PAGE COMPONENT %%%%%%%%%%%% 