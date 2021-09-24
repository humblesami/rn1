import ShowStudentActivity from './show';
import AddStudentActivity from './aad';
import EditaStudentActivity from './edit';
import { createStackNavigator } from 'react-navigation-stack';


const StudentActivityNavigator = createStackNavigator({    
    ShowSudents: ShowStudentActivity,
    AddStudent: AddStudentActivity,
    EditStudent: EditaStudentActivity
});
// The activity/component at top will be show by default

export default StudentActivityNavigator;