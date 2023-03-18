import "./App.css";
import { useEffect, useState } from "react";
let edit = {
  name: "",
  role: "",
  email: "",
};

function App() {
  let [mainData, setMainData] = useState([]);
  let [search, setSearch] = useState("");
  let [length, setlength] = useState(0);
  let [selectItem, setSelect] = useState([]);
  let [arr, setArr] = useState([]);
  let [editableData, setEditableData] = useState(edit);

  let [editno, setEditNo] = useState(null);

  const handleEditbyData = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

  const hanldeEditFuncSubmit = (id) => {
    console.log(id, editableData);
    if (editableData.name && editableData.role && editableData.email) {
      let data = JSON.parse(localStorage.getItem("storeData")) || [];

      let filter = data.map((elem) => {
        if (elem.id === id) {
          return editableData;
        } else {
          return elem;
        }
      });
      setMainData(filter.slice(page * 10, 10));
      setlength(Math.ceil(filter.length / 10));

      localStorage.setItem("storeData", JSON.stringify(filter));
    } else if (editableData.name && editableData.role) {
      let data = JSON.parse(localStorage.getItem("storeData")) || [];

      let filter = data.map((elem) => {
        if (elem.id === id) {
          return { ...elem, name: editableData.name, role: editableData.role };
        } else {
          return elem;
        }
      });
      setMainData(filter.slice(page * 10, 10));
      setlength(Math.ceil(filter.length / 10));

      localStorage.setItem("storeData", JSON.stringify(filter));
    } else if (editableData.name && editableData.email) {
      let data = JSON.parse(localStorage.getItem("storeData")) || [];

      let filter = data.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            name: editableData.name,
            email: editableData.email,
          };
        } else {
          return elem;
        }
      });
      setMainData(filter.slice(page * 10, 10));
      setlength(Math.ceil(filter.length / 10));

      localStorage.setItem("storeData", JSON.stringify(filter));
    } else if (editableData.role && editableData.email) {
      let data = JSON.parse(localStorage.getItem("storeData")) || [];

      let filter = data.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            role: editableData.role,
            email: editableData.email,
          };
        } else {
          return elem;
        }
      });
      setMainData(filter.slice(page * 10, 10));
      setlength(Math.ceil(filter.length / 10));

      localStorage.setItem("storeData", JSON.stringify(filter));
    }

    setEditableData(edit);
    setEditNo(null);
  };
  // let arr = [];
  let [page, setPage] = useState(0);
  const getData = async () => {
    let res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    try {
      let data = await res.json();
      localStorage.setItem("storeData", JSON.stringify(data));

      setMainData(data.slice(0, 10));
      setlength(Math.ceil(data.length / 10));

      // console.log(typeof data[0].id);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleGroupDelete = (id, flag) => {
    setSelect([...selectItem, id]);
    // console.log(id, flag, "jy");
  };
  const handleDelletAllfromSingleBtn = () => {
    let data = JSON.parse(localStorage.getItem("storeData")) || [];
    // console.log(data);
    let filterDataa = [];
    // selectItem = selectItem.map(Number);
    // selectItem.sort();

    for (let i = 0; i < data.length; i++) {
      let flag = false;
      for (let j = 0; j < selectItem.length; j++) {
        if (selectItem[j] === data[i].id) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        filterDataa.push(data[i]);
      }
    }
    // console.log(filterDataa, selectItem);
    setSelect([]);
    localStorage.setItem("storeData", JSON.stringify(filterDataa));

    setMainData(filterDataa.slice(0, 10));
    setlength(Math.ceil(filterDataa.length / 10));

    // console.log(selectItem);
  };

  const deletFunctionindividual = (id) => {
    let data = JSON.parse(localStorage.getItem("storeData")) || [];

    let filter = data.filter((elem) => elem.id !== id);
    setMainData(filter.slice(page * 10, 10));
    setlength(Math.ceil(filter.length / 10));

    localStorage.setItem("storeData", JSON.stringify(filter));

    // console.log(id, filter);
  };

  const handlePage = (no) => {
    let data = JSON.parse(localStorage.getItem("storeData")) || [];
    // console.log(no);
    if (search) {
      let searchData = data.filter(function (elem) {
        if (elem.name === search) {
          return elem;
        } else if (elem.email === search) {
          return elem;
        } else if (elem.role === search) {
          return elem;
        }
      });

      setMainData(searchData.slice(no * 10, no * 10 + 10));
      setPage(no);
    } else {
      setMainData(data.slice(no * 10, no * 10 + 10));
      setPage(no);
    }
    // console.log(no * 10, length);
    // setlength(Math.ceil(data.length / 10));
  };

  useEffect(() => {
    let a = [];

    for (let i = 0; i < length; i++) {
      a.push(i + 1);
    }
    setArr(a);
    // arr = [...a];
  }, [length]);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("storeData")) || [];
    data = data.slice(0, 10);
    // console.log(data);
    if (search) {
      let searchData = data.filter(function (elem) {
        if (elem.name === search) {
          return elem;
        } else if (elem.email === search) {
          return elem;
        } else if (elem.role === search) {
          return elem;
        }
      });
      // console.log(searchData, search);

      setMainData(searchData);
      setlength(Math.ceil(searchData.length / 10));
    }
  }, [search]);
  return (
    <div className="App">
      <h1>Admin</h1>

      <div>
        <input
          palceholder="Search by name or role"
          style={{ width: "80%", margin: "auto" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ width: "95%", margin: "auto" }}>
        <table style={{ width: "100%", margin: "auto" }}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mainData
              ? mainData.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="radio"
                          checked={selectItem.includes(elem.id)}
                          onChange={(e) =>
                            handleGroupDelete(elem.id, e.target.checked)
                          }
                        />
                      </td>
                      <td>{elem.name}</td>
                      <td>{elem.email}</td>
                      <td>{elem.role}</td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "green",
                            borderRadius: "5px",
                            padding: "5px",
                            marginRight: "5px",
                          }}
                          onClick={() => setEditNo(elem.id)}
                        >
                          Edit
                        </button>

                        {editno === elem.id ? (
                          <div
                            style={{
                              width: "30%",
                              position: "fixed",
                              zIndex: "1000",
                              backgroundColor: "yellow",
                              left: "400px",
                              // right: "200px",
                              top: "200px",
                              padding: "30px",
                            }}
                          >
                            <label>name</label>
                            <input
                              style={{
                                backgroundColor: "orange",
                                color: "black",
                                margin: "5px",
                              }}
                              palceholder="name"
                              name="name"
                              onChange={handleEditbyData}
                            />
                            <br />
                            <label>email</label>
                            <input
                              style={{
                                backgroundColor: "orange",
                                color: "black",
                                margin: "5px",
                              }}
                              palceholder="email"
                              name="email"
                              onChange={handleEditbyData}
                            />{" "}
                            <br />
                            <label>role</label>
                            <input
                              style={{
                                backgroundColor: "orange",
                                color: "black",
                                margin: "5px",
                              }}
                              palceholder="role"
                              name="role"
                              onChange={handleEditbyData}
                            />
                            <br />
                            <button
                              onClick={() => hanldeEditFuncSubmit(elem.id)}
                            >
                              Submit
                            </button>
                          </div>
                        ) : null}

                        <button
                          style={{
                            backgroundColor: "red",
                            borderRadius: "5px",
                            padding: "5px",
                          }}
                          onClick={() => deletFunctionindividual(elem.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "auto",
          width: "80%",
          marginTop: "40px",
        }}
      >
        <div style={{ width: "20%" }}>
          <button
            style={{
              backgroundColor: "red",
              borderRadius: "50px",
              padding: "15px",
            }}
            onClick={handleDelletAllfromSingleBtn}
            disabled={selectItem.length === 0}
          >
            Delete Selected
          </button>
        </div>
        <div style={{ display: "flex", width: "60%" }}>
          <button
            style={{
              backgroundColor: "green",
              borderRadius: "10px",
              width: "10%",
            }}
            onClick={() => handlePage(0)}
          >
            start
          </button>
          <button
            // w="30px"
            style={{
              backgroundColor: "green",
              borderRadius: "10px",
              width: "10%",
            }}
            disabled={page === 0}
            onClick={() => handlePage(page - 1)}
          >
            prev
          </button>

          {arr.map((el, ind) => {
            return (
              <button
                style={{
                  backgroundColor: "green",
                  borderRadius: "10px",
                  width: "10%",
                }}
                kay={ind}
                onClick={() => handlePage(el - 1)}
              >
                {el}
              </button>
            );
          })}
          <button
            // w="30px"
            style={{
              backgroundColor: "green",
              borderRadius: "10px",
              width: "10%",
            }}
            onClick={() => handlePage(page + 1)}
            disabled={page === length - 1}
          >
            next
          </button>
          <button
            style={{
              backgroundColor: "green",
              borderRadius: "10px",
              width: "10%",
            }}
            onClick={() => handlePage(length - 1)}
          >
            last
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
