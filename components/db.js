import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("student_activity_boiler.db");


export {
    db
}
