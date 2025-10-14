import React from 'react';

function Summary({ students, halls, plan }) {
    const totalStudents = students.length;
    const totalCapacity = halls.reduce((sum, hall) => sum + (hall.Capacity || 0), 0);
    const assignedStudents = plan.length;
    const unusedSeats = totalCapacity - assignedStudents;

    if (totalStudents === 0 || totalCapacity === 0) return null;

    return (
        <div className="summary-section">
            <h2 style={{ textAlign: 'center', marginTop: 0 }}>Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                    <h3>Total Students</h3>
                    <p style={{ fontSize: '1.5rem', margin: 0 }}>{totalStudents}</p>
                </div>
                <div>
                    <h3>Total Hall Capacity</h3>
                    <p style={{ fontSize: '1.5rem', margin: 0 }}>{totalCapacity}</p>
                </div>
                <div>
                    <h3>Assigned Seats</h3>
                    <p style={{ fontSize: '1.5rem', margin: 0, color: 'var(--success-color)' }}>{assignedStudents}</p>
                </div>
                 <div>
                    <h3>Unused Seats</h3>
                    <p style={{ fontSize: '1.5rem', margin: 0, color: 'var(--accent-color)' }}>{unusedSeats}</p>
                </div>
            </div>
        </div>
    );
}

export default Summary;