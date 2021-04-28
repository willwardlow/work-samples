import api from './api-config';

export const getAllOrgs = async () => {
  const resp = await api.get('/organizations');
  return resp.data;
}

export const getOneOrg = async (id) => {
  const resp = await api.get(`/organizations/${id}`);
  return resp.data;
}

export const postOrg = async (orgData) => {
  const resp = await api.post(`/organizations`, { organization: orgData });
  return resp.data;
}

export const putOrg = async (id, orgData) => {
  const resp = await api.put(`/organizations/${id}`, { organization: orgData });
  return resp.data;
}

export const destroyOrg = async (id) => {
  const resp = await api.put(`/organizations/${id}`);
  return resp.data;
}

