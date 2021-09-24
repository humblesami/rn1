import ShowTeacherActivity from './list';
import { createStackNavigator } from 'react-navigation-stack';


const TeacherActivityNavigator = createStackNavigator({    
    MyChoiceName: ShowTeacherActivity,
});
// The activity/component at top will be show by default

export default TeacherActivityNavigator;