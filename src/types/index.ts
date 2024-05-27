export interface ApiResponse<T> {
  data: T;
}

export interface Employee {
  id: string;
  name: string;
  data?: {
    classes?: ApiResponse<Class[]>;
  };
}

export interface ClassList {
  id: string;
  name: string;
  lessons: {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface Class {
  id: string;
  name: string;
  lessons: ApiResponse<Lesson[]>;
  data?: {
    students?: ApiResponse<Student[]>;
  };
}

export interface Lesson {
  id: string;
  day: string;
  period: ApiResponse<Period>;
  employee: string;
}

export interface Student {
  forename: string;
  surname: string;
}

export interface Period {
  day: string;
  start_time: string;
  end_time: string;
}

export type RootStackParamList = {
  Home: undefined;
  ClassList: {classList: ClassList[]};
  ClassDetails: {studentList: Student[]; startTime: string; endTime: string};
};
