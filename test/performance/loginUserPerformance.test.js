import http from 'k6/http';
import { sleep, check } from 'k6';
import { getBaseURL } from './utils/variables.js';
export const options = {
    stages: [
        {duration: '5s', target: 10},
        {duration: '20s', target: 100},
        {duration: '5s', target:0},
    ],

    thresholds: {
        http_req_duration: ['p(95)<11000', 'max<1000'],
        http_req_failed: ['rate<0.01']
    }
};

export default function() {
    const url = getBaseURL() + '/login'
    const payload = JSON.stringify({
        "username": "alice",
        "password": "password123"
    })

    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    let response = http.post(url, payload, params)
    check(response, {
        "Validate that status is 200": (res) => res.status === 200,
        "Validate that Token is a string": (res) => typeof(res.json().token) == 'string'
    });
    sleep(1);
}