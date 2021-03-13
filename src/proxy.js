import express from 'express';
import fetch from 'node-fetch';

//import { getCache, setCache } from './cache.js';
import { timerEnd, timerStart } from './time.js';

export const router = express.Router();

router.get('/proxy', async (req, res) => {
    const {
        period, type,
    } = req.query;
    let result;
    let error_message;
    const start = timerStart();
    /*
    try {
        result = await getCache(`${period}.${type}`);
    } catch(e) {
        error_message = 'Villa kom upp við að ná í gögn úr cache';
        console.error(error_message, r);
    }
    if (result) {
        res.json({
            data: JSON.parse(result),
            info: {
                cached: true,
                elapsed: timerEnd(start),
            },
        });
        return;
    }
    */
    try {
        result = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${period}_${type}.geojson`);
        if(!result.ok) {
            error_message = 'Villa kom upp við staðfestingu gagna frá vefþjónustu USGS';
            console.error(error_message);
            res.status(500).send(error_message);
            return;
        }
        result = await result.text();
        //await setCache(`${period}.${type}`, result);
        res.json({
            data: JSON.parse(result),
            info: {
                cached: false,
                elapsed: timerEnd(start),
            },
        });
    } catch (e) {
        error_message = 'Villa kom upp við að sækja gögn frá vefþjónustu USGS';
        console.error(error_message);
        res.status(500).send(error_message);
        return;
    }
});
