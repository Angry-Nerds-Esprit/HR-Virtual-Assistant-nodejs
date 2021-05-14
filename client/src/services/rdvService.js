import http from "../http-common";

const getAll = () => {
  return http.get("/rdv");
};

const get = id => {
  return http.get(`/rdv/${id}`);
};

const create = data => {
  return http.post("/rdv/add", data);
};

const update = (id, data) => {
  return http.put(`/rdv/${id}`, data);
};

const remove = id => {
  return http.delete(`/rdv/${id}`);
};

const removeAll = () => {
  return http.delete(`/rdv`);
};

const findByTitle = title => {
  return http.get(`/rdv?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
