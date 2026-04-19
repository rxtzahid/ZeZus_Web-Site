const sendResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

const sendSuccessResponse = (res, message, data = null, statusCode = 200) => {
  sendResponse(res, statusCode, true, message, data);
};

const sendErrorResponse = (res, message, data = null, statusCode = 400) => {
  sendResponse(res, statusCode, false, message, data);
};

module.exports = {
  sendResponse,
  sendSuccessResponse,
  sendErrorResponse,
};
