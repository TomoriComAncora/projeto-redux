import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
  loading: false,
  usuario: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      if (action.payload.name.length <= 1) {
        alert("Digite um nome!");
        return { ...state };
      }

      return {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email,
          address: null,
        },
      };
    },

    logoutUser: (state) => {
      return {
        ...state,
        user: null,
      };
    },

    addAddress: (state, action) => {
      if (action.payload.locale === "" || action.payload.number === "") {
        alert("Preencha todos os campos");
        return { ...state };
      }

      return {
        ...state,
        user: {
          ...state.user,
          address: {
            locale: action.payload.locale,
            number: action.payload.number,
          },
        },
      };
    },

    removeAddress: (state) => {
      return {
        ...state,
        user: {
          ...state.user,
          address: null,
        },
      };
    },

    fetchUsers: (state) => {
      state.loading = true;
    },

    fetchUsersSucesso: (state, action) => {
      //console.log(action.payload);
      state.users = action.payload;
      state.loading = false;
    },

    fetchUsersFalha: (state, action) => {
      console.log("CAIU NA FALHA");
      console.log(action.payload);
      state.loading = false;
    },

    fetchUserById: (state) => {
      console.log("CHAMOU NO SLICE");
    },

    fetchUserByIdSucesso: (state, action) => {
      console.log("Deu certo");
      // console.log(action.payload);
      state.usuario = action.payload
    },

    fetchUserByIdFalha: (state, action) => {
      console.log("Deu errado");
      console.log(action.payload);
    },
  },
});

export const {
  createUser,
  logoutUser,
  addAddress,
  removeAddress,
  fetchUsers,
  fetchUsersSucesso,
  fetchUsersFalha,
  fetchUserById,
  fetchUserByIdSucesso,
  fetchUserByIdFalha,
} = userSlice.actions;
export default userSlice.reducer;
