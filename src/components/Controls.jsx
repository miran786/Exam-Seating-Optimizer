import React from 'react';

function Controls({ onGenerate, onReset, isReady }) {
    return (
        <div className="controls-section">
            <button className="primary" onClick={onGenerate} disabled={!isReady}>
                Generate Seating Plan
            </button>
            <button className="secondary" onClick={onReset}>
                Reset
            </button>
        </div>
    );
}

export default Controls;