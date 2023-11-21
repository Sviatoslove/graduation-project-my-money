import generetaAuthError from '../utils/generateAuthError';

export default function errorCatcher(error, disp, setError) {
  const { message } = error.response.data.error;
  const errorMessage = generetaAuthError(message);
  disp(setError(errorMessage));
}
