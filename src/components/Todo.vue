<template>
  <div class="todo">
    <h1>Todo List</h1>
    <form @submit.prevent="add">
        <input type="text" placeholder="Enter Todo" v-model="title">
        <button class="btn btn-primary"> Add to list </button>
    </form>
    <ul>
        <li v-for="(todo, index) in todos" :key="index">{{ index+1 }} -{{ todo }} 
            <span class="x" @click="remove(index)">X</span> 
        </li><br>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    msg: String
  },
  data(){
    return {
        title: null,
        todos: ['Mango']
    }
  },
  methods: {
      add(){
          this.todos.unshift(this.title);
          this.title= '';

      },
      remove(id){
          // how you can delete using $delete helper
          this.$delete(this.todos, id);
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.x{
    margin-left: 25px;
    cursor: pointer;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
