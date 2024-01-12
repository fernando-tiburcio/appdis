import axios from "axios";

export const api = axios.create({
  baseURL: 'https://sheets.googleapis.com/v4/spreadsheets/',
});
