import React, { Component } from 'react';
import { Icon } from 'antd';
import Input from './uielements/input';
import Button from './uielements/button';

export default class EditableComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.check = this.check.bind(this);
    this.edit = this.edit.bind(this);
    this.triggeredClickPropagation = false;
    this.state = {
      value: this.props.value,
      editable: false,
    };
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
  }
  check() {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.props.itemKey, this.state.value);
    }
  }
  edit() {
    this.setState({ editable: true });
  }

  componentDidMount(){
    const { registerLayoutOnClick } = this.props;
    registerLayoutOnClick(()=>{
      const { editable } = this.state;
      if (editable && !this.triggeredClickPropagation) {
        this.check();
      }
      if (this.triggeredClickPropagation) {
        this.triggeredClickPropagation = false;
      }
    });
  }

  render() {
    const { value, editable } = this.state;
    //const { resetTodo, completeTodo, isCompleted } = this.props;
    return (
      <div className="isoNoteContent" onClick={() => this.triggeredClickPropagation = true }>
        {editable
          ? <div className="isoNoteEditWrapper">
              <Input
                type="textarea"
                rows={2}
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="isoNoteEditIcon"
                onClick={this.check}
              />
              { /* Probably this buttons are not needed
                isCompleted ? 
                <Button
                  className="isoForwardIcon"
                  icon="reload"
                  type="button"
                  onClick={resetTodo}
                /> :
                <div>
                  <Button
                    className="isoResetIcon"
                    icon="reload"
                    type="button"
                    onClick={resetTodo}
                  />
                  <Button
                    className="isoForwardIcon"
                    icon="step-forward"
                    type="button"
                    onClick={completeTodo}
                  />
                </div>
              */ }
            </div>
          : <p className="isoNoteTextWrapper" onClick={this.edit}>
              {value || ' '}
              <Icon type="edit" className="isoNoteEditIcon" />
            </p>}
      </div>
    );
  }
}
