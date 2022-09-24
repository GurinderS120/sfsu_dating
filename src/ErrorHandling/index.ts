const HandleError = (error: unknown) => {
  if (error instanceof Error) {
    alert(error.message);
  } else if (typeof error === "string") {
    alert(error);
  }
};

export default HandleError;
