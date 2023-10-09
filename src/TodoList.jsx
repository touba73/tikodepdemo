import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function TodoList() {
  const [todo, setTodo] = useState({ desc: "", date: null, priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  //päivämäärä muotoon dd/mm/yyy
  const dateCellRenderer = (params) => {
    const date = params.data.date;
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString("fi-FI");
      return formattedDate;
    }
    return "";
  };

  const [columnDefs] = useState([
    {
      headerName: "Description",
      field: "desc",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      headerName: "Priority",
      field: "priority",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
      cellRenderer: dateCellRenderer,
    },
  ]);

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
    setTodo({ desc: "", date: null, priority: "" });
  };

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const deleteTodo = () => {
    const selectedNodes = gridRef.current.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const rowIndex = selectedNodes[0].rowIndex;
      const updatedTodos = [...todos];
      updatedTodos.splice(rowIndex, 1);
      setTodos(updatedTodos);
    } else {
      alert("error");
    }
  };

  const handleDateChange = (date) => {
    setTodo({ ...todo, date });
  };

  return (
    <Container>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        mt={10}
      >
        <label htmlFor="date"> </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date:"
            name="date"
            id="date"
            value={todo.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <label htmlFor="desc"></label>
        <TextField
          label="Desc"
          type="text"
          name="desc"
          id="desc"
          value={todo.desc}
          onChange={inputChanged}
        />

        <label htmlFor="priority"> </label>
        <TextField
          label="Priority"
          type="text"
          name="priority"
          id="priority"
          value={todo.priority}
          onChange={inputChanged}
        />

        <Button variant="contained" onClick={addTodo}>
          Add
        </Button>
        <Button variant="contained" color="error" onClick={deleteTodo}>
          Delete
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        mt={10}
      >
        <div className="ag-theme-material " style={{ width: 600, height: 500 }}>
          <AgGridReact
            ref={gridRef}
            onGridReady={(params) => (gridRef.current = params.api)}
            rowSelection="single"
            columnDefs={columnDefs}
            rowData={todos}
            animateRows={true}
          />
        </div>
      </Stack>
    </Container>
  );
}

export default TodoList;
