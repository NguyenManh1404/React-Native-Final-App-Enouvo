import { useState } from 'react';
import SW from '../components/Switch';

const ProfileScreenData = {
  firstTab: [
    { name: 'My Profile' },
    {
      name: 'Language',
      right: 'English',
    },
    {
      name: 'Price display',
      right: 'AUD',
    },
    {
      name: 'Notification',
      right: <SW />,
    },
  ],
  canterTab: [
    { name: 'About us' },
    {
      name: 'About Kindicare application',
    },
    {
      name: 'The Kindicare Rating Explained',
    },
    {
      name: 'About the National Quality Standard (NQS)',
    },
    {
      name: 'The Value for Money Rating Explained',
    },
    {
      name: 'About the Government Childcare Subsidy',
    },
    {
      name: 'FAQ',
    },
    {
      name: 'Term & Conditions',
    },
    {
      name: 'Privacy Policy',
    },
    {
      name: 'Feedback & Support',
    },
  ],
};
export { ProfileScreenData };
