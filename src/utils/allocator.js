// A simple helper to parse boolean values robustly
const parseBoolean = (value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
        const lower = value.toLowerCase().trim();
        return lower === 'true' || lower === 'yes' || lower === '1';
    }
    return !!value;
};

export const generateGreedyPlan = (students, halls) => {
    // --- Data Validation and Cleaning ---
    if (!students || students.length === 0 || !halls || halls.length === 0) {
        return { plan: [], error: "Student or hall data is missing." };
    }

    const cleanedStudents = students.filter(s => s.RollNumber != null);
    const cleanedHalls = halls.filter(h => h.HallID != null && h.Capacity > 0);

    // --- 1. Prioritize Accessible Seating ---
    const accessibleStudents = cleanedStudents.filter(s => parseBoolean(s.NeedsAccessibility));
    const otherStudents = cleanedStudents.filter(s => !parseBoolean(s.NeedsAccessibility));

    const accessibleHalls = cleanedHalls.filter(h => parseBoolean(h.IsAccessible));
    const otherHalls = cleanedHalls.filter(h => !parseBoolean(h.IsAccessible));

    let plan = [];
    let hallCapacities = new Map(cleanedHalls.map(h => [h.HallID, { remaining: h.Capacity, total: h.Capacity }]));
    let studentIndex = 0;

    // Allocate accessible students to accessible halls first
    for (const hall of accessibleHalls) {
        const hallInfo = hallCapacities.get(hall.HallID);
        while (hallInfo.remaining > 0 && studentIndex < accessibleStudents.length) {
            plan.push({
                RollNumber: accessibleStudents[studentIndex].RollNumber,
                HallID: hall.HallID,
                SeatNumber: hallInfo.total - hallInfo.remaining + 1,
            });
            hallInfo.remaining--;
            studentIndex++;
        }
    }

    if (studentIndex < accessibleStudents.length) {
        return { plan: [], error: "Not enough accessible seats for all students with special needs." };
    }

    // --- 2. Allocate Remaining Students ---
    const remainingStudents = otherStudents.sort((a, b) => a.RollNumber - b.RollNumber);
    
    // Combine all halls and sort by remaining capacity
    const allHallsSorted = [...cleanedHalls].sort((a, b) => {
        const remainingA = hallCapacities.get(a.HallID).remaining;
        const remainingB = hallCapacities.get(b.HallID).remaining;
        return remainingB - remainingA;
    });

    let remainingStudentIndex = 0;
    for (const hall of allHallsSorted) {
        const hallInfo = hallCapacities.get(hall.HallID);
        while (hallInfo.remaining > 0 && remainingStudentIndex < remainingStudents.length) {
            plan.push({
                RollNumber: remainingStudents[remainingStudentIndex].RollNumber,
                HallID: hall.HallID,
                SeatNumber: hallInfo.total - hallInfo.remaining + 1,
            });
            hallInfo.remaining--;
            remainingStudentIndex++;
        }
    }

    if (remainingStudentIndex < remainingStudents.length) {
        return { plan: [], error: "Not enough seats for all students." };
    }

    return { plan: plan.sort((a, b) => a.RollNumber - b.RollNumber), error: null };
};