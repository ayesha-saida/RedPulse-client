import React  from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const StateSection = () => {
  const axiosSecure = useAxiosSecure()
  
      const {data: states = {} , isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async() => {
          const res = await  axiosSecure.get(`/stats`)
            return res.data
        }
       })
 
   if (isLoading) {
    return (
      <section className="py-12 text-center">
        <p className="text-gray-500">Loading impact stats...</p>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">

        <StatCard
          value={states.totalDonors}
          label="Total Donors"
          icon="🧍"
        />

        <StatCard
          value={states.successfulDonations}
          label="Successful Donations"
          icon="🩸"
        />

        <StatCard
          icon="❤️"
          label="Lives Saved"
          value={states.livesSaved} />

        <StatCard
          value={states.citiesCovered}
          label="Cities Covered"
          icon="📍"
        />

      </div>
    </section>
  )
}
 
const StatCard = ({ value, label, icon }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow p-6 text-center hover:scale-105 transition-transform">
      <div className="text-3xl mb-2">{icon}</div>
      <h2 className="text-3xl font-bold text-red-600">
        {value}
      </h2>
      <p className="text-gray-600 mt-1 text-lg">{label}</p>
    </div>
  )
}

export default StateSection