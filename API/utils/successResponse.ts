
export const createSuccess = (statusCode: any, msg: any, data: any) => {
    const successObj = {
        status: 'success',
        statusCode: statusCode,
        message: msg,
        data: data
    }
    return successObj;
}