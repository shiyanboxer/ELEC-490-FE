import { useContext } from 'react'
import ResponseContext from '../../../components/response/ResponseContext'
import Account from '../../../_mock/account';

const CardData = () => {
    const { hrvResponse } = useContext(ResponseContext);    
    const account = Account();
    // eslint-disable-next-line dot-notation
    const recovery = account['recovery'];
    // eslint-disable-next-line dot-notation
    const recommendation = account['recommendation'];
    // eslint-disable-next-line dot-notation
    const heartRateDB = account['heart_rate'];
    // eslint-disable-next-line dot-notation
    const weeklyTrainingDB = account['weekly_training'];
    let mostRecentRecovery;
    let mostRecentHRV;
    let mostRecentHeartRate;
    let mostRecentWeeklyTraining;
    if (recovery && Array.isArray(recovery)) {
        mostRecentRecovery = recovery[recovery.length - 1].recovery_score;
        mostRecentHRV = recovery[recovery.length - 1].hrv;
    } else {
        console.error('Recovery is either undefined or not an array.');
    }
    if (weeklyTrainingDB && Array.isArray(weeklyTrainingDB)) {
        mostRecentWeeklyTraining = weeklyTrainingDB[weeklyTrainingDB.length - 1];
        mostRecentHeartRate = heartRateDB[heartRateDB.length - 1];
        console.log(mostRecentWeeklyTraining);
        console.log(mostRecentHeartRate);
    } else {
        console.error('Weekly Training is either undefined or not an array.');
    }

    // eslint-disable-next-line dot-notation
    const recoveryScore = hrvResponse ? hrvResponse['recovery_score'] : mostRecentRecovery;    
    // eslint-disable-next-line dot-notation
    const hrv = hrvResponse ? hrvResponse['hrv'] : mostRecentHRV;
    // eslint-disable-next-line dot-notation
    const weeklyTraining = hrvResponse ? hrvResponse['weekly_training_time_response'] : mostRecentWeeklyTraining;
    // eslint-disable-next-line dot-notation
    const heartRate = hrvResponse ? hrvResponse['heartrate_response'] : mostRecentHeartRate;
    
    const cardData = [
        {
            title:'Recovery Score',
            total: recoveryScore,
            icon:'material-symbols:health-and-safety',
        },
        {
            title:'Average Heart Rate Variability (ms)',
            total: hrv,
            color: 'info',
            icon: 'uil:heart-rate',
        },
        {
            title: 'Weekly Training (Hours)',
            total: weeklyTraining,
            color: 'warning',
            icon: 'ic:outline-directions-bike',
        },
        {
            title: 'Heart Rate (BPM)',
            total: heartRate,
            color: 'error',
            icon: 'ant-design:heart-filled'
        }
    ];
    
    return cardData;
};

export default CardData;
