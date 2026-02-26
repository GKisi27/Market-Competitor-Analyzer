import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock as Clock } from '@fortawesome/free-regular-svg-icons'

const courses = [
  { id: 1, name: 'Data Science with Python', price: 'Rs. 25,000', duration: '4 Months' },
  { id: 2, name: 'React', price: 'Rs. 15,000', duration: '2 Months' },
  { id: 3, name: 'Mern Fullstack', price: 'Rs. 40,000', duration: '5 Months' },
  { id: 4, name: 'Artificial Intelligence', price: 'Rs. 20,000', duration: '3 Months' },
]

const TopCourses = () => {
  return (
    <div className="bg-[#1B2537] rounded-lg p-6 text-white mt-10 mx-15">
      <h2 className="text-xl font-semibold mb-6">Top Courses :</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div className="bg-[#16202b] rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{course.name}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-semibold">{course.price}</span>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={Clock} className="w-4 h-4" />
                <span className="text-sm">{course.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopCourses
