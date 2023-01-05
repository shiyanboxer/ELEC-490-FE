import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// form hook - https://react-hook-form.com/get-started
import { useForm } from "react-hook-form";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  CardData,
  FormDialog
} from '../sections/@dashboard/app';
import ResponseContext from '../components/response/ResponseContext'

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const data = CardData();
  const { hrvResponse } = useContext(ResponseContext);
  // eslint-disable-next-line dot-notation
  const hrv = hrvResponse ? hrvResponse['hrv'] : 58;
  // eslint-disable-next-line dot-notation
  const recoveryScore = hrvResponse ? hrvResponse['recovery_score'] : 67;
  const recoveryScoreDates = [
    'Nov 10',
    'Nov 14',
    'Nov 28',
    'Dec 1',
    'Dec 7',
    'Dec 14',
    'Dec 28',
    'Jan 1',
    'Jan 20',
    'Jan 31',
  ]
  const recoveryScoreData = [
    {
      name: 'Heart Rate Variability',
      type: 'area',
      fill: 'gradient',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27],
    },
    {
      name: 'Recovery',
      type: 'line',
      fill: 'solid',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36],
    },
  ]
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const today = new Date();
  const date = today.getDate(); 
  const month = today.getMonth();
  const dateWithFullMonthName = monthNames[month];
  // eslint-disable-next-line prefer-template
  const fullDate = dateWithFullMonthName + ' ' + date;

  if (hrvResponse) {
    recoveryScoreDates.push(fullDate);
    recoveryScoreData[0].data.push(hrv)
    recoveryScoreData[1].data.push(recoveryScore)
  }

  const RenderCardData = data.map(props => {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary 
                title={props.title}
                total={props.total} 
                color={props.color}
                icon={props.icon}
            />
        </Grid>
    )
})

  const recommendationData = ['Workout less', 'Workout more', 'Need to add better recs'];

  return (
    <>
      <Helmet>
        <title> Recovery Tracker </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome back, Shiyan
        </Typography>
        
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="subtitle1">
                Enter your HRV value to view your updated recovery score and recommendations
            </Typography>
          <FormDialog/>
        </Grid>

        <Grid container spacing={3}>          
          {/* Render Card data */}
          {RenderCardData}

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Recovery Score"
              subheader="(+43%) than last year"
              chartLabels={recoveryScoreDates}
              chartData={recoveryScoreData}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Recommendations"
              list={recommendationData.map((recommendation, index) => ({
                id: faker.datatype.uuid(),
                title: recommendation,
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Workout Breakdown"
              chartLabels={['Endurance', 'Interval', 'Threshold', 'Hill']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
