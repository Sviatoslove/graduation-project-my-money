import { httpService } from './http.service'
import localStorageService from './localStorage.service'

const operationsEndpoint = 'operations/'

const operationsService = {
  getOperations: async () => {
    const { data } = await httpService.get(operationsEndpoint)
    return data
  },
  updateOperation: async (operation) => {
    const { data } = await httpService.patch(userEndpoint + user._id, operation)
    return data
  },
  removeOperation: async () => {
    const { data } = await httpService.delete(operationsEndpoint)
    return data
  }
}

export default operationsService
