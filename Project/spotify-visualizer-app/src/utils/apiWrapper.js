import axios from 'axios';

const BASE_URL = "/api"

/**
 * Returns a sample API response to demonstrate a working backend
 * Returns GET_SAMPLE_FAIL upon failure
 */
export const getSampleResponse = () => {
    const requestString = `${BASE_URL}/time`;
    return axios
    .get(requestString, {
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
      type: 'GET_SAMPLE_FAIL',
      error,
    }));
};

/**
 * Executes a sample POST request
 * Returns POST_SAMPLE_FAIL upon failure
 */
export const addSampleResponse = (body) => {
    const requestString = `${BASE_URL}/time`;
    return axios
        .post(requestString, body, {
            headers: {
                'Content-Type': 'application/JSON',
            },
        })
        .catch((error) => ({
            type: 'POST_SAMPLE_FAIL',
            error,
        }));
};