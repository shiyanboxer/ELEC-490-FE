import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import {
  AppNewsUpdate,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  FormDialog
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  // Mock Card Data
  const cardData = [
    {
      title: 'Recovery Score',
      total: 67,
      color: 'primary', // soft blue
      icon: 'eva:shield-fill',
    },
    {
      title: 'Average Heart Rate Variability (ms)',
      total: 58,
      color: 'info', // light blue
      icon: 'eva:activity-fill', // ECG/heart rate icon
    },
    {
      title: 'Weekly Training (Hours)',
      total: 9,
      color: 'warning', // light yellow
      icon: 'eva:flash-fill',
    },
    {
      title: 'Heart Rate (BPM)',
      total: 81,
      color: 'error', // light red
      icon: 'eva:heart-fill',
    },
  ];

  // Mock Recovery Score Data
  const recoveryScoreData = [
    {
      name: 'Heart Rate Variability',
      type: 'area',
      fill: 'gradient',
      data: [
        { x: 'Apr 1', y: 65 },
        { x: 'Apr 2', y: 70 },
        { x: 'Apr 3', y: 68 },
        { x: 'Apr 4', y: 72 },
        { x: 'Apr 5', y: 75 },
        { x: 'Apr 6', y: 74 },
        { x: 'Apr 7', y: 73 },
      ],
    },
    {
      name: 'Recovery Score',
      type: 'line',
      fill: 'solid',
      data: [
        { x: 'Apr 1', y: 80 },
        { x: 'Apr 2', y: 82 },
        { x: 'Apr 3', y: 78 },
        { x: 'Apr 4', y: 85 },
        { x: 'Apr 5', y: 88 },
        { x: 'Apr 6', y: 90 },
        { x: 'Apr 7', y: 87 },
      ],
    },
    {
      name: 'Fitness',
      type: 'line',
      fill: 'solid',
      data: [
        { x: 'Apr 1', y: 60 },
        { x: 'Apr 2', y: 62 },
        { x: 'Apr 3', y: 65 },
        { x: 'Apr 4', y: 67 },
        { x: 'Apr 5', y: 70 },
        { x: 'Apr 6', y: 72 },
        { x: 'Apr 7', y: 74 },
      ],
    },
  ];
  const recoveryScoreDates = [
    'Apr 1',
    'Apr 2',
    'Apr 3',
    'Apr 4',
    'Apr 5',
    'Apr 6',
    'Apr 7',
  ];

  // Mock Recommendations
  const recommendationList = [
    {
      title: 'Take a rest day today to maximize recovery.',
      image: '/assets/images/covers/cover_1.jpg',
      postedAt: new Date('2024-04-07'),
    },
    {
      title: 'Try a light stretching routine.',
      image: '/assets/images/covers/cover_2.jpg',
      postedAt: new Date('2024-04-06'),
    },
    {
      title: 'Hydrate well and monitor your sleep.',
      image: '/assets/images/covers/cover_3.jpg',
      postedAt: new Date('2024-04-05'),
    },
    {
      title: 'Great job on your workout yesterday!',
      image: '/assets/images/covers/cover_4.jpg',
      postedAt: new Date('2024-04-04'),
    },
  ];

  // Mock Workout Breakdown
  const workoutLabels = [
    'Anaerobic Capacity',
    'VO2 Max',
    'Threshold',
    'Tempo',
    'Endurance',
    'Recover',
  ];
  const workoutChartData = [
    { name: 'Power', data: [80, 50, 30, 40, 100, 20] },
    { name: 'Heart Rate', data: [20, 30, 40, 80, 20, 80] },
  ];
  const workoutChartColors = [...Array(6)].map(() => theme.palette.text.secondary);

  return (
    <>
      <Helmet>
        <title> BONK </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome, Shiyan
        </Typography>
        
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="subtitle1">
            Enter your HRV value to view your updated recovery score and recommendations
          </Typography>
          <FormDialog/>
        </Grid>

        <Grid container spacing={3}>          
          {/* Render Card data */}
          {cardData.map((props, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <AppWidgetSummary 
                title={props.title}
                total={props.total} 
                color={props.color}
                icon={props.icon}
              />
            </Grid>
          ))}

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Recovery Score"
              chartLabels={recoveryScoreDates}
              chartData={recoveryScoreData}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Recommendations"
              list={recommendationList}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Workout Breakdown"
              chartLabels={workoutLabels}
              chartData={workoutChartData}
              chartColors={workoutChartColors}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
