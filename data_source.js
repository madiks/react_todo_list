var Model = (function(){
  return {
    getTasks: function(){
      var json_tasks = window.localStorage.getItem('tasks');
      if (!json_tasks) {
        return [];
      }
      try{
        var tasks = JSON.parse(json_tasks);
      }catch(e){
        return [];
      }
      return tasks;
    },
    setTasks: function(tasks){
      json_tasks = JSON.stringify(tasks);
      window.localStorage.setItem('tasks', json_tasks);
    }
  };
})();
