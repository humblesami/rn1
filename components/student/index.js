import ShowStudentActivity from './show';
import AddStudentActivity from './aad';
import EditStudentActivity from './edit';
import { createStackNavigator } from 'react-navigation-stack';


const StudentActivityNavigator = createStackNavigator({    
    ShowStudents: ShowStudentActivity,
    AddStudent: AddStudentActivity,
    EditStudent: EditStudentActivity
});
// The activity/component at top will be show by default

export default StudentActivityNavigator;