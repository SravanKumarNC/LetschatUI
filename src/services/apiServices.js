// src/services/chatApi.js

import axios from "axios";

// const API_BASE_URL = "http://192.168.190.18:5000/api";
// const API_BASE_URL = "http://192.168.111.18:5000/api";
// const API_BASE_URL = "http://192.168.1.5:5000/api";
const API_BASE_URL = import.meta.env.VITE_API_URL

export const fetchMessagesApi = async (chatId, token) => {
  const { data } = await axios.get(`${API_BASE_URL}/message/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const sendMessageApi = async ({ content, chatId, token }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(
    `${API_BASE_URL}/message`,
    { content, chatId },
    config
  );
  return data;
};

export const fetchChatsApi = async (token) => {
  const { data } = await axios.get(`${API_BASE_URL}/chat`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const searchChats = async (search, token) => {
  const { data } = await axios.get(`${API_BASE_URL}/user?search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const getSingleChat = async (userId, token) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/chat`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const createGroupChat = async (name, users, token) => {
  const { response } = await axios.post(
    `${API_BASE_URL}/chat/group`,
    { name, users },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

export const login = async (email, password) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/user/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const signup = async (name,email, password) => {
  const {data} = await axios.post(
    `${API_BASE_URL}/user`,
    {name,email,password},
    {headers:{
      'Content-Type' : 'application/json',
    }}
  )
  return data;
}
