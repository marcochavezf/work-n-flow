import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Sound from 'react-sound';
import ReactGA from 'react-ga';
import todoAction from '../../redux/todos/actions.js';
import { todoStatus } from '../../helpers/utility';
import { TodoWrapper } from './todo.style.js';
// import TodoContent from './todoContent';
import Async from '../../helpers/asyncComponent';
import * as _ from 'lodash';

const defaultTitle = 'Work & Flow';
const soundUrls = {};
let lastTimeActive = null;
soundUrls[todoStatus.COMPLETED] = 'sounds/a-tone.mp3';
soundUrls[todoStatus.IN_PROGRESS] = 'sounds/a-tone.mp3';
// soundUrls[todoStatus.PENDING] = 'sounds/electronic-chime.mp3';
class ToDo extends Component {
  state = {
    title: defaultTitle,
    soundToPlay: null
  }
  onClickListeners = [];
  todoWrapperOnClick = () => {
    this.onClickListeners.forEach(listener => listener());
  }
  registerLayoutOnClick = (callback) => {
    this.onClickListeners.push(callback);
  }
  changeTitle = (title = defaultTitle) => {
    this.setState({ title });
  }
  playSound = (soundToPlay) => {
    this.setState({ soundToPlay });
  }
  componentDidMount(){
    //update component if it has been inactive for long time
    window.addEventListener('focus', ()=>{
      const timeNow = new Date();
      if (lastTimeActive) {
        const limitTime = 3 * 60 * 60 * 1000; //3 hours
        if (timeNow - lastTimeActive > limitTime) {
          this.forceUpdate();
        }
      }
      lastTimeActive = new Date();
    });
  }
  render() {
    const { title, soundToPlay } = this.state;
    const soundUrl = soundUrls[soundToPlay];
    document.title = title;
    return (
      <Layout style={{ background: 'none' }}>
        <TodoWrapper className="isomorphicTodoComponent" onClick={this.todoWrapperOnClick}>
          { soundUrl ? 
            <Sound
              url={soundUrl}
              volume={75}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={() => this.playSound()}
            /> : <div></div> }
            <Async
              load={import(/* webpackChunkName: "todo-content" */ './todoContent')}
              componentProps={Object.assign({}, this.props, this)}
            />
          {/* <TodoContent
            userId={userId}
            colors={colors}
            daysAgo={daysAgo}
            playSound={this.playSound}
            changeTitle={this.changeTitle}
            updateDaysAgo={updateDaysAgo}
            registerLayoutOnClick={this.registerLayoutOnClick}
          /> */}
        </TodoWrapper>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { colors, daysAgo } = state.Todos.toJS();
  const { uid: userId } = state.Auth.toJS();
  ReactGA.set({ userId: userId });
  return {
    colors,
    daysAgo,
    userId,
  };
}

const {
  updateDaysAgo,
} = todoAction;
export default compose(
  connect(mapStateToProps, {
    updateDaysAgo,
  })
)(ToDo)