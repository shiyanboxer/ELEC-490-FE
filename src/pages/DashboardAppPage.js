import { useContext, useEffect, useState } from 'react';
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
import Account from '../_mock/account';
import ResponseContext from '../components/response/ResponseContext'
import UserContext from '../components/response/UserContext'

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const data = CardData();
  const account = Account();

  const { hrvResponse } = useContext(ResponseContext);
  // eslint-disable-next-line dot-notation
  const recovery = account['recovery'];
  let mostRecentRecovery;
  let mostRecentHRV;
  if (recovery && Array.isArray(recovery)) {
      mostRecentRecovery = recovery[recovery.length - 1].recovery_score;
      mostRecentHRV = recovery[recovery.length - 1].hrv;
  } else {
      console.error('Recovery is either undefined or not an array.');
  }

  // eslint-disable-next-line dot-notation
  const hrv = hrvResponse ? hrvResponse['hrv'] : mostRecentHRV;
  // eslint-disable-next-line dot-notation
  const recoveryScore = hrvResponse ? hrvResponse['recovery_score'] : mostRecentRecovery;

  const recoveryScoreDates = []
  const recoveryScoreData = [
    {
      name: 'Heart Rate Variability',
      type: 'area',
      fill: 'gradient',
      data: [],
    },
    {
      name: 'Recovery Score',
      type: 'line',
      fill: 'solid',
      data: [],
    },
  ]

  if (recovery && Array.isArray(recovery)) {
    recovery.forEach(item => {
    const date = new Date(item.date.$date);
    const formattedDate = date.toLocaleDateString();
    const month = date.toLocaleString("default", {month: "short"});
    const day = date.getDate();
    recoveryScoreData[0].data.push({x: `${month} ${day}`, y: item.hrv});
    recoveryScoreData[1].data.push({x: `${month} ${day}`, y: item.recovery_score});
  });
} else {
  console.error('Recovery is either undefined or not an array.');
  }

  // eslint-disable-next-line dot-notation
  const recommendation = account['recommendation'];
  const recommendationData = [];
  const recommendationDate = [];
  if (recommendation && Array.isArray(recommendation)) {
    recommendation.forEach(item => {
      const date = new Date(item.date.$date);
      // const month = date.toLocaleString("default", {month: "short"});
      // const day = date.getDate();
      recommendationData.push(item.recommendation_txt);
      // recommendationDate.push(`${month} ${day}`);
      recommendationDate.push(date);
  });
  } else {
    console.error('Recommendation is either undefined or not an array.');
  }

  const date = new Date();
  const month = date.toLocaleString("default", {month: "short"});
  const day = date.getDate();
  
  if (hrvResponse) {
    recoveryScoreData[0].data.push({x: `${month} ${day}`, y: hrv});
    recoveryScoreData[1].data.push({x: `${month} ${day}`, y: recoveryScore});
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

  return (
    <>
      <Helmet>
        <title> BONK </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome, {account.firstName}
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
              // subheader="(+43%) than last year"
              chartLabels={recoveryScoreDates}
              chartData={recoveryScoreData}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Recommendations"
              list={recommendationDate.map((recommendation, index) => ({
                // id: faker.datatype.uuid(),
                title: recommendationData[index],
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: recommendation,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Workout Breakdown"
              chartLabels={['Anaerobic Capacity', 'VO2 Max', 'Threshold', 'Tempo', 'Endurance', 'Recover']}
              chartData={[
                { name: 'Power', data: [80, 50, 30, 40, 100, 20] },
                { name: 'heart Rate', data: [20, 30, 40, 80, 20, 80] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
