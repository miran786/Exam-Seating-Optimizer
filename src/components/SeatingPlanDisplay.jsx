import React from 'react';
import { CSVLink } from 'react-csv';

function SeatingPlanDisplay({ plan }) {
    if (!plan || plan.length === 0) {
        return <div className="plan-section"><p style={{textAlign: 'center'}}>Upload files and generate a plan to see the results.</p></div>;
    }

    const headers = [
        { label: "Roll Number", key: "RollNumber" },
        { label: "Hall ID", key: "HallID" },
        { label: "Seat Number", key: "SeatNumber" }
    ];

    return (
        <div className="plan-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Generated Seating Plan</h2>
                 <CSVLink
                    data={plan}
                    headers={headers}
                    filename={"exam-seating-plan.csv"}
                    className="button primary"
                    style={{ textDecoration: 'none' }}
                >
                    Download Plan
                </CSVLink>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Roll Number</th>
                            <th style={tableHeaderStyle}>Hall ID</th>
                            <th style={tableHeaderStyle}>Seat Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plan.map((seat, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'var(--secondary-bg)' : 'transparent' }}>
                                <td style={tableCellStyle}>{seat.RollNumber}</td>
                                <td style={tableCellStyle}>{seat.HallID}</td>
                                <td style={tableCellStyle}>{seat.SeatNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const tableHeaderStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid var(--border-color)',
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--card-bg)'
};

const tableCellStyle = {
    padding: '12px',
    textAlign: 'left',
};

export default SeatingPlanDisplay;