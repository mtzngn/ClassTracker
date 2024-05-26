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

interface ClassList {
  id: string;
  name: string;
  lessons: {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
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
  employee: string;
}

interface Student {
  forename: string;
  surname: string;
}

interface Period {
  day: string;
  start_time: string;
  end_time: string;
}
