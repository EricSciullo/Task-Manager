<template>
    <div id="task-list" class="container" style="margin-top: 10vh">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <h1 class="text-center display-4" style="color: white">My Tasks</h1>
                <form class="input-group" style="display: flex; flex-direction: row">
                    <input v-model="inputTask" required type="text" maxlength="50" id="tasknameinput" class="col-md-10 form-control" placeholder="New Task" aria-describedby="basic-addon">
                    <button v-if="this.isUpdating == false" v-on:click.prevent="addNewTask" type="button" class="input-group-append btn btn-success col-md-2 font-weight-bold" style="justify-content: center">
                        Submit
                    </button>
                    <button v-else v-on:click.prevent="updateTaskName" type="button" class="input-group-append btn btn-primary col-md-2 font-weight-bold" style="justify-content: center">
                        Update
                    </button>
                </form>

                <table class="table table-sm table-dark" style="border-radius: 4px">
                    <tr v-for="task in tasks" :key="task.id">
                        <td class="form-control-lg">
                          <button class="btn btn-secondary" :class="{ 'btn-success': task.completed }" title="Click to mark as complete" v-on:click="editTaskCompletion(task.id)"><span class="fa fa-check"></span></button>
                          {{task.name}}
                        </td>
                        <td class="text-right">
                            <button class="btn btn-primary" title="Update task" v-on:click="editTaskName(task.name, task.id)"><span class="fa fa-edit"></span></button>
                            <button class="btn btn-danger" title="Delete task" v-on:click="deleteTask(task.id)"><span class="fa fa-trash"></span></button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Tasks',
  data () {
    return {
      tasks: [],
      id: '',
      inputTask: '',
      isComplete: 0,
      isUpdating: false
    }
  },
  mounted () {
    this.getTasks()
  },
  methods: {
    getTasks () {
      axios.get('http://localhost:3000/api/get_tasks').then(
        result => {
          this.tasks = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewTask () {
      axios.post('http://localhost:3000/api/task_add', { name: this.inputTask })
        .then((res) => {
          this.inputTask = ''
          this.getTasks()
        }).catch((err) => {
          console.log(err)
        })
    },
    editTaskName (title, id) {
      this.id = id
      this.inputTask = title
      this.isUpdating = true
    },
    // editTaskCompletion - flips 'isComplete' 0 <--> 1
    editTaskCompletion (id) {
      this.id = id
      this.isComplete = 0
      /* This line finds the selected item by id from 'tasks[]' and returns true if
         the 'completed' value associated with that id is set to 0
         If result is true, change isComplete to 1 */
      if (this.tasks.find(item => item.id === id).completed === 0) {
        this.isComplete = 1
      }
      this.updateTaskCompletion()
    },
    updateTaskName () {
      axios.put('http://localhost:3000/api/task_update/' + this.id,
        { name: this.inputTask })
        .then((res) => {
          this.inputTask = ''
          this.isUpdating = false
          this.getTasks()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateTaskCompletion () {
      axios.put('http://localhost:3000/api/task_update/' + this.id,
        { completed: this.isComplete })
        .then((res) => {
          this.getTasks()
        })
        .catch((err) => {
          console.log(err.response.data.error)
        })
    },
    deleteTask (id) {
      axios.delete('http://localhost:3000/api/task_del/' + id)
        .then((res) => {
          this.inputTask = ''
          this.getTasks()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
