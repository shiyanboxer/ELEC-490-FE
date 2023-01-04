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
              chartLabels={[
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
                'Feb 1',
              ]}
              chartData={[

                {
                  name: 'Heart Rate Variability',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Recovery',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
                // {
                //   name: 'Heart Rate',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Recommendations"
              list={[...Array(5)].map((_, index) => ({
                // id: faker.datatype.uuid(),
                // title: faker.name.jobTitle(),
                // description: faker.name.jobTitle(),
                // image: `/assets/images/covers/cover_${index + 1}.jpg`,
                // postedAt: faker.date.recent(),
                
                id: [1, 2],
                title: ['Workout Less'],
                description: ['Workout Less'],
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
