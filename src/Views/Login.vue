<template>
<div class="login_container">
    <h1 class="text-center mt-5">Login</h1>
    <div class="input_group content-center">
        <label class="input">
            <span class="block text-sm font-medium text-slate-700 " ref="labelName">Email <span class="text-red-500">*</span></span>
            <span class="text-red-500 text-[14px]">{{email_valid}}</span>
            <input 
                type="text" 
                v-model="email" 
                class="border border-black mt-2 rounded-md w-[80%] h-[30px] focus:outline-none focus:border-green-900  block  sm:text-sm focus:ring-1 pl-[10px] pr-[10px]"
                :class="!isValid_mail? 'border border-red-500' : 'border border-black'"
                placeholder="email@example.com" 
                @blur="handleBlurEmail"
                @focus="handleFocus('email')"
            />
        </label>
        <label class="">
            <span class="block mt-4 text-sm font-medium text-slate-700 ">Password <span class="text-red-500">*</span></span>
            <span class="text-red-500 text-[14px]">{{password_valid}}</span>
            <input 
                type="password" 
                v-model="password" 
                class="border border-black mt-2 rounded-md w-[80%] h-[30px] focus:outline-none focus:border-green-900  block  sm:text-sm focus:ring-1 pl-[10px] pr-[10px]" 
                :class="!isValid_pass? 'border border-red-500' : 'border border-black'"
                placeholder="password ..." 
                @blur="handleBlurPassWord"
                @focus="handleFocus('pass')"
            />
        </label>
    </div>
    <button class="btn-login bg-sky-500 hover:bg-sky-700 mt-[80px] ml-[100px]" @click="handleLogin">
        Save changes
    </button>
</div>

<HeaderComponent ref="component"/>
</template>

<script>


export default {
    
    data() {
        return {
            email: '',
            password: '',
            email_valid: '',
            password_valid: '',
            isValid_mail: true,
            isValid_pass: true,
            errValidClass: 'border border-red-500 mt-2 rounded-md w-[80%] h-[30px] focus:outline-none focus:border-green-900  block  sm:text-sm focus:ring-1 pl-[10px] pr-[10px]'
        }
    },

    methods: {
        handleLogin() {
            

            if ((!this.email || this.email.trim().length === 0) && (!this.password || this.password.trim().length === 0)) {
                this.email_valid = 'Chưa nhập email!'
                this.password_valid = 'Không để trống mật khẩu!'
                this.isValid_mail = false
                this.isValid_pass = false
            } 

            else if (!this.email || this.email.trim().length === 0 ) {
                this.email_valid = 'Chưa nhập email!'
                this.isValid_mail = false
            } 

            else if(!this.validateEmail(this.email)) {
                this.email_valid= 'Email không hợp lệ!'
                this.isValid_mail = false
            }

            else if (!this.validateXss(this.password)) {
                this.password_valid = 'Mật khẩu chứa kí tự không hợp lệ!'
                this.isValid_pass = false
            }
            
            else if (!this.password || this.password.trim().length === 0) {
                this.mess_pass = 'Không để mật khẩu trống!'
                this.isValid_pass = false
            } 

            
            
            else {
    
                let data = {
                    email: this.email,
                    password: this.password
                }

                this.email = ''
                this.password = ''

                console.log(data)
            }
        },

        handleBlurEmail () {
            if (!this.email || this.email.trim().length === 0 ) {
                this.email_valid = `Vui lòng điền email!`
                this.isValid_mail = false
            } else if (!this.validateEmail(this.email)) {
                this.email_valid = 'Email không hợp lệ!'
                this.isValid_mail = false
            }
        },

        handleBlurPassWord () {
            
            if (!this.password || this.password.trim().length === 0 ) {
                this.password_valid = `Mật khẩu không được trống!`
                this.isValid_pass = false
            } else if (!this.validateXss(this.password)) {
                this.password_valid = 'Mật khẩu chứa kí tự không hợp lệ!'
                this.isValid_pass = false
            }
        },

        handleFocus (name) {
            if (name === 'email') {
                this.email_valid = ''
                this.isValid_mail = true
            } else if (name === 'pass') {
                this.password_valid = ''
                this.isValid_pass = true
            }
            
        },

        validateEmail (email) {
            let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            return regex.test(email)
        },

        validateXss (text) {
            let regex = /^(\s|\w|\d|\.|\,|\;|\:|\?|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\~|\`|\'|\\|\-|\/|\+)*?$/
            return regex.test(text)
        }
    },
}
</script>

<style>
.login_container {
    width: 300px;
    height: 400px;
    border: 2px solid #36b686;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 50px;
}

.input_group {
    margin-left: 50px;
    margin-top: 20px;
}

.input {
    margin: 0 auto !important;
} 

.errValidClass {
    border: 1px solid #e86a6a !important;
}

.btn-login {}
</style>
