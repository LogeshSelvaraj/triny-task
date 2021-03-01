import React, { useState } from "react";
import axios from "axios";
import { List, ListItem } from "@material-ui/core";

function App() {
  const [list, setList] = useState(false);
  const [indents, setIdents] = useState();

  const loadingIndents = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/intent-list`)
      .then((res) => setIdents(res.data))
      .catch((err) => console.log(err));
    setList(true);
  };

  return (
    <div className="App">
      <header className="App-header pb-2">
        <h1 className="text-center pt-3">Triny Task</h1>
      </header>
      <div className="body">
        <p className="mt-5 text-center d-flex justify-content-center h4">
          <span flex="flex-2">Indents List</span>
          <button
            className="ml-5 btn btn btn-outline-success flex-1 btn-sm "
            onClick={loadingIndents}
          >
            Get
          </button>
        </p>
        {list && <hr />}
        {list && indents && indents.length && (
          <div className="mx-auto list">
            <List component="nav" aria-label="main mailbox folders">
              {indents.map((l, index) => (
                <ListItem key={l.name} button>
                  {index + 1}
                  {". "}
                  {l.displayName}
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
