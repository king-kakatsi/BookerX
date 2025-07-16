import { BACKGROUND_COLOR, TEXT_PRIMARY, TEXT_SECONDARY, BORDER_RADIUS_MEDIUM } from '../theme/colors';

// %%%%%% DASHBOARD PAGE COMPONENT %%%%%%%%%%%%
/**
 * Dashboard page component. Displays the main dashboard/home for BookerX.
 * Example usage: <Dashboard />
 */
function Dashboard() {
    return (
        <div className="container py-5 mt-5" style={{ backgroundColor: BACKGROUND_COLOR, borderRadius: BORDER_RADIUS_MEDIUM }}>
            <h1 style={{ color: TEXT_PRIMARY, fontWeight: 'bold' }}>Dashboard</h1>
            <p style={{ color: TEXT_SECONDARY }}>Welcome to BookerX!</p>
        </div>
    );
}

export default Dashboard;
// %%%%%% END - DASHBOARD PAGE COMPONENT %%%%%%%%%%%% 