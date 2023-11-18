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
      message: 'Длина поля "Название счёта" не менее 2 символов',
      length:2
    },
  },
  icon: {
    isRequired: {
      message: 'Чтобы продолжить выберите аватарку',
    },
  },
}

export const validatorConfigOperations = {
  balance: {
    minBalance: {
      message: 'Недопустимое значение суммы операции, она должна быть больше 0',
      value:1
    },
    isContainDigit: {
      message: 'Недопустимое значение суммы операции, введите число, пожалуйста',
    },
  },
  categoryId: {
    isRequired: {
      message: 'Чтобы продолжить выберите Категорию',
    },
  },
}

export const validatorConfigTranslations = {
  toCount: {
    isRequired: {
      message: 'Выберите счёт на который хотите сделать перевод',
    },
  },
  balanceFrom: {
    minBalance: {
      message: 'Сумма операции должна быть больше 0',
      value:1
    },
  },
  balanceTo: {
    minBalance: {
      message: 'Сумма операции должна быть больше 0',
      value:1
    },
  },
}

export const validatorConfigCategories = {
  name: {
    isRequired: {
      message: 'Обязательно введите название категории',
    },
    min: {
      message: 'Длина поля "Название категории" не менее 2 символов',
      length:2
    },
  },
  icon: {
    isRequired: {
      message: 'Чтобы продолжить выберите аватарку',
    },
  },
}