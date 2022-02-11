<template>
  <div style="height: 100%">
    <el-row style="background-color: #999999">
      <el-page-header @back="goBack" content="指导文件查看" title="">
      </el-page-header>
    </el-row>
    <el-row
      style="background-color: #aaaaaa; height: 40px"
      type="flex"
      justify="center"
    >
      <el-col :span="4"
        ><el-image :src="imgUrl" :fit="'fill'" @click="openWarning('打开扫描')">
        </el-image
      ></el-col>
      <el-col :span="18">
        <el-input v-model="form.name" placeholder="请输入设备名称"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          icon="el-icon-search"
          @click="query()"
          style="width: 100%"
          size="large"
        ></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="TableRef"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          @current-change="handleCurrentChange"
          border
          max-height="70vh"
        >
          <el-table-column property="name" label="设备名称" width="auto" />
          <el-table-column property="fileName" label="文件名称" width="auto" />
          <el-table-column property="fileType" label="文件类型" width="auto" />
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" type="flex" justify="end">
        <div style="float: right">
          <el-button type="primary" @click="preview()">预览</el-button>
          <el-button type="primary" @click="downFile()">下载</el-button>
        </div>
        <div>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :file-list="file"
            :auto-upload="false"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <div slot="tip" class="el-upload__tip">
              文件大小不超过500kb
            </div>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="指导文件"
      :visible.sync="dialogVisible"
      width="80%"
      center
      top="5vh"
    >
      <div>
        <pdf
          :page="pageNum"
          :src="pdfUrl"
          @progress="loadedRatio = $event"
          @num-pages="pageTotalNum = $event"
        ></pdf>
        <div style="text-align: center">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-arrow-left"
              size="mini"
              @click="prePage"
              >上一页</el-button
            >
            <el-button type="primary" size="mini" @click="nextPage"
              >下一页<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </el-button-group>
          <div style="margintop: 10px; color: #409eff">
            {{ pageNum }} / {{ pageTotalNum }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="js">
import { post } from '@/api/api'
import data from './data'
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  data () {
    return {
      currentRow: null,
      tableData: [],
      form: {
        name: ''
      },
      dialogVisible: false,
      imgUrl: 'static/img/tiaoma.png',
      pdfUrl: null,
      pageNum: 1,
      pageTotalNum: 1,
      loadedRatio: 0,
      file: []
    }
  },
  methods: {
    // 上一页
    prePage () {
      let page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },
    // 下一页
    nextPage () {
      let page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    },
    // 表单点击选择
    handleCurrentChange (val) {
      this.currentRow = val
    },
    goBack () {
      this.$router.go(-1)
    },
    // 查询按钮
    query () {
      console.log('查找' + this.form.name)
      post('User/QueryAll', [{ name: '123' }])
        .then(function (res) {
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error)
        })
      this.tableData = data.data()
    },
    // 提示
    openWarning (text) {
      this.$message({
        message: text,
        type: 'warning'
      })
    },
    // pdf预览
    preview () {
      if (this.currentRow == null) {
        this.openWarning('请选择需要预览的文件')
        return
      }
      this.pdfUrl = this.currentRow.filepath
      this.dialogVisible = true
    },
    // 上传
    submitUpload () {
      if (this.file == null) {
        this.openWarning('请选择文件后上传')
        return
      }
      this.$refs.upload.submit()
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemove (file) {
      console.log(file.name)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed () {
      this.openWarning('只能选择一个文件上传')
    },
    // 下载
    downFile () {
      console.log(this.currentRow)
    }
  }
}
</script>

<style  lang="scss" scoped>
.header {
  float: left;
}

.main {
  text-align: center;
}
</style>
