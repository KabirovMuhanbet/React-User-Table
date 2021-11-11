import React from 'react'

function UserEdit(props) {
   return (
      <tr>
         <td>
            <input
               type="text"
               name="name"
               value={props.editUser.name}
               required="required"
               placeholder="Введите имя"
               onChange={props.handleEditFormChange} />
         </td>
         <td>
            <input
               type="text"
               name="address"
               value={props.editUser.address.city}
               required="required"
               placeholder="Введите адрес"
               onChange={props.handleEditFormChange} />
         </td>
         <td>
            <input
               type="text"
               name="phone"
               value={props.editUser.phone}
               required="required"
               placeholder="Введите номер телефона"
               onChange={props.handleEditFormChange} />
         </td>
         <td>
            <input
               type="email"
               name="email"
               value={props.editUser.email}
               required="required"
               placeholder="Введите email"
               onChange={props.handleEditFormChange} />
         </td>
         <td>
            <div className="editBox">
               <button className="saveBtn" type="submit">
                  Сохранить
               </button>
               <button className="closeBtn" onClick={props.handleCloseClick}>
                  Отмена
               </button>
            </div>
         </td>
      </tr>
   )
}

export default UserEdit;
