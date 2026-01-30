import React from 'react'
import { Card, Row, Col, Statistic, Skeleton } from "antd"
import {
  UserOutlined,
  DollarOutlined,
  HeartOutlined,
} from "@ant-design/icons"
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const AdminDashboardHome = () => {
      const axiosSecure = useAxiosSecure()
      const {data: states = {}, isLoading: statsLoading } = useQuery({
          queryKey: ['stats'],
          queryFn: async() => {
            const res = await  axiosSecure.get(`/stats`)
              return res.data
          }
         })

      const {data: donations = [], isLoading: donationsLoading } = useQuery({
         queryKey: ['donation'],
         queryFn: async() => {
           const res = await 
           axiosSecure.get(`/donations`)
             return res.data
         }
        })
        
  return(
    <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
     <Row gutter={[16, 16]}>

       {/* Card - 1 Donors */}
    {/* Desktop: 8 (3 cards) | Tablet: 12 (2 cards) | Mobile: 24 (1 card) */}
      <Col xs={24} sm={12} md={8}>
        <Card
          style={{
            background: "linear-gradient(120deg, #fca5a5, #ffffff)" }}>
          <Skeleton loading={statsLoading} active>
          <Statistic
            title="Total Donors"
            value={statsLoading ? 0 : states.totalDonors || 0}
            prefix={<UserOutlined style={{ color: "#991b1b" }} />}
             styles={{ content: { color: "#450a0a" } }}
          />
          </Skeleton>
        </Card>
      </Col>

         {/* Card - 2 Funding */}
       <Col  xs={24} sm={12} md={8}>
        <Card
          style={{
            background: "linear-gradient(180deg, #fca5a5, #ffffff)" }} >
          <Skeleton loading={statsLoading} active>
          <Statistic
            title="Total Funding"
            value={45230}
            prefix={<DollarOutlined style={{ color: "#991b1b" }} />}
             styles={{ content: { color: "#450a0a" } }}
            suffix="USD"
          />
          </Skeleton>
        </Card>
      </Col>

        {/* Card - 3 Requests */}
       <Col  xs={24} sm={12} md={8}>
        <Card
          style={{
            background: "linear-gradient(135deg, #fca5a5, #ffffff)" }}>
          <Skeleton loading={statsLoading} active>
          <Statistic
            title="Blood Donation Requests"
            value={donationsLoading ? 0 : donations.length}
            prefix={<HeartOutlined style={{ color: "#991b1b" }} />}
             styles={{ content: { color: "#450a0a" } }}
          />
          </Skeleton>
        </Card>
      </Col>
    </Row>

    </div>
  )
}

export default AdminDashboardHome