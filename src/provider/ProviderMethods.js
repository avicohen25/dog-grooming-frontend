const ProviderMethods = {
    login: {
        apiName: 'Login/Login',
        httpMethod: 'post',
        requiredLogin: false,
    },
    register: {
        apiName: 'Login/Register',
        httpMethod: 'post',
        requiredLogin: false,
    },
    customerInit: {
        apiName: 'Login/CustomerInit',
        httpMethod: 'get',
        requiredLogin: true,
    },
    getAppointments: {
        apiName: 'Appointments/GetAppointments',
        httpMethod: 'get',
        requiredLogin: true,
    },
};

export default ProviderMethods;