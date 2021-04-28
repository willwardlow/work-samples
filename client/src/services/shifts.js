import api from './api-config';

export const getAllShifts = async () => {
  const resp = await api.get(`/shifts`);
  return resp.data;
}

export const getOneShift = async (id) => {
  const resp = await api.get(`/shifts/${id}`);
  return resp.data;
}

export const postAShift = async (shiftData) => {
  const resp = await api.post(`/shifts`, { shift: shiftData });
  return resp.data;
};

export const putAShift = async (id, shiftData) => {
  const resp = await api.put(`/shifts/${id}`, { shift: shiftData });
  return resp.data;
}

export const destroyShift = async (id) => {
  const resp = await api.put(`/shifts/${id}`);
  return resp.data;
}
