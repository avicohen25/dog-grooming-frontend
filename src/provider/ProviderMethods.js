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
    getAppointmentData: {
        apiName: 'Appointments/GetAppointmentData',
        httpMethod: 'post',
        requiredLogin: true,
    },
    addAppointment: {
        apiName: 'Appointments/AddAppointment',
        httpMethod: 'post',
        requiredLogin: true,
    },
    updateAppointment: {
        apiName: 'Appointments/UpdateAppointment',
        httpMethod: 'post',
        requiredLogin: true,
    },
    deleteAppointment: {
        apiName: 'Appointments/DeleteAppointment',
        httpMethod: 'post',
        requiredLogin: true,
    },
};

export default ProviderMethods;