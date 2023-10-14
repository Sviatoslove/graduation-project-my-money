export const generateAuthError = (message) => {
  if (message === 'INVALID_PASSWORD' || message === 'INVALID_EMAIL') {
    return 'Email или пароль введены не корректно'
  } else if (message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
    return 'Слишком много попыток входа. Попробуйте позже.'
  } else if (message === 'EMAIL_NOT_FOUND') {
    return 'Пользователь с таким Email не существует'
  } else if (message === 'EMAIL_EXISTS') {
    return 'Пользователь с таким Email уже существует'
  }
}
