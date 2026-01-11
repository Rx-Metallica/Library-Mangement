import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:4000/api/books";

export const useBooks = () => {
  const getBooks = async () => {
    const res = await axios.get(API);
    return res.data;
  };

  const createBook = async (data) => {
    await axios.post(API, data);
    toast.success("Book added");
  };

  const updateBook = async (id, data) => {
    await axios.put(`${API}/${id}`, data);
    toast.success("Book updated");
  };

  const activateBook = async (id) => {
    await axios.patch(`${API}/${id}/activate`);
    toast.success("Book activated");
  };

  const deactivateBook = async (id) => {
    await axios.patch(`${API}/${id}/deactivate`);
    toast.info("Book deactivated");
  };

  return {
    getBooks,
    createBook,
    updateBook,
    activateBook,
    deactivateBook,
  };
};