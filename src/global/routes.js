import Features from '../Screens/CentreDetailScreens/Features';
import Hours from '../Screens/CentreDetailScreens/Hours';
import Marketing from '../Screens/CentreDetailScreens/Marketing';
import RatingAndReview from '../Screens/CentreDetailScreens/RatingAndReview';
import Services from '../Screens/CentreDetailScreens/Services';
import Summary from '../Screens/CentreDetailScreens/Summary';
import UserInformation from '../Screens/CentreDetailScreens/UserInformation';

export const CentreDetailTab = [
  {
    name: 'Summary',
    component: Summary,
  },
  {
    name: 'UserInformation',
    component: UserInformation,
    options: {
      tabBarLabel: 'User Information',
    },
  },
  {
    name: 'Hours',
    component: Hours,
  },
  {
    name: 'Services',
    component: Services,
  },
  {
    name: 'Feature',
    component: Features,
  },
  {
    name: 'RatingAndView',
    component: RatingAndReview,
    options: {
      tabBarLabel: 'Ratings and Reviews',
    },
  },
  {
    name: 'Marketing',
    component: Marketing,
  },
];
