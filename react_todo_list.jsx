var TaskItem = React.createClass({
  render: function(){
    return (
      <li className="ui-state-default">
          <div className="checkbox">
              <label>
                  <input type="checkbox" />{this.props.task.taskName}
              </label>
          </div>
      </li>
    );
  }
});

var TaskList = React.createClass({
  render: function(){

    var tasks = this.props.tasks.map(function(task){
      return <TaskItem key={task.taskName} task={task} />;
    });

    return (
      <ul id="sortable" className="list-unstyled">
        {tasks}
      </ul>
    );
  }
});

var TaskStatistic = React.createClass({
  render: function(){
    return (
      <div className="todo-footer">
          <strong><span className="count-todos"></span></strong> {this.props.tasks.length} Items Left
      </div>
    );
  }
});


var MarkAllTaskDone = React.createClass({
  render: function(){
    return (
      <button id="checkAll" className="btn btn-success">Mark all as done</button>
    );
  }
});

var NewTaskInput = React.createClass({
  handleInput: function(){
    var newTask = this.refs.newTask.getDOMNode().value.trim();
  },
  render: function(){
    return (
      <input type="text" ref="newTask" className="form-control add-todo" placeholder="Add todo" />
    );
  }
});

var TodosPanel = React.createClass({
  render: function(){
    return (
      <div className="todolist not-done">
        <h1>Todos</h1>
          <NewTaskInput />
          <MarkAllTaskDone />
        <hr />
          <TaskList tasks={this.props.tasks} />
          <TaskStatistic tasks={this.props.tasks} />
      </div>
    );
  }
});


var DonesPanel = React.createClass({
  render: function(){
    return (
      <div className="todolist">
        <DoneList doneTasks={this.props.doneTasks} />
      </div>
    );
  }
});

var DoneList = React.createClass({
  render: function(){

    var doneTasks = this.props.doneTasks.map(function(doneTask){
      return (
        <DoneItem key={doneTask.taskName} doneTask={doneTask} />
      );
    });
    return (
      <ul id="done-items" className="list-unstyled">
        {doneTasks}
      </ul>
    );
  }
});

var DoneItem = React.createClass({
  render: function(){
    return (
      <li>
        {this.props.doneTask.taskName}
        <button className="remove-item btn btn-default btn-xs pull-right"><span className="glyphicon glyphicon-remove"></span></button>
      </li>
    );
  }
});

var tasks = [{taskName: "buy mac"},{taskName: "get update"},{taskName: "win a game"}];
var doneTasks = [{taskName: "write this app"},{taskName: "get it"}];

var React_Todo_List = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col-md-6">
          <TodosPanel tasks={this.props.tasks} />
        </div>
        <div className="col-md-6">
          <DonesPanel doneTasks={this.props.doneTasks} />
        </div>
      </div>
    );
  }
});

React.render(
  <React_Todo_List tasks={tasks} doneTasks={doneTasks} />,
  document.getElementById('react_todo_list')
);



