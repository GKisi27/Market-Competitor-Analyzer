import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock as Clock } from '@fortawesome/free-regular-svg-icons'

const TopCourses = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get(`/competitors/${id}`);
        setCourses(response.data.courses || []);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourses();
  }, [id]);

  if (loading) return null;
  return (
    <div className="card p-6 mt-10 mx-15">
      <h2 className="text-xl font-semibold mb-6">Top Courses :</h2>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="bg-[var(--bg-input)] rounded-lg p-4 flex justify-between items-center border border-[var(--border)]">
            <div>
              <p className="text-sm font-medium">{course.course_name}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-semibold">
                {course.price ? `Rs. ${course.price.toLocaleString()}` : 'N/A'}
              </span>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={Clock} className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{course.duration || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <p className="text-center text-gray-500 py-4">No courses track for this competitor.</p>
        )}
      </div>
    </div>
  )
}

export default TopCourses
