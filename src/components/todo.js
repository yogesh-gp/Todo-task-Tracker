import React, { useEffect, useState } from "react";
import "./styles.css";
function Todo() {

    const getlocaldata = () => {
        const lists = localStorage.getItem("mytodolist");
        if (lists) {
            return JSON.parse(lists);
        } else {
            return [];
        }
}

  const [inputdata, setInputdata] = useState("");
    const [items, setItems] = useState(getlocaldata());
    const [isEdit, setisEdit] = useState("");
    const [togglebutton, setTogglebutton] = useState(false);
  // aadditemfunction
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && togglebutton) {
        setItems(
            items.map((curElem) => {
                if (curElem.id === isEdit) {
                    return { ...curElem, name: inputdata };
                }
                return curElem;
            })
        )
        setInputdata("");
        setisEdit(null);
        setTogglebutton(false);
    }
    else {
      const mynewinput = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, mynewinput]);
      setInputdata("");
    }
  };
   //edit items////
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputdata(item_todo_edited.name);
        setisEdit(index);
        setTogglebutton(true);
    }
    
    
  // delete item section
  const deleteItem = (index) => {
    const updateItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updateItems);
  };

    
    // remove all
    const removeALL = () => {
        setItems([]);
    };

    // useeffect
    useEffect(() => {
        localStorage.setItem("mytodolist",JSON.stringify(items))
    }, [items]);
     
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./image/6194029.png" alt="todoimage" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items"
              className="form-control"
              value={inputdata}
              onChange={(e) => setInputdata(e.target.value)}
                      />
                      {togglebutton ? (
                                      <i className="far fa-edit add-btn" onClick={addItem}></i>

                      ) : (            <i className="fa fa-plus add-btn" onClick={addItem}></i>

                              
                        )}
          </div>
          {/* show items */}
          <div className="showItems">
            {items.map((curElem, index) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                          <i className="far fa-edit add-btn"
                          onClick={()=>editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeALL}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
