interface ApiResponse<T> {
  data: T;
}

interface Employee {
  id: string;
  name: string;
  data?: {
    classes?: ApiResponse<Class[]>;
  };
}

interface FilteredEmployeeDetails {
  id: string;
  name: string;
  lessons: {
    id: string;
    day: string;
  }[];
}

interface Class {
  id: string;
  name: string;
  lessons: ApiResponse<Lesson[]>;
  data?: {
    students?: ApiResponse<Student[]>;
  };
}

interface Lesson {
  id: string;
  day: string;
  period: ApiResponse<Period>;
}

interface Student {
  forname: string;
  surname: string;
}

interface Period {
  day: string;
}
