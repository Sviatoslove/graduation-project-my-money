import generetaAuthError from '../utils/generateAuthError'

export default function errorCatcher(error, disp, setError) {
  const { code, message } = error.response.data.error;
  const errorMessage = generetaAuthError(message)
  if (code === 400) {
      disp(setError(errorMessage))
    } else {
      disp(setError(errorMessage))
  }
}
