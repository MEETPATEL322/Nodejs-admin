import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import './list.css';
const List = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
      getuser();
  }, []);

    function getuser() {
      let url = `${process.env.REACT_APP_API_URL}/news`;
      axios.get(url)
          .then((res) => {
              setData(res.data)
              console.log("123=========>>>>>>>>>>",res.data)
          })
    }

    function Deleteuser(id: any) {
      axios.delete(`${process.env.REACT_APP_API_URL}/news/${id}`).then((res) => {
              console.log(res)
              console.log("data deleted Successfully ")
              alert("Data Datleted Successfully!!!")
              getuser()
          })
    }

    function updatedata(item: { _id: string;
        newstitle: string; 
        newsimage: { data: string; }; 
        newsdescription: string; }) {
        // alert(id)
        // setdata(data)
        console.log(item)
        let { _id, newstitle, newsimage, newsdescription } = item;
        localStorage.setItem('ID', _id);
        localStorage.setItem('newstitle', newstitle);
        localStorage.setItem('image', newsimage.data);
        localStorage.setItem('newsdescription', newsdescription);
        // localStorage.setItem('MobileNo', MobileNo);
        // localStorage.setItem('Password', Password)
    }

    return (
      <div className='container'>
         {console.log("dataaaaaaaaa",data && data.data)}
            <h4 style={{ textAlign: "center", marginTop: 10 }}>News List</h4>
            <table className="table table-bordered border-rounded mt-3 container">
                <thead className='table-dark'>
                    <tr className="neel">
                        <th>Newstitle</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Update/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.data && data.data.map((item: { _id: string; 
                    newstitle: string; 
                    newsimage: { data: string; }; 
                    newsdescription: string }) => {
                        
                       return (
                            <tr key={item._id}>
                                <td>{item.newstitle}</td>
                                <td><img src={`${process.env.REACT_APP_API_URL}` + item.newsimage} style={{width: 100, height: 100}} alt={item._id} /></td>
                                <td>{item.newsdescription}</td>
                                <td>
                                <Link to="/crafted/news/update"> <button className='btn btn-primary' onClick={() => updatedata(item)}>Update</button></Link>
                                    <button className='btn btn-danger mx-3' onClick={() => Deleteuser(item._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
  }
  
  export default List