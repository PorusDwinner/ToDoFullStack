import { useEffect, useState } from "react";

function App() {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [dbData , setDbData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://todo-backend-tp8j.onrender.com/api/db-data')
      const data = await result.json();
      console.log(data);
      setDbData(data);
    };
    fetchData();
  }, [])

  const handelNewUserData = () => {
    fetch('https://todo-backend-tp8j.onrender.com/api/new-user', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        name : name ,
        location : location ,
        phone : phone ,
      })
    })
  };

  const handelDeleteUser = (phoneId) => {
    fetch(`https://todo-backend-tp8j.onrender.com/api/delete-user/${phoneId}`, {
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json'
      },
    })
    .then(() => window.location.reload());
  }

  return (
    <div>

      <div className="flex">
        <div className="p-8 shadow-lg rounded m-4 w-[30%] ">
          <form onSubmit={handelNewUserData} className="flex flex-col">

            <label className='font-medium text-slate-800' >Name</label>
            <input type='text' name="name" value={name} className='border-2 rounded p-1'
              onChange={(e) => setName(e.target.value)} />

            <label className='font-medium text-slate-800 mt-4 ' >Location</label>
            <input type='text' name="location" value={location} className='border-2 rounded p-1'
              onChange={(e) => setLocation(e.target.value)} />

            <label className='font-medium text-slate-800 mt-4' >Phone</label>
            <input type='text' name="phone" value={phone} className='border-2 rounded p-1'
              onChange={(e) => setPhone(e.target.value)} />

            <button type="submit" className="bg-blue-500 text-white font-medium py-1 mt-2" >
              Save
            </button>  

          </form>
        </div>

        <div className="shadow-lg p-8 w-[70%]">
          <table className="border-separate border border-slate-500 ...">
            <thead>
              <tr>
                <th className="border border-slate-600 ... w-[2rem] h-[2.5rem]">#</th>
                <th className="border border-slate-600 ... w-[10rem] ">Name</th>
                <th className="border border-slate-600 ... w-[10rem] ">Location</th>
                <th className="border border-slate-600 ... w-[10rem] ">Phone</th>
                <th className="border border-slate-600 ... w-[10rem] ">Actions</th>
              </tr>
            </thead>
            {
              dbData?.map((ele ,index ) => (
                <tbody key={index}>
              <tr>
                <td className="border border-slate-700 ... h-[2.5rem] ">{index + 1}</td>
                <td className="border border-slate-700 ...">{ele.Name}</td>
                <td className="border border-slate-700 ...">{ele.Location}</td>
                <td className="border border-slate-700 ...">{ele.Phone}</td>
                <td className="flex justify-center center" >
                  {/* <button className="bg-blue-600 text-white py-1 px-4"
                  >
                    Edit
                  </button> */}
                  
                  <button className="bg-red-600 text-white py-1 px-4"
                   onClick={() => handelDeleteUser(ele.Phone)} >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
              ))
            }
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-[2rem] text-xl font-bold text-slate-600 font-mono">
        <h1>
          Please Wait , contact will appear on right 
        </h1>
      </div>
    </div>
  );
}

export default App;
