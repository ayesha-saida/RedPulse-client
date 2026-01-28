import React, { useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useForm } from 'react-hook-form'

const Contact = () => {
   const axiosSecure = useAxiosSecure()  
   const { register, handleSubmit,  reset, formState:{ errors }} = useForm()
 
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const onSubmit = async (data) => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await axiosSecure.post("/contact",data)
             setSuccess("Message sent successfully!")
      reset()
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
  <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Contact Form */}
        <div className="bg-gray-100 rounded-lg p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

          {success && <p className="text-green-600 mb-3">{success}</p>}
          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>

            <input
              className="w-full mb-3 p-3 rounded border"
              placeholder="Your Name"
                {...register("name", { required: true })}
            />
         {errors.name && <p className="text-red-500">Name is required</p>}

            <input
              className="w-full mb-3 p-3 rounded border"
              placeholder="Email"
              {...register("email", { required: true })}
              type="email"
            />
        {errors.email && <p className="text-red-500">Email is required</p>}

             <input
              className="w-full mb-3 p-3 rounded border"
              placeholder="Phone"
               {...register("phone", { required: true })}
            />
            {errors.phone && <p className="text-red-500">Phone is required</p>}

            <textarea
              className="w-full mb-3 p-3 rounded border"
              placeholder="Message"
              name="message"
               {...register("message", { required: true })}
              rows="5"
            />
            {errors.message && <p className="text-red-500">Message is required</p>}

             <button
              className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-100 rounded-lg p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">Contact Info</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-semibold">Hotline</p>
                <p>+880 1234 567890</p>
              </div>
            </div>

    <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-semibold">Email</p>
                <p>support@redpulse.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold">Address</p>
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

            </div>
      </div>
    </section>
  )
}

export default Contact