import api from './api-config'

export const getAllUsers = async () => {
  const resp = await api.get(`/users`);
  return resp.data;
}

export const putAUser = async (id, userData) => {
  const resp = await api.put(`/users/${id}`, {user : userData});
  return resp.data
}
