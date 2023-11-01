const createError = (status = 500, message) => {
  const err = new Error();

  err.status = status;
  err.message = message || "Internal Server Error";

  return err;
};

export default createError;
