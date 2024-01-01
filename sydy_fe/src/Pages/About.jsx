// Import necessary dependencies
import React from 'react';
import { Card, Typography } from 'antd';

// Destructure components from Typography
const { Title, Paragraph } = Typography;

// Create CafeIntroduction component
const About = () => {
  return (
    <Card
      style={{ width: '600px', margin: 'auto', marginTop: '50px' }}
      cover={<img alt="cafe" src="public\assets\img\logo-2nd.png" />}
    >
      <Title level={2}>Welcome to Our Cafe</Title>
      <Paragraph>
        Discover the warmth and charm of our cafe, where we serve the finest coffee and delicious treats.
      </Paragraph>
      <Paragraph>
        Whether you're looking for a cozy spot to relax or a place to catch up with friends, our cafe provides the perfect atmosphere.
      </Paragraph>
      <Paragraph>
        Join us for a delightful experience, where every sip and bite is crafted with love and passion.
      </Paragraph>
    </Card>
  );
};

export default About;
