import React, { useState } from "react";
import {
  Modal,
  Container,
  FormControl,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { storeTasks, storeModalState } from "../../redux/actions";
import { validateTask } from "../../utils/validators";
function TaskModal(props) {
  let { targetTask, interActionType } = props;

  const [values, setValues] = useState({});
  const [formError, setFormError] = useState("");
  const handleChange = (filed, value) => {
    values[filed] = value;
    setValues(values);
  };
  const handleClose = () => {
    props.storeModalState(false);
  };
  const convertTOArray = () => {
    const tasks = Object.keys(props.tasks).map((key) => {
      return props.tasks[key];
    });
    return tasks;
  };
  const handleSubmit = async () => {
    const tasks = convertTOArray();
    setFormError("");

    if (interActionType === "create") {
      try {
        values.status = "inProgress";
        values.id = Math.ceil(Math.random() * 10000000);
        await validateTask.validateAsync({
          title: values.title,
          description: values.description,
          status: values.status,
          id: values.id,
          priority: values.priority,
          gifts: values.gifts,
        });
        props.storeTasks([...tasks, values]);
        setValues({});
        handleClose();
      } catch (ex) {
        let validatinError = ex.toString();
        if (validatinError.includes("ValidationError:"))
          setFormError(validatinError.replace("ValidationError:", ""));
      }
    } else {
      values.id = targetTask.id;
      values.status = targetTask.status;
      if (!values.title) {
        values.title = targetTask.title;
      }
      if (!values.description) {
        values.description = targetTask.description;
      }
      if (!values.gifts) {
        values.gifts = targetTask.gifts;
      }
      if (!values.priority) {
        values.priority = targetTask.priority;
      }
      try {
        await validateTask.validateAsync({
          title: values.title,
          description: values.description,
          status: values.status,
          id: values.id,
          priority: values.priority,
          gifts: values.gifts,
        });

        let filtered = tasks.filter((item) => item.id !== targetTask.id);
        props.storeTasks([...filtered, values]);
        setValues({});
        handleClose();
      } catch (ex) {
        let validatinError = ex.toString();
        if (validatinError.includes("ValidationError:"))
          setFormError(validatinError.replace("ValidationError:", ""));
      }
    }
  
  };

  const handleRemove = () => {
    let tasks = convertTOArray();

    let filtered = tasks.filter((task) => task.id !== targetTask.id);
    props.storeTasks(filtered);
    handleClose();
  };
  const changeTaskState = () => {
    targetTask.status = "done";
    let converted = convertTOArray();
    let filtered = converted.filter((item) => item.id !== targetTask.id);
    props.storeTasks([...filtered, targetTask]);
    handleClose();
  };
  return (
    <Modal
      open={props.modalState}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ top: "25%" }}
    >
      {interActionType === "create" || interActionType === "edit" ? (
        <Container className="formContainer" maxWidth="sm">
          <div className="modal_header">
            <h3>{interActionType === "create" ? "Create" : "Edit"} User</h3>
            <span>{formError!==""&&'* '+formError}</span>
          </div>
          <hr />
          <FormControl fullWidth={true} className="form_control">
            <InputLabel>Title</InputLabel>
            <Input
              onChange={(e) => handleChange("title", e.target.value)}
              defaultValue={interActionType === "edit" ? targetTask.title : ""}
            />
          </FormControl>
          <FormControl fullWidth={true} className="form_control">
            <InputLabel>Descriotion</InputLabel>
            <Input
              defaultValue={
                interActionType === "edit" ? targetTask.description : ""
              }
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth={true} className="form_control">
            <InputLabel>Gifts And KPI</InputLabel>
            <Input
              defaultValue={interActionType === "edit" ? targetTask.gifts : ""}
              onChange={(e) => handleChange("gifts", e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth={true} className="form_control">
            <FormLabel>Priority</FormLabel>

            <RadioGroup
              aria-label="priority"
              onChange={(e) => handleChange("priority", e.target.value)}
              defaultValue={
                interActionType === "edit" ? targetTask.priority : ""
              }
            >
              <FormControlLabel value="high" control={<Radio />} label="High" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="low" control={<Radio />} label="Low" />
            </RadioGroup>
          </FormControl>
          <div className="btn_area">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              {props.interActionType === "create" ? "Add" : "Edit"}
            </Button>

            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Container>
      ) : (
        <Container className="detail_container" maxWidth="sm">
          <div className="task_details_container">
            <span className="high">{targetTask.priority}</span>
            <div className="task_title">
              <h3>{targetTask.title}</h3>
            </div>
            <div className="task_desc">
              <p>{targetTask.description}</p>
            </div>
            <hr />
            <div className="btn_area">
              <Button variant="contained" className="edit_btn">
                Edit
              </Button>
              {targetTask.status !== "done" ? (
                <Button
                  variant="contained"
                  className="done_btn"
                  onClick={changeTaskState}
                >
                  Done
                </Button>
              ) : (
                ""
              )}

              <Button
                variant="contained"
                className="delete_btn"
                onClick={handleRemove}
              >
                Delete
              </Button>
            </div>
          </div>
        </Container>
      )}
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    modalState: state.modalState.status,
  };
};
const mapDispatchToProps = (dispatch) => ({
  storeTasks: (tasks) => dispatch(storeTasks(tasks)),
  storeModalState: (modalState) => dispatch(storeModalState(modalState)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);
