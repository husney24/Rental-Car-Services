import { useState } from 'react';
import Header from '../../components/Header';

export default function Bookings() {

  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="fixed-nav sticky-footer bg-dark" id="page-top">
        <Header />
        <div className="content-wrapper">
          <div className="container-fluid p-2">
            <h4>Booking History</h4>
          </div>
          <div className="container">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => handleTabChange('all')}
                >
                  All Bookings
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => handleTabChange('upcoming')}
                >
                  Upcoming
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'previous' ? 'active' : ''}`}
                  onClick={() => handleTabChange('previous')}
                >
                  Previous
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'cancelled' ? 'active' : ''}`}
                  onClick={() => handleTabChange('cancelled')}
                >
                  Cancelled Bookings
                </button>
              </li>
            </ul>

            <div className="tab-content mt-2">
              {activeTab === 'all' && <div className="tab-pane fade show active">All Bookings Content</div>}
              {activeTab === 'upcoming' && <div className="tab-pane fade show active">Upcoming Bookings Content</div>}
              {activeTab === 'previous' && <div className="tab-pane fade show active">Previous Bookings Content</div>}
              {activeTab === 'cancelled' && <div className="tab-pane fade show active">Cancelled Bookings Content</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
