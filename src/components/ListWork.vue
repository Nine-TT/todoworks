<template>
    <div class="container w-[70%]">
      <ul class=" list_view bg-white rounded-lg flex-col justify-center">
        <li
          v-for="(item, index) in listWork"
          :key="index"
          class="item flex border border-fuchsia-500 flex-col sm:flex-col  justify-between items-center rounded-md shadow-inner w-full sm:w-[90%]"
          :class="{
            'bg-green-300': item.isCompleted,
            'bg-yellow-300': item.isWarning,
            'bg-red-300': item.isPending,
          }"
        >
          <div class="w-full sm:w-[60%] border border-gray-500 p-4">
            <h2 class="mb-2">Tiêu đề: {{ item.title }}</h2>
            <p class="mb-2">Nội dung: {{ item.content }}</p>
            <span class="mb-2">Dealine: {{ item.deadline }}</span>
          </div>
  
          <div class="w-80 sm:w-[30%] flex">
            <button @click="handleDelete(index)" class="delete-btn">delete</button>
            <button class="edit-btn" @click="handleEdit(index)">Edit</button>
            <button class="completed-btn" @click="handleCompleted(index)">Completed</button>
          </div>
        </li>
      </ul>
    </div>
  </template>

<script>
export default {
    name: "ListWork",
    props: {
        listWork: []
    },

    data() {
        return {
        }
    },

    methods: {

        handleDelete(index) {
            this.$emit('delete-work', this.listWork[index].id)
        },

        handleEdit(index) {
            let data = {
                id: this.listWork[index].id,
                title: this.listWork[index].title,
                content: this.listWork[index].content,
                isCompleted: this.listWork[index].isCompleted,
                deadline: this.listWork[index].deadline
            }

            // console.log(index, data)
            this.$emit('edit-work', index, data)
        },

        handleCompleted (index) {
            let data = {
                data: this.listWork[index]
            }

            this.$emit('select-Completed', index, data)
        }

    }

}
</script>

<style>
.container {
  margin: 0 auto;
  margin-top: 20px;
}

.list_view {
  height: 85vh;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
}

.item {
  margin: 20px auto;
}

button {
  border-radius: 10px;
  width: 100px;
  height: 28px;
  margin: 20px 20px;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.8;
}

.edit-btn {
  background-color: #41b883;
}

.delete-btn {
  background-color: rgb(229, 108, 108);
}

.completed-btn {
  background-color: rgb(94, 133, 225);
  width: 150px;
}

ul > li {
  list-style: decimal;
  padding: 5px 20px;
}

button:hover {
  opacity: 1;
}

/* Responsive Styles */
@media (min-width: 640px) {
  .item {
    flex-direction: row;
  }
}
</style>