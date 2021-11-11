import React, { Fragment } from 'react';
import './App.css';
import * as axios from 'axios';
import { nanoid } from 'nanoid';
import ReadOnly from './components/ReadOnly';
import UserEdit from './components/UserEdit';

function App() {
   // Получение пользователей из JSON
   React.useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/users')
         .then(data => {
            setUsers(data.data);
         })
   }, []);
   // хук для получения и добавления пользователей
   const [users, setUsers] = React.useState([]);
   // хук для получения и добавления текущих значений из input
   const [addNewUser, setNewUser] = React.useState({
      name: '',
      address: '',
      phone: '',
      email: '',
   });
   // хук для добавления изменений пользователя в state
   const [editUser, setEditUser] = React.useState({
      name: '',
      address: '',
      phone: '',
      email: '',
   })
   // хук для получения и добавления id пользователя (для редактирования данных)
   const [editUserId, setUserId] = React.useState(null);

   // Отслеживание изменений в input и добавление их в state 1
   const handleFormChange = (e) => {
      e.preventDefault();
      const currentValue = e.target.getAttribute('name');
      const newValue = e.target.value;
      const newUserData = { ...addNewUser };
      newUserData[currentValue] = newValue;
      setNewUser(newUserData);
   }
   // Отслеживание изменений в input в поле редактирования
   const handleEditFormChange = (e) => {
      e.preventDefault();
      const currentValue = e.target.getAttribute('name');
      const newValue = e.target.value;
      const editUserData = { ...editUser };
      editUserData[currentValue] = newValue;
      setEditUser(editUserData);
   }
   // Получение новых данных из формы и добавление их в state 1
   const handleFormSubmit = (e) => {
      e.preventDefault();
      const newUser = {
         id: nanoid(),
         name: addNewUser.name,
         address: {city: addNewUser.address},
         phone: addNewUser.phone,
         email: addNewUser.email
      }
      setUsers([newUser, ...users]);
      resetForm();
   }
   // Функция для добавления изменений в данных пользователя
   const handleEditFormSubmit = (e) => {
      e.preventDefault();
      const newEditUser = {
         id: editUserId,
         name: editUser.name,
         address: editUser.address,
         phone: editUser.phone,
         email: editUser.email
      }
      const newUser = [...users];
      const index = users.findIndex((user) => user.id === editUserId);
      newUser[index] = newEditUser;
      setUsers(newUser);
      setUserId(null);
   }
   // Функция для получения id в state 
   const handleEditClick = (e, user) => {
      e.preventDefault();
      setUserId(user.id);
      const editFormValue = {
         id: user.id,
         name: user.name,
         address: user.address,
         phone: user.phone,
         email: user.email
      }
      setEditUser(editFormValue);
   }
   // Фунция для отмены редактирования
   const handleCloseClick = (e) => {
      e.preventDefault();
      setUserId(null)
   }
   // Функция для удаления пользователя
   const handleDeleteClick = (e, userId) => {
      e.preventDefault();
      const newUsers = [...users];
      const index = users.findIndex((user) => user.id === userId);
      newUsers.splice(index, 1);
      setUsers(newUsers);
   }
   // Сброс значений формы
   const resetForm = () => {
      document.getElementById("resetForm").reset();
   }
   // Добавление пользователя при нажатии на кнопку Enter
   const handleKeyPress = (e) => {
      if (e.key === "Enter") {
         handleFormSubmit(e)
      }
   }
   return (
      <div className="app">
         <h2 className="count">количество пользователей: {users.length}</h2>
         <form id="resetForm" className="addForm" onSubmit={handleFormSubmit}>
            <h2 className="formTitle">Добавить пользователя</h2>
            <input
               type="text"
               name="name"
               required="required"
               placeholder="Введите имя"
               onChange={handleFormChange} />
            <input
               type="text"
               name="address"
               required="required"
               placeholder="Введите адрес"
               onChange={handleFormChange} />
            <input
               type="text"
               name="phone"
               required="required"
               placeholder="Введите номер телефона"
               onChange={handleFormChange} />
            <input
               type="email"
               name="email"
               required="required"
               placeholder="Введите email"
               onChange={handleFormChange} />
            <button className="addBtn" type="submit" onKeyDown={handleKeyPress}>
               Добавить
            </button>
         </form>
         <form onSubmit={handleEditFormSubmit}>
            <table>
               <thead>
                  <tr>
                     <th>имя</th>
                     <th>адрес</th>
                     <th>телефон</th>
                     <th>почта</th>
                     <th>действия</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map(user => (
                     <Fragment>
                        {editUserId === user.id ?
                           <UserEdit handleEditFormChange={handleEditFormChange}
                              editUser={editUser}
                              handleCloseClick={handleCloseClick} /> :
                           <ReadOnly user={user} handleEditClick={handleEditClick}
                              handleDeleteClick={handleDeleteClick} />
                        }
                     </Fragment>
                  ))}
               </tbody>
            </table>
         </form>
      </div>
   );
}

export default App;
