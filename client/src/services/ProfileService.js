import http from "../http-common";

const getAll = () => {
  return http.get("/profiles");
};
const getByFolder = (id) => {
  return http.get(`/profiles/folder/${id}`);
};

const get = id => {
  return http.get(`/profiles/${id}`);
};

const create = data => {
  return http.post("/profiles", data);
};

const update = (id, data) => {
  return http.put(`/profiles/${id}`, data);
};

const remove = id => {
  console.log(id)
  return http.delete(`/profiles/${id}`);
};

const removeAll = () => {
  return http.delete(`/profiles`);
};

/*const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};*/

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getByFolder,
  
};