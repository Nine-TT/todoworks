<template>
<div class="form_work lg:flex lg:items-center">
    <div class="flex flex-col items-center lg:ml-7">
        <div class="state w-96 max-w-sm rounded-md lg:flex-none md:flex-1 sm:flex-1 ">
            <span class="total">Total <p>{{ listWork.length }}</p></span>
            <span class="warming">Warning {{ totalWarning }}</span>
            <span class="success">Success {{ totalCompleted }}</span>
            <span class="pending">Pending {{ totalPending }}</span>
        </div>

        <form class="w-80 max-w-md " @submit.prevent>
            <div class="">
                <label class="block">
                    <span class="text-red-500 text-[14px]">{{ title_valid }}</span>
                    <span class="block text-sm font-medium text-slate-700">Tiêu đề</span>
                    <input type="text" v-model="title" class="border  mt-2 rounded-md w-full h-[30px] focus:outline-none focus:border-green-900 sm:text-sm focus:ring-1 pl-[10px] pr-[10px]" />
                </label>

                <label class="block mt-4">
                    <span class="text-red-500 text-[14px]">{{ content_valid }}</span>
                    <span class="block text-sm font-medium text-slate-700">Nội dung</span>
                    <textarea v-model="content" class="resize mt-2  rounded-md w-full h-[50px] focus:outline-none focus:border-green-900 sm:text-sm focus:ring-1 pl-[10px] pr-[10px]"></textarea>
                </label>

                <label class="block mt-4">
                    <span class="text-red-500 text-[14px]">{{ date_valid }}</span>
                    <span class="block text-sm font-medium text-slate-700">Hạn hoàn thành</span>
                    <Datepicker v-model="date" format="dd/MM/yyy" placeholder="Dealine ..." :enable-time-picker="false" :clearable="false" :month-change-on-scroll="false" auto-apply />
                </label>
            </div>

            <div>
                <input type="button" @click="handleAddList" value="Save" v-if="!edit_status" class="bg-green-700 text-white mt-4 rounded-md w-full pt-1 pb-1 hover:border-green-600 cursor-pointer" />
                <input type="button" @click="handleSaveEdit" value="Save as" v-else="edit_status" class="bg-green-700 text-white mt-4 rounded-md w-full pt-1 pb-1 hover:border-green-600 cursor-pointer" />
            </div>
        </form>
    </div>

    <ListWork v-bind:listWork="listWork" @edit-work="handleEdit" @delete-work="handleDelete" @select-Completed="handleCompleted" />
</div>
</template>

<script>
import ListWork from './ListWork.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import moment from 'moment';

import {
    ref
} from 'vue';

import axios from "axios"
import {
    da
} from 'date-fns/locale';

export default {
    name: "FormWork",
    components: {
        ListWork,
        Datepicker
    },

    created() {
        this.getData()
    },

    data() {

        return {
            content: '',
            listWork: [],
            totalCompleted: 0,
            totalPending: 0,
            totalWarning: 0,
            mess: '',
            value_index: '',
            edit_status: false,
            date: '',
            isCompleted_edit: false,
            title: '',
            title_valid: '',
            content_valid: '',
            date_valid: ''

        }
    },

    methods: {

        timeDeadline(date) {

            const formattedTime = moment(date, 'DD/MM/YYYY').format('YYYY/MM/DD')
            const dateFormat = moment(formattedTime).format('DD/MM/YYYY')
            const [day, month, year] = dateFormat.split('/');

            const currentTime = new Date().getTime();
            const deadlineTime = new Date(`${year}-${month}-${day}`).getTime();
            const timeDiff = (deadlineTime - currentTime);
            const diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            return diffInDays
        },

        async handleAddList() {
            this.handleValid()

            if (this.date) {
                const formattedTime = moment(this.date).format('DD/MM/YYYY');

            

                await axios.post('https://todo-work-98b72-default-rtdb.asia-southeast1.firebasedatabase.app/todoworks.json', {
                    title: this.title,
                    content: this.content,
                    deadline: formattedTime,
                    isCompleted: false,
                    isWarning: false,
                    isPending: false
                });

                this.title = ''
                this.content = ''
                this.date = ''

                this.title_valid = ''
                this.content_valid = ''
                this.date_valid = ''

            
            this.getData()

            } else {
                this.date_valid = "Vui lòng chọn ngày!"
            }
            

        },

        async handleSaveEdit() {

            const formattedTime = moment(this.date).format('DD/MM/YYYY');

            await axios({
                    method: 'PUT',
                    url: `https://todo-work-98b72-default-rtdb.asia-southeast1.firebasedatabase.app/todoworks/${this.value_index}.json`,
                    data: {
                        title: this.title,
                        content: this.content,
                        deadline: formattedTime,
                        isCompleted: this.isCompleted_edit
                    }
                })

                .then((response) => {

                })

                .catch((error) => {
                    console.log(error)
                })

            this.title = ''
            this.content = ''
            this.date = ''
            this.mess = ''
            this.value_index = ''
            this.edit_status = false

            this.getData()
        },

        handleEdit(index, data) {

            this.title = data.title
            this.content = data.content
            this.date = moment(data.deadline, 'DD/MM/YYYY').format('YYYY/MM/DD')
            this.edit_status = true
            console.log(moment(data.deadline, 'DD/MM/YYYY').format("YYYY/MM/DD"))

            this.value_index = data.id
            this.isCompleted_edit = data.isCompleted

        },

        getData() {

            axios.get('https://todo-work-98b72-default-rtdb.asia-southeast1.firebasedatabase.app/todoworks.json')
                .then((response) => {
                    let ListWork = []
                    for (let id in response.data) {

                        if (this.timeDeadline(response.data[id].deadline) === 0 && !response.data[id].isCompleted) {

                            ListWork.push({
                                id: id,
                                title: response.data[id].title,
                                content: response.data[id].content,
                                deadline: response.data[id].deadline,
                                isCompleted: response.data[id].isCompleted,
                                isWarning: true,
                                isPending: response.data[id].isPending
                            })

                        } else if (this.timeDeadline(response.data[id].deadline) < 0 && !response.data[id].isCompleted) {
                            ListWork.push({
                                id: id,
                                title: response.data[id].title,
                                content: response.data[id].content,
                                deadline: response.data[id].deadline,
                                isCompleted: response.data[id].isCompleted,
                                isWarning: response.data[id].isWarning,
                                isPending: true
                            })

                        } else {
                            ListWork.push({
                                id: id,
                                title: response.data[id].title,
                                content: response.data[id].content,
                                deadline: response.data[id].deadline,
                                isCompleted: response.data[id].isCompleted,
                                isWarning: response.data[id].isWarning,
                                isPending: response.data[id].isPending
                            })
                        }

                    }

                    this.listWork = ListWork

                    // dang bi lap ?
                    this.totalCompleted = 0
                    this.totalPending = 0
                    this.totalWarning = 0

                    for (let i = 0; i < this.listWork.length; i++) {

                        if (this.listWork[i].isCompleted === true) {
                            this.totalCompleted += 1
                        } else if (this.listWork[i].isPending === true) {
                            this.totalPending += 1
                        } else if (this.listWork[i].isWarning === true) {
                            this.totalWarning += 1
                        }

                    }

                })

                .catch((error) => {
                    console.log(error);
                })

        },

        async handleDelete(id) {
            await axios.delete(`https://todo-work-98b72-default-rtdb.asia-southeast1.firebasedatabase.app/todoworks/${id}.json`)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })

            this.getData()
        },

        async handleCompleted(index, data) {

            if (data.data.isCompleted === false) {
                await axios({
                        method: 'PUT',
                        url: `https://todo-work-98b72-default-rtdb.asia-southeast1.firebasedatabase.app/todoworks/${data.data.id}.json`,
                        data: {
                            title: data.data.title,
                            content: data.data.content,
                            deadline: data.data.deadline,
                            isCompleted: true
                        }
                    })

                    .then((response) => {

                    })

                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                await axios({
                        method: 'PUT',
                        url: `https://todo-work-98b72-default-rtdb.asia-southeast1.firebasedatabase.app/todoworks/${data.data.id}.json`,
                        data: {
                            title: data.data.title,
                            content: data.data.content,
                            deadline: data.data.deadline,
                            isCompleted: false
                        }
                    })

                    .then((response) => {

                    })

                    .catch((error) => {
                        console.log(error)
                    })
            }

            this.getData()

        },

        handleValid() {
    
            if ((!this.title || this.title.trim().length === 0) && (!this.content || this.content.trim().length === 0) && !this.date) {
                this.title_valid = 'Vui lòng điền tiêu đề!'
                this.content_valid = 'Vui lòng điền nội dung!'
                this.date_valid = 'Vui lòng chọn ngày!'
            } 
            else if (!this.date === true) {
                this.mess = 'Vui lòng chọn ngày!'
            } 

            else if (!this.title || this.title.trim().length === 0) {
                this.title_valid = 'Vui lòng điền tiêu đề!'
            }

            else if (!this.content || this.content.trim().length === 0) {
                this.content_valid = 'Vui lòng điền nội dung!'
            }

            

            else if (this.validateXss(this.title)){
                this.title_valid = 'Chứa kí tự không hợp lệ'
            }

            else if (this.validateXss(this.content)){
                this.content_valid = 'Chứa kí tự không hợp lệ'
            }

            
        },

        validateXss (text) {
            let regex = /^(\s|\w|\d|\.|\,|\;|\:|\?|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\~|\`|\'|\\|\-|\/|\+)*?$/
            return regex.test(text)
        }

    },

}
</script>

<style>
.form_work {
    background-image: linear-gradient(to bottom, #62d7cf, #4e8ce3);
    min-height: 90vh;
}

.state {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    width: 100%;
    max-width: 500px;
    border: 2px solid #000;
    background-color: #cccc;
}

.state>span {
    border-radius: 10px;

    margin: 10px 10px;
    text-align: center;
    flex: 1;
}

.state .total {
    background-color: #94a3b8;
    color: #fff;
}

.state .success {
    background-color: #41b883;
    color: #fff;
}

.state .pending {
    background-color: rgb(238, 107, 107);
    color: #fff;
}

.warming {
    background-color: darkorange;
    color: #fff;
}
</style>
