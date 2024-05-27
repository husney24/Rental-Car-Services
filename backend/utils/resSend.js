const resSend = (res, statusCode, status, msg, data, token) => {
  res.status(statusCode).json({
    status,
    msg,
    data,
    token,
  });
};

module.exports = { resSend };
