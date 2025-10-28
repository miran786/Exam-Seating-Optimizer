import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Controls from './components/Controls';
import Summary from './components/Summary';
import SeatingPlanDisplay from './components/SeatingPlanDisplay';
// We no longer import the local allocator

function App() {
    const [students, setStudents] = useState([]);
    const [halls, setHalls] = useState([]);
    const [seatingPlan, setSeatingPlan] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const handleGeneratePlan = async () => {
        setError(null); // Clear previous errors
        setIsLoading(true); // Set loading
        setSeatingPlan([]); // Clear previous plan

        try {
            // Send the student and hall data to the Java backend
            // This assumes your Java backend is running on http://localhost:8080
            const response = await fetch('http://localhost:8080/generate-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ students: students, halls: halls }),
            });

            const data = await response.json();

            if (!response.ok) {
                // If response is not ok, read the error from the backend
                setError(data.error || 'An unknown error occurred.');
                setSeatingPlan([]);
            } else {
                // Success
                setSeatingPlan(data.plan);
            }

        } catch (err) {
            console.error("API call failed:", err);
            setError("Failed to connect to the server. Is the Java backend running?");
            setSeatingPlan([]);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleReset = () => {
        setStudents([]);
        setHalls([]);
        setSeatingPlan([]);
        setError(null);
        setIsLoading(false);
        // This is a common way to reset file inputs
        document.getElementById('students-file').value = '';
        document.getElementById('halls-file').value = '';
    };

    const areFilesLoaded = students.length > 0 && halls.length > 0;

    return (
        <div className="app-container">
            <header className="header">
                <h1>Exam Seating Optimizer</h1>
                <p>Upload student and hall lists in CSV format to generate an optimal seating plan.</p>
            </header>
            
            <div className="upload-section">
                <FileUpload
                    id="students-file"
                    title="1. Upload Student List"
                    onFileLoad={setStudents}
                    isLoaded={students.length > 0}
                />
                <FileUpload
                    id="halls-file"
                    title="2. Upload Hall List"
                    onFileLoad={setHalls}
                    isLoaded={halls.length > 0}
                />
            </div>
            
            {/* Pass isLoading to Controls component */}
            <Controls 
                onGenerate={handleGeneratePlan} 
                onReset={handleReset} 
                isReady={areFilesLoaded && !isLoading} // Button is disabled if files not loaded OR if loading
                isLoading={isLoading} // Pass loading state
            />

            {isLoading && <div style={{textAlign: 'center', fontSize: '1.2rem', margin: '1rem'}}>Generating plan...</div>}

            {error && <div className="error-message">{error}</div>}

            {areFilesLoaded && !isLoading && <Summary students={students} halls={halls} plan={seatingPlan} />}

            <SeatingPlanDisplay plan={seatingPlan} />
        </div>
    );
}

export default App;