import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel
} from "@material-ui/core";

import TaskModal from "../../components/modal";
import { connect } from "react-redux";
import { storeModalState, storeTasks } from "../../redux/actions";
function ToDoList(props) {
  const [interActionType, setInterActionType] = useState("create");
  const [tasks, setTasks] = useState([]);
  const [targetTask, setTargetTask] = useState({});
  const [filterValue,setFilterName] = useState('all')
  useEffect(() => {
    filterTasks(filterValue);
  }, [props.tasks]);
  const openModal = (type, task) => {
    if (type === "create") {
      setInterActionType(type);
      props.storeModalState(true);
    } else {
      setTargetTask(task);
      setInterActionType(type);
      props.storeModalState(true);
    }
  };
  const convertTOArray = () => {
    const tasks = Object.keys(props.tasks).map((key) => {
      return props.tasks[key];
    });
    return tasks;
  };
  const changeTaskState = (task) => {
    task.status = "done";
    let converted = convertTOArray();
    let filtered = converted.filter((item) => item.id !== task.id);
    props.storeTasks([...filtered, task]);
  };
  const filterTasks = (value)=>{
  
    let tasks = convertTOArray();
 
    if(value==="all"){
      setTasks(tasks)
    }else{
      let filtered = tasks.filter(task=>task.status===value);
      setTasks(filtered);
    }
    setFilterName(value)
  }
  return (
    <div className="main_container">
      <div className="first_task_btn">
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal("create")}
        >
          New Task +
        </Button>
      </div>
      <section className="table_area">
        <div className="table_filter">
          <InputLabel style={{display:'inline'}} id="demo-simple-select-label">Task Status: </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
             style={{width:'150px'}}
             onChange={(e)=>filterTasks(e.target.value)}
            value = {filterValue}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="inProgress">IN Progress</MenuItem>
          </Select>
        </div>
        <TableContainer component={Paper}>
          <Table size="medium" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Task Title</TableCell>
                <TableCell align="right">Task Description</TableCell>
                <TableCell align="right">Task Status</TableCell>
                <TableCell align="right">Task Priority</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => openModal("details", task)}
                >
                  <TableCell align="right">{task.title.length>10?task.title.slice(0,10)+"...":task.title}</TableCell>
                  <TableCell align="right">
                    {task.description.length > 10
                      ? task.description.slice(0, 10)+"..."
                      : task.description}
                  </TableCell>
                  <TableCell align="right">{task.status}</TableCell>
                  <TableCell align="right">{task.priority}</TableCell>
                  <TableCell align="right">
                    <div className="btn_area">
                      <Button
                        variant="contained"
                        className="edit_btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("edit", task);
                        }}
                      >
                        Edit
                      </Button>
                      {task.status !== "done" && (
                        <Button
                          variant="contained"
                          className="done_btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            changeTaskState(task);
                          }}
                        >
                          Done
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TaskModal interActionType={interActionType} targetTask={targetTask} />
      </section>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};
const mapDispatchToProps = (dispatch) => ({
  storeTasks: (tasks) => dispatch(storeTasks(tasks)),

  storeModalState: (modalState) => dispatch(storeModalState(modalState)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
