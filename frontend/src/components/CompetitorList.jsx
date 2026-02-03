import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const dummyCompetitors = [
  { id: 1, name: 'Competitor 1', category: 'Online', courses: 12, avgPrice: 'Rs.25,000' },
  { id: 2, name: 'Competitor 2', category: 'Physical', courses: 8, avgPrice: 'Rs.15,000' },
  { id: 3, name: 'Competitor 3', category: 'Hybrid', courses: 20, avgPrice: 'Rs.12,000' },
  { id: 4, name: 'Competitor 4', category: 'Physical', courses: 5, avgPrice: 'Rs.8,000' },
]

const CompetitorList = () => {

  return (
    <div className="bg-[#1B2537] mt-10 rounded-lg px-15 py-5 mx-15 text-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-3">Competitor's Name</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Courses</th>
              <th className="py-2 px-3">Avg. Price</th>
              <th className="py-2 px-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {dummyCompetitors.map((c) => (
              <tr key={c.id} className="odd:bg-[#16202b]">
                <td className="py-2 px-3">{c.name}</td>
                <td className="py-2 px-3">{c.category}</td>
                <td className="py-2 px-3">{c.courses}</td>
                <td className="py-2 px-3">{c.avgPrice}</td>
                <Link to={`/competitors/${c.id}`}>
                  <td className="py-2 px-3 text-blue-500 underline cursor-pointer">
                    View Details
                  </td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CompetitorList
