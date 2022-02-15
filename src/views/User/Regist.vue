<template>
  <div class="app">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      size="medium"
      :status-icon="true"
      style="width: 500px"
    >
      <el-form-item label="账户" prop="account">
        <div class="left">
          <el-input
            v-model="form.account"
            style="width: 300px"
            placeholder="please input your Account"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <div class="left">
          <el-input
            v-model="form.password"
            style="width: 300px"
            type="password"
            placeholder="please input your Password"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="重复密码" prop="password2">
        <div class="left">
          <el-input
            v-model="form.password2"
            style="width: 300px"
            type="password"
            placeholder="please input your Password"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <div class="left">
          <el-input
            v-model="form.name"
            style="width: 300px"
            placeholder="please input your Name"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <div class="left">
          <el-select
            v-model="form.sex"
            placeholder="please select your sex"
            style="width: 300px"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-col :span="11">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="Pick your Birthday"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 300px"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="婚否">
        <div class="left">
          <el-switch v-model="form.marriage"></el-switch>
        </div>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <div class="left">
          <el-input
            v-model="form.phone"
            style="width: 300px"
            type="phone"
            placeholder="please input your Phone"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <div class="left">
          <el-input
            v-model="form.email"
            style="width: 300px"
            type="email"
            placeholder="please input your E-mail"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div style="margin-left: -120px">
          <el-button type="primary" @click="onSubmit(form)">Create</el-button>
          <el-button @click="reset()">Reset</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="js">
import { post } from '@/api/api'
import { openSuccess, openError } from '../common/js/utils.js'

export default {
  data () {
    var validatePhone = (rule, value, callback) => {
      var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (value === '') {
        callback(new Error('Please input the phone'))
      } else if (!phoneReg.test(value)) {
        console.log(!phoneReg.test(value))
        callback(new Error('Please input right phone'))
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input Password'))
      } else if (!(value === this.form.password)) {
        callback(new Error('Please input right Password'))
      }
    }
    return {
      form: {
        account: '',
        password: '',
        password2: '',
        name: '',
        sex: '',
        birthday: '',
        marriage: false,
        phone: '',
        email: ''
      },
      rules: {
        account: [
          {
            type: 'string',
            required: true,
            message: 'Please input Account',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 10,
            message: 'Length should be 6 to 10',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please input Password',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 12,
            message: 'Length should be 8 to 12',
            trigger: 'blur'
          }
        ],
        password2: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ],
        name: [
          {
            required: true,
            message: 'Please input name',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 8,
            message: 'Length should be 2 to 8',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: 'Please selected a sex',
            trigger: ['blur', 'change']
          }
        ],
        birthday: [
          {
            type: 'string',
            required: true,
            message: 'Please pick your Birthday',
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePhone
          }
        ],
        email: [
          {
            required: true,
            message: 'Please input e-mail',
            trigger: ['change', 'blur']
          },
          {
            type: 'email',
            message: 'Please input right e-mail',
            trigger: ['blur']
          }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      let ok = true
      this.$refs.form.validate((boolean, object) => {
        if (boolean) {
          return true
        } else {
          ok = false
          return false
        }
      })
      if (ok) {
        post(
          'user/add',
          JSON.stringify({
            account: this.form.account,
            password: this.form.password,
            password2: this.form.password2,
            birthDate: this.form.birthday,
            name: this.form.name,
            sex: this.form.sex,
            phone: this.form.phone,
            email: this.form.email,
            marriage: this.form.marriage
          })
        )
          .then((res) => {
            if (res.data.code === '200') {
              openSuccess('注册成功')
            } else {
              openError('出现错误')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang='scss'>
.left {
  text-align: left;
}
.app {
  display: inline-block;
}
</style>
