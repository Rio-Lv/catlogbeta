import React,{useState,useEffect} from 'react'
import { Button } from '@material-ui/core';

function CountDown(deadline) {
    const [now,setNow] = useState(0);
    const [time,setTime] = useState({});
    const convertMS = (milliseconds) => {
        var day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        return {
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds
        };
    }
    useEffect(() => {
        setInterval(() => {
            setNow(Date.now())
        }, 1000);
    }, []);
    useEffect(() => {

        setTime(convertMS(deadline.deadline-now))
    }, [now,deadline.deadline]);

    return (
        <div>
            <Button>{time.day} Days, {time.hour} hours, {time.minute} minutes, {time.seconds} seconds </Button>
        </div>
    )
}

export default CountDown
