import Axios from 'axios';

const server = !process.env.NODE_ENV || process.env.NODE_ENV == 'development' ?
    'http://ec2-18-224-181-250.us-east-2.compute.amazonaws.com:3000' : 'http://ec2-18-224-181-250.us-east-2.compute.amazonaws.com:3000';

export const internalAxios = Axios.create({
    baseURL: server
});
