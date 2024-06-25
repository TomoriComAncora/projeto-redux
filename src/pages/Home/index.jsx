import styles from "./home.module.css";
import { Header } from "../../components/header";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  removeAddress,
  fetchUsers,
  fetchUserById,
} from "../../redux/user/slice";

import { useState } from "react";

export function Home() {
  const [id, setId] = useState(1);
  const dispatch = useDispatch();
  const { user, users, loading, usuario } = useSelector(
    (rootReducer) => rootReducer.user
  );

  function handleDeleteAddress() {
    dispatch(removeAddress());
    alert("Endereço deletado com sucesso!");
  }

  function handleBuscarUsuarios() {
    dispatch(fetchUsers());
  }

  function handleBuscarUsuario() {;
    let userId = id;
    dispatch(fetchUserById(userId));

  }

  function handleId(){
    setId(id + 1);
    handleBuscarUsuario();
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Login
          </Link>
          <Link to="/painel" className={styles.link}>
            Painel
          </Link>
          <Link to="/address" className={styles.link}>
            Meus endereços
          </Link>
        </nav>

        <main className={styles.content}>
          <div className={styles.message}>
            <h1 className={styles.title}>
              Olá {user ? user.name : "Visitante"}, bem vindo!
            </h1>

            {user && <span>Email: {user.email}</span>}

            {user && user.address && (
              <>
                <strong className={styles.addressLabel}>Endereço atual:</strong>
                <div className={styles.address}>
                  <p>
                    {user.address.locale}, {user.address.number}
                  </p>

                  <button onClick={handleDeleteAddress}>
                    Deletar endereço
                  </button>
                </div>
              </>
            )}

            <hr />
            <br />
            <h2>Lista de usuários</h2>
            <button onClick={handleBuscarUsuarios}>Buscar usuários</button>
            <button onClick={handleBuscarUsuario}>Buscar usuário por ID</button>
            <button onClick={handleId}>Próximo</button>
            <br />

            {loading && <strong>Carregando...</strong>}
            {users.map((user) => (
              <dir key={user.id}>
                <p>
                  ID:{user.id} | {user.name}
                </p>
              </dir>
            ))}
            <hr />
            <br />
            <div>
              <h3>id:{usuario.id} | nome:{usuario.name}</h3>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
