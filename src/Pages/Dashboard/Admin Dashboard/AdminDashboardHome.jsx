import React from 'react'
import { Card, Row, Col, Statistic } from "antd"
import {
  UserOutlined,
  DollarOutlined,
  HeartOutlined,
} from "@ant-design/icons"

const AdminDashboardHome = () => {
  
  return(
    <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
     <Row gutter={[16, 16]}>

       {/* Card - 1 Donors */}
    {/* Desktop: 8 (3 cards) | Tablet: 12 (2 cards) | Mobile: 24 (1 card) */}
      <Col xs={24} sm={12} md={8}>
        <Card
          style={{
            background: "linear-gradient(120deg, #fca5a5, #ffffff)",
          }}>
          <Statistic
            title="Total Donors"
            value={1280}
            prefix={<UserOutlined style={{ color: "#991b1b" }} />}
             styles={{ content: { color: "#450a0a" } }}
          />
        </Card>
      </Col>

         {/* Card - 2 Funding */}
       <Col  xs={24} sm={12} md={8}>
        <Card
          style={{
            background: "linear-gradient(180deg, #fca5a5, #ffffff)",
          }} >
          <Statistic
            title="Total Funding"
            value={45230}
            prefix={<DollarOutlined style={{ color: "#991b1b" }} />}
             styles={{ content: { color: "#450a0a" } }}
            suffix="USD"
          />
        </Card>
      </Col>

        {/* Card - 3 Requests */}
       <Col  xs={24} sm={12} md={8}>
        <Card
          style={{
            background: "linear-gradient(135deg, #fca5a5, #ffffff)",
          }}>
          <Statistic
            title="Blood Donation Requests"
            value={342}
            prefix={<HeartOutlined style={{ color: "#991b1b" }} />}
             styles={{ content: { color: "#450a0a" } }}
          />
        </Card>
      </Col>
    </Row>

    </div>
  )
}

export default AdminDashboardHome