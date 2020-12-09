

class TimersDashboard extends React.Component{

  handleCreateFormSubmit=(timer)=>{
    this.createTimer(timer)
  }
  createTimer=(timer)=>{
    const t= helpers.newTimer(timer)
    this.setState({timers:this.state.timers.concat(t)})
  }

  state={
    timers:[
      {
        title:'Learn React',
        project:'Web Domination',
        id:uuid.v4(),
        elapsed:4545454,
        runningSince:Date.now()
      },
      {
        title:'Learn Mathematics',
        project:'World Domination',
        id:uuid.v4(),
        elapsed:9595494,
        runningSince:null
      }
    ]
  }
  render(){
    return(
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}  
          />
          <ToggleableTimerForm
            isOpen={false}
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    )
  }
}

class EditableTimerList extends React.Component{
  render(){
    const timers=this.props.timers.map(timer=>(
      <EditableTimer
        title={timer.title}
        project={timer.project}
        id={timer.id}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
      />
    ))
    return(
      <div id='timers'>
        {timers}
      </div>
    );
  }
}

class EditableTimer extends React.Component{
  state={
    editFormOpen:false
  }
  render(){
    if(this.state.editFormOpen){
      return(
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
        />
      )
    } else{
      return(
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      )
    }
  }
}

class TimerForm extends React.Component {
  state={
    title:this.props.title || '',
    project: this.props.project || ''
  }
  handleTitleChange= (e)=>{
    this.setState({title: e.target.value})
  }
  handleProjectChange= (e)=>{
    this.setState({project: e.target.value})
  }
  handleSubmit= ()=>{
    this.props.onFormSubmit({
      id:this.props.id,
      title:this.state.title,
      project:this.state.project
    })
  }
  render(){
    const submitText= this.props.id ? 'Update' : "Create";
    return(
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' onChange={this.handleTitleChange} value={this.state.title}/>
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' onChange={this.handleProjectChange} value={this.state.project}/>
            </div>
            <div className='ui two bottom attached buttons'>
              <button onClick={this.handleSubmit} className='ui basic blue button'>
                {submitText}
              </button>
              <button onClick={this.props.onFormClose} className='ui basic red button'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class ToggleableTimerForm extends React.Component{
  state={
    isOpen:false
  }
  handleFormOpen=()=>{
    this.setState({ isOpen:true })
  }
  handleFormClose=()=>{
    this.setState({ isOpen:false})
  }
  handleFormSubmit=(timer)=>{
    this.props.onFormSubmit(timer);
    this.setState({ isOpen:false})
  }
  render(){
    if(this.state.isOpen){
      return (
        <TimerForm
        onFormClose={this.handleFormClose}
        onFormSubmit={this.handleFormSubmit}
        />
      )
    } else{
      return(
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon' onClick={this.handleFormOpen}>
            <i className='plus icon'/>
          </button>
        </div>
      )
    }
  }
}

class Timer extends React.Component{
  render(){
    const elapsedString= helpers.renderElapsedString(this.props.elapsed);

    return(
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon'></i>
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon'/>
            </span>
          </div>
        </div>
        <div className='ui bottom attached blue basic button'>
          Start
        </div>
      </div>
    )
  }

}

ReactDOM.render(
  <TimersDashboard/>,
  document.getElementById('content')
);