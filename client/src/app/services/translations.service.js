import { httpService } from './http.service'

const translationsEndpoint = 'translation/'

const translationsService = {
  get: async () => {
    const { data } = await httpService.get(translationsEndpoint)
    return data
  },
  create: async (translation) => {
    console.log('translation:', translation)
    const { data } = await httpService.post(translationsEndpoint, translation)
    return data
  },
  update: async (translation) => {
    const { data } = await httpService.patch(translationsEndpoint, translation)
    return data
  },
  remove: async (translationId) => {
    const { data } = await httpService.delete(translationsEndpoint + translationId)
    return data
  }
}

export default translationsService