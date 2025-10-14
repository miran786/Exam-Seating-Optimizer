import React from 'react';
import Papa from 'papaparse';

function FileUpload({ onFileLoad, title, id, isLoaded }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                    onFileLoad(results.data);
                },
                error: (error) => {
                    console.error("Error parsing CSV:", error);
                    onFileLoad([]);
                }
            });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            <label htmlFor={id} style={{ fontSize: '1.2rem', fontWeight: '500' }}>{title}</label>
            <input 
                type="file" 
                id={id} 
                accept=".csv" 
                onChange={handleFileChange} 
                style={{
                    color: isLoaded ? 'var(--success-color)' : 'var(--text-color)',
                }}
            />
            {isLoaded && <p style={{ color: 'var(--success-color)', margin: 0 }}>✓ Loaded</p>}
        </div>
    );
}

export default FileUpload;