import React from 'react'

function ReadOnly(props) {
   return (
      <tr>
         <td>{props.user.name}</td>
         <td>{props.user.address.city}</td>
         <td>{props.user.phone}</td>
         <td>{props.user.email}</td>
         <td>
            <div className="editBox">
               <button className="editBtn" onClick={(e) => props.handleEditClick(e, props.user)}>
                  Редактировать
               </button>
               <button className="deleteBtn" onClick={(e) => props.handleDeleteClick(e, props.user.id)}>
                  Удалить
               </button>
            </div>
         </td>
      </tr>
   )
}

export default ReadOnly;
