import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse',
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px',
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px',
    },
    inputs: {
      marginBottom: '5px',
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px',
    },
  },
};


function PhoneBookForm(props, { addEntryToPhoneBook }) {
  const initialContact = {
    id: null,
    userFirstname: 'Coder',
    userLastname: 'Byter',
    userPhone: '555555333',
  };
  const [userState, setUserState] = useState(initialContact);


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userFirstname, userLastname, userPhone } = userState;
    console.log(11, userFirstname, userLastname, userPhone)
    if (!userFirstname || !userLastname || !userPhone) return;
    //Add users to list
    //Refresh form
    props.addUser(userState)
    
  };

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        onChange={handleInputChange}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        onChange={handleInputChange}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
        onChange={handleInputChange}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable({users}) {
  console.log({users})
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      {
        users.map(item => 
        <tr key={item.id}>
          <th>{item.userFirstname}</th>
          <th>{item.userLastname}</th>
          <th>{item.userPhone}</th>
        </tr>)
      }
     
    </table>
  );
}

function Application(props) {
  const usersObj = []
  const [users, setUsers] = useState(usersObj)

  const addUser = (user) => {
    user.id = users.length
    setUsers([...users, user])
  }
  return (
    <section>
      <PhoneBookForm addUser={addUser}/>
      <InformationTable users={users}/>
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById('root'));
