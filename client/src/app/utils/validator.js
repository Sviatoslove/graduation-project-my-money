export const validatorConfigRegister = {
  email: {
    isRequired: {
      message: 'Поле электронная почта обязательно для заполнения'
    },
    isEmail: {
      message: 'Email введён не корректно'
    }
  },
  name: {
    isRequired: {
      message: 'Поле имя обязательно для заполнения'
    },
    min: {
      message:
        'Имя введено не корректно, его длина должна быть более одного символа',
        length: 2
    }
  },
  password: {
    isRequired: {
      message: 'Поле пароль обязательно для заполнения'
    },
    isUpperSymbol: {
      message: 'Пароль должен содержать хотя бы одну заглавную букву'
    },
    isContainDigit: {
      message: 'Пароль должен содержать хотя бы одну цифру'
    },
    min: {
      message: 'Пароль должен состоять минимум из восьми символов',
      length: 8
    }
  },
  license: {
    isRequired: {
      message:
        'Вы не можете пользоваться нашим сервисом не подтвердив лицензионное соглашение'
    }
  },
  content: {
    isRequired: {
      message: 'Поле сообщение обязательно для заполнения'
    }
  }
}

export const validatorConfigLogin = {
  email: {
    isRequired: {
      message: 'Поле электронная почта обязательно для заполнения',
    },
    isEmail: {
      message: 'Email введён не корректно',
    },
  },
  password: {
    isRequired: {
      message: 'Поле пароль обязательно для заполнения',
    },
  },
}

export const validatorConfigCounts = {
  name: {
    isRequired: {
      message: 'Обязательно введите название счёта',
    },
    min: {
      message: 'Длина поля "Название счёта" не менее 3 символов',
      length:2
    },
  },
  icon: {
    isRequired: {
      message: 'Чтобы продолжить выберите аватарку',
    },
  },
}

// export default function validator(data, config) {
//   const errors = {}
//   const validate = (validateMethod, data, config) => {
//     let statusValidate
//     switch (validateMethod) {
//       case 'isRequired': {
//         if (typeof data === 'boolean') statusValidate = !data
//         else if (Array.isArray(data)) statusValidate = data.length === 0
//         else statusValidate = data.trim() === ''
//         break
//       }
//       case 'isEmail': {
//         const emailRegExp = /^\S+@\S+\.\S+$/g
//         statusValidate = !emailRegExp.test(data)
//         break
//       }
//       case 'isUpperSymbol': {
//         const upperRegExp = /[A-Z]+/g
//         statusValidate = !upperRegExp.test(data)
//         break
//       }
//       case 'isContainDigit': {
//         const digitRegExp = /\d+/g
//         statusValidate = !digitRegExp.test(data)
//         break
//       }
//       case 'min': {
//         statusValidate = data.length < config.value
//         break
//       }
//       default:
//         break
//     }
//     if (statusValidate) return config.message
//   }
//   for (const fieldName in data) {
//     for (const validateMethod in config[fieldName]) {
//       const error = validate(
//         validateMethod,
//         data[fieldName],
//         config[fieldName][validateMethod]
//       )
//       if (error && !errors[fieldName]) {
//         errors[fieldName] = error
//       }
//     }
//   }
//   return errors
// }
