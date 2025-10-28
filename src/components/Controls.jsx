import React from 'react';

function Controls({ onGenerate, onReset, isReady, isLoading }) {
    return (
        <div className="controls-section">
            <button className="primary" onClick={onGenerate} disabled={!isReady}>
                {/* Change text when loading */}
                {isLoading ? 'Generating...' : 'Generate Seating Plan'}
            </button>
            <button className="secondary" onClick={onReset} disabled={isLoading}>
                Reset
            </button>
        </div>
    );
}

export default Controls;