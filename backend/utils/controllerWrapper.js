// A reusable async wrapper for controllers
const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error); // Passes error to your error handler middleware
    }
  };
};

export default controllerWrapper;
