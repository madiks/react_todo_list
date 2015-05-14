var TaskItem = React.createClass({
  markTaskDone: function(e){
    this.props.onMarkTaskDone(this.props.task.id);
  },
  render: function(){
    return (
      <li className="ui-state-default">
          <div className="checkbox">
              <label>
                  <input type="checkbox" onClick={this.markTaskDone} />{this.props.task.taskName}
              </label>
          </div>
      </li>
    );
  }
});

var TaskList = React.createClass({
  render: function(){
    var tasks = [];
    this.props.tasks.forEach(function(task){
      if(!task.hasDone){
        tasks.push(<TaskItem key={task.taskName} task={task} onMarkTaskDone={this.props.onMarkTaskDone} />);
      }
    }.bind(this));

    return (
      <ul id="sortable" className="list-unstyled">
        {tasks}
      </ul>
    );
  }
});

var TaskStatistic = React.createClass({
  render: function(){
    var undoneTasksCount = 0;
    this.props.tasks.forEach(function(task){
      if(!task.hasDone){
        undoneTasksCount++;
      }
    });
    return (
      <div className="todo-footer">
          <strong><span className="count-todos"></span></strong> {undoneTasksCount} Items Left
      </div>
    );
  }
});


var MarkAllTaskDone = React.createClass({
  markAllTaskDone: function(e){
    this.props.onMarkAllTaskDone();
  },
  render: function(){
    return (
      <button id="checkAll" onClick={this.markAllTaskDone} className="btn btn-success">Mark all as done</button>
    );
  }
});

var NewTaskInput = React.createClass({
  handleInput: function(e){
    if (e.which == 13) {
      var newTask = this.refs.newTask.getDOMNode().value.trim();
      if(newTask) {
        this.props.onAddNewTask(newTask);
      }
    }
  },
  render: function(){
    return (
      <input type="text" ref="newTask" className="form-control add-todo" onKeyDown={this.handleInput} placeholder="Add todo" />
    );
  }
});

var TodosPanel = React.createClass({
  render: function(){
    return (
      <div className="todolist not-done">
        <h1>Todos</h1>
          <NewTaskInput onAddNewTask={this.props.onAddNewTask} />
          <MarkAllTaskDone onMarkAllTaskDone={this.props.onMarkAllTaskDone} />
        <hr />
          <TaskList tasks={this.props.tasks} onMarkTaskDone={this.props.onMarkTaskDone} />
          <TaskStatistic tasks={this.props.tasks} />
      </div>
    );
  }
});


var DonesPanel = React.createClass({
  render: function(){
    return (
      <div className="todolist">
        <DoneList tasks={this.props.tasks} onRemoveDoneTask={this.props.onRemoveDoneTask} />
      </div>
    );
  }
});

var DoneList = React.createClass({
  render: function(){
    var doneTasks = [];
    this.props.tasks.forEach(function(task){
      if(task.hasDone) {
        doneTasks.push(<DoneItem key={task.taskName} task={task} onRemoveDoneTask={this.props.onRemoveDoneTask} />);
      }
    }.bind(this));
    return (
      <ul id="done-items" className="list-unstyled">
        {doneTasks}
      </ul>
    );
  }
});

var DoneItem = React.createClass({
  removeDoneTask: function(e){
    this.props.onRemoveDoneTask(this.props.task.id);
  },
  render: function(){
    return (
      <li>
        {this.props.task.taskName}
        <button className="remove-item btn btn-default btn-xs pull-right" onClick={this.removeDoneTask}><span className="glyphicon glyphicon-remove"></span></button>
      </li>
    );
  }
});


var tasks = [
  {id: "t1", taskName: "buy mac", hasDone: false},
  {id: "t2", taskName: "get update", hasDone: false},
  {id: "t3", taskName: "win a game", hasDone: false},
  {id: "t4", taskName: "start this project", hasDone: true},
  {id: "t5", taskName: "have a good day", hasDone: true}
];


var React_Todo_List = React.createClass({
  getInitialState: function(){
    return {tasks: tasks};
  },
  markAllTaskDone: function(){
    var tasks = this.state.tasks.map(function(task){
      if(task.hasDone){
        return task;
      }
      task.hasDone = true;
      return task;
    });
    this.setState({tasks: tasks});
  },
  addNewTask: function(taskName){
    var task = {id: "t" + (this.state.tasks.length + 1), taskName: taskName, hasDone: false};
    var tasks = this.state.tasks;
    tasks.unshift(task);
    this.setState({tasks: tasks});
  },
  markTaskDone: function (id) {
    var tasks = this.state.tasks.map(function(task){
      if(task.id === id){
        task.hasDone = true;
        return task;
      }
      return task;
    });
    this.setState({tasks: tasks});
  },
  removeDoneTask: function (id) {
    var removeTaskIndex = "";
    var tasks = this.state.tasks;
    tasks.some(function(task, index){
      if(task.id === id){
        removeTaskIndex = index;
        return true;
      }
    });
    tasks.splice(removeTaskIndex, 1);
    this.setState({tasks: tasks});
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-md-6">
          <TodosPanel tasks={this.state.tasks}
            onMarkAllTaskDone={this.markAllTaskDone}
            onMarkTaskDone={this.markTaskDone}
            onAddNewTask={this.addNewTask}
          />
        </div>
        <div className="col-md-6">
          <DonesPanel tasks={this.state.tasks} onRemoveDoneTask={this.removeDoneTask} />
        </div>
      </div>
    );
  }
});

React.render(
  <React_Todo_List />,
  document.getElementById('react_todo_list')
);



