import axios from 'axios';

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

// Define TypeScript interfaces for the expected data structures

interface Class {
  id: string;
  name: string;
  students?: Student[];
  lessons?: Lesson[];
}

interface Student {
  id: string;
  name: string;
}

interface Lesson {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  name: string;
  classes?: Class[];
}

interface Period {
  id: string;
  name: string;
}

// Function to get employee details including classes
export const getEmployeeDetails = async (
  employeeId: string,
): Promise<Employee> => {
  try {
    const response = await api.get<Employee>(
      `/${SCHOOL_ID}/employees/${employeeId}?include=classes`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching employee details:', error);
    throw error;
  }
};

// Function to get class details including students and lessons
export const getClassDetails = async (classId: string): Promise<Class> => {
  try {
    const response = await api.get<Class>(
      `/${SCHOOL_ID}/classes/${classId}?has_students=true&per_page=1&include=students,lessons`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching class details:', error);
    throw error;
  }
};

// Function to get period details
export const getPeriodDetails = async (periodId: string): Promise<Period> => {
  try {
    const response = await api.get<Period>(`/${SCHOOL_ID}/periods/${periodId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching period details:', error);
    throw error;
  }
};
