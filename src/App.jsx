import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Controls from './components/Controls';
import Summary from './components/Summary';
import SeatingPlanDisplay from './components/SeatingPlanDisplay';
import { generateGreedyPlan } from './utils/allocator';

function App() {
    const [students, setStudents] = useState([]);
    const [halls, setHalls] = useState([]);
    const [seatingPlan, setSeatingPlan] = useState([]);
    const [error, setError] = useState(null);

    const handleGeneratePlan = () => {
        setError(null); // Clear previous errors
        const { plan, error: planError } = generateGreedyPlan(students, halls);
        if (planError) {
            setError(planError);
            setSeatingPlan([]);
        } else {
            setSeatingPlan(plan);
        }
    };

    const handleReset = () => {
        setStudents([]);
        setHalls([]);
        setSeatingPlan([]);
        setError(null);
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
            
            <Controls onGenerate={handleGeneratePlan} onReset={handleReset} isReady={areFilesLoaded} />

            {error && <div className="error-message">{error}</div>}

            {areFilesLoaded && <Summary students={students} halls={halls} plan={seatingPlan} />}

            <SeatingPlanDisplay plan={seatingPlan} />
        </div>
    );
}

export default App;