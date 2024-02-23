const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Connection error', err));

// Define schema for academic records
const academicRecordSchema = new mongoose.Schema({
    studentID: { type: String, required: true },
    name: { type: String, required: true },
    grades: [{
        subject: String,
        grade: String
    }],
    subjects: [String],
    // Add other academic information fields as needed
});

// Define schema for co-curricular activities
const coCurricularActivitySchema = new mongoose.Schema({
    studentID: { type: String, required: true },
    name: { type: String, required: true },
    activityType: String,
    duration: String,
    achievements: String,
    // Add other co-curricular activity fields as needed
});

// Define models for academic records and co-curricular activities
const AcademicRecord = mongoose.model('AcademicRecord', academicRecordSchema);
const CoCurricularActivity = mongoose.model('CoCurricularActivity', coCurricularActivitySchema);

// Sample data for academic records
const academicRecordsData = [
    {
        studentID: '101',
        name: 'John Doe',
        grades: [{ subject: 'Math', grade: 'A' }, { subject: 'Science', grade: 'B' }],
        subjects: ['Math', 'Science', 'English']
    },
    // Add more academic records as needed
];

// Sample data for co-curricular activities
const coCurricularActivitiesData = [
    {
        studentID: '101',
        name: 'John Doe',
        activityType: 'Sports',
        duration: '2 years',
        achievements: 'Won inter-school football tournament'
    },
    // Add more co-curricular activities as needed
];

// Insert sample data into MongoDB
async function insertSampleData() {
    try {
        await AcademicRecord.insertMany(academicRecordsData);
        await CoCurricularActivity.insertMany(coCurricularActivitiesData);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error inserting sample data:', error);
    }
}

// CRUD operations testing
async function testCRUDOperations() {
    try {
        // Read data
        const academicRecords = await AcademicRecord.find();
        const coCurricularActivities = await CoCurricularActivity.find();
        console.log('Academic Records:', academicRecords);
        console.log('Co-curricular Activities:', coCurricularActivities);

        // Update data
        await AcademicRecord.updateOne({ studentID: '101' }, { $set: { 'grades.$[elem].grade': 'A+' } }, { arrayFilters: [{ 'elem.subject': 'Math' }] });

        // Delete data
        await CoCurricularActivity.deleteOne({ studentID: '101', activityType: 'Sports' });

        console.log('Data updated and deleted successfully');
    } catch (error) {
        console.error('Error testing CRUD operations:', error);
    }
}

// Run sample data insertion and CRUD operations testing
async function run() {
    await insertSampleData();
    await testCRUDOperations();
    mongoose.disconnect();
}

run();