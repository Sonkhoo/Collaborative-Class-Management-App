# API Routes

## Teacher's Dashboard

### 1. **Courses Management**
- **GET /courses** - Fetch all teacher's classes  
- **POST /courses** - Create new class  
- **PATCH /courses/{id}** - Update class details  
- **DELETE /courses/{id}** - Delete class  
- **GET /courses/{id}/students** - Get class enrollment  

### 2. **Assignments & Deadlines**
- **GET /assignments** - List all assignments  
- **POST /assignments** - Create new assignment  
- **PATCH /assignments/{id}** - Update assignment  
- **GET /assignments/upcoming** - Get upcoming deadlines  
- **GET /assignments/{id}/submissions** - Get submission status  

### 3. **Messages/Chat**
- **GET /messages** - Get recent messages  
- **POST /messages** - Send reply  
- **PATCH /messages/{id}/read** - Mark as read  
- **GET /messages/unread-count** - Get unread count  

### 4. **Materials Management**
- **GET /materials** - List course materials  
- **POST /materials/upload** - Upload new material  
- **DELETE /materials/{id}** - Remove material  
- **PATCH /materials/{id}** - Update material metadata  

### 5. **Submissions**
- **GET /submissions** - List student submissions  
- **POST /submissions/{id}/grade** - Grade submission  
- **GET /submissions/{id}** - Get submission details  

### 6. **Dashboard Metrics**
- **GET /dashboard/stats** - Get overview metrics:  
  ```json
  {
    "total_courses": 3,
    "active_assignments": 5,
    "unread_messages": 17,
    "pending_submissions": 42
  }
  ```

---

### Example RTK Query Implementation for Courses:

**services/api/courseApi.js**
```javascript
import { baseApi } from './baseApi';

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => '/courses',
      providesTags: ['Courses']
    }),
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: '/courses',
        method: 'POST',
        body: courseData
      }),
      invalidatesTags: ['Courses']
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Courses']
    })
  })
});

export const { 
  useGetCoursesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation 
} = courseApi;
```

---

### Component Integration Example:

**features/dashboard/CourseList.js**
```javascript
import { useGetCoursesQuery } from '../../services/api/courseApi';

const CourseList = () => {
  const { data: courses, isLoading, error } = useGetCoursesQuery();

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorAlert message={error.message} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {courses?.map(course => (
        <CourseCard 
          key={course.id}
          name={course.name}
          students={course.enrollment_count}
          unread={course.unread_messages}
        />
      ))}
    </div>
  );
};
```

---

### Key Data Transformations Needed:
1. **API Response Normalization**:
```javascript
// Before: Hardcoded
const courses = [{ id: 1, name: 'Algebra II', students: 28 }];

// After: API response
const apiResponse = {
  data: [
    { 
      id: 1,
      name: 'Algebra II',
      enrollment_count: 28,
      unread_messages: 5,
      // ... other fields
    }
  ]
};
```

2. **Pagination Support** for large datasets:
```javascript
getCourses: builder.query({
  query: (page = 1) => `/courses?page=${page}`,
  // Handle pagination in component
});
```

3. **Filtering Support**:
```javascript
getAssignments: builder.query({
  query: ({ status, courseId }) => ({
    url: '/assignments',
    params: { status, course_id: courseId }
  })
});
```

---

### Suggested API Response Structure:
**GET /assignments**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Polynomial Functions Quiz",
      "course_id": 1,
      "due_date": "2025-03-19T00:00:00Z",
      "status": "upcoming",
      "submissions": {
        "submitted": 14,
        "total": 28,
        "graded": 10
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 3
  }
}
```

This API-first approach will:  
1. Remove all hardcoded data arrays  
2. Enable real-time updates  
3. Support pagination/filtering  
4. Provide better error handling  
5. Automatically handle loading states