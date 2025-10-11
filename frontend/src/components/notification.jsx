import React from 'react';

const notifications = [
    {
        id: 1,
        title: 'Flood Warning Issued',
        message: 'Heavy rainfall expected in your area. Stay indoors and avoid low-lying zones.',
        category: 'Area Alert',
        sender: 'Disaster Management Authority',
        time: '2025-10-10 14:45',
    },
    {
        id: 2,
        title: 'Military Exercise Nearby',
        message: 'Army conducting routine drills near the border area. No cause for concern.',
        category: 'Military Alert',
        sender: 'Defense Department',
        time: '2025-10-09 09:30',
    },
    {
        id: 3,
        title: 'Emergency Medical Team Deployed',
        message: 'Immediate medical assistance available at City Hospital.',
        category: 'Medical Alert',
        sender: 'Health Ministry',
        time: '2025-10-08 19:10',
    },
];

const categoryColors = {
    'Military Alert': { background: '#e3f2fd', color: '#0d47a1' },
    'Area Alert': { background: '#ffebee', color: '#b71c1c' },
    'Medical Alert': { background: '#e8f5e9', color: '#1b5e20' },
};

function NotificationPage() {
    return (
        <section
        className='w-full p-10'
        >
            <h2  className='font-semibold text-start w-full mb-10 text-3xl'>Recent Notifications</h2>
            {notifications.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280' }}>No notifications available.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            style={{
                                backgroundColor: '#fff',
                                padding: 20,
                                borderRadius: 10,
                                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                borderLeft: `6px solid ${categoryColors[notif.category]?.color || '#6b7280'}`,
                                transition: 'transform 0.2s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ ...categoryColors[notif.category], borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                                    {notif.category}
                                </div>
                                <div style={{ fontSize: 12, color: '#9ca3af' }}>{notif.time}</div>
                            </div>
                            <h3 style={{ margin: '12px 0 6px', color: '#111827', fontSize: 16 }}>{notif.title}</h3>
                            <p style={{ color: '#374151', fontSize: 14, marginBottom: 10 }}>{notif.message}</p>
                            <div style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic' }}>Sent by: {notif.sender}</div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default NotificationPage;