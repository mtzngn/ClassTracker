import axios from 'axios';
import {Employee, Class} from '../types';

// Base URL and School ID
const BASE_URL = 'https://api.wonde.com/v1.0/schools';
const SCHOOL_ID = 'A1930499544';

// Configure Axios with Auth Token
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

// Get employee details including classes
export const getEmployeeDetails = async (
  employeeId: string,
): Promise<Employee> => {
  try {
    const response = await api.get<Employee>(
      `/${SCHOOL_ID}/employees/${employeeId}?include=classes.lessons.period`,
    );
    console.log('employee data:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error fetching employee details:', error);
    throw error;
  }
};

// Get class details including students and lessons
export const getClassDetails = async (classId: string): Promise<Class> => {
  try {
    const response = await api.get<Class>(
      `/${SCHOOL_ID}/classes/${classId}?has_students=true&include=students`,
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching class details:', error);
    throw error;
  }
};
