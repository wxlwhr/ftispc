<!-- 披露认证-机构简介 -->
<template>
  <div class="wrapper">
    <div class='header'>机构简介</div>
    <main class="main-box">
        <div class="editor-box">
            <quill-editor ref="myQuillEditor" v-model="formData.organ_introduce" class="editor" :options="editorOption" />

            <el-upload
            class="avatar-uploader-img"
            :action="fileUploadApi"
            :show-file-list="false"
            :on-success="uploadImgSuccess"
            :before-upload="beforeUploadImg"
            :on-error="uploadImgError"
            :data="{'pathName':''}"
            />
            <!-- <el-upload
            class="avatar-uploader-video"
            :action="fileUploadApi"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadVideoSuccess"
            :before-upload="beforeUploadVideo"
            :on-error="uploadVideoError"
            :data="{'pathName':''}"
            /> -->
        </div>
    </main>
    <div class="button-box">
        <el-button type="primary" size="small" class="addButton" @click="addSpecial">保存</el-button>
    </div>
  </div>
</template>

<script>
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  // ['link', 'image', 'video'] // 链接、图片、视频
  ['link', 'image', 'video'] // 链接、图片
]

import utils from "@/util/util";
import { getIntroByUser, saveOrganIntroByUser} from "@/api/api.js";
export default {
  data () {
    return {
        editorOption: { // 编辑框操作事件
            theme: 'snow', // or 'bubble'
            placeholder: '您想发布点什么？',
            modules: {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                image: function(value) { // 上传图片
                    if (value) {
                    document.querySelector('.avatar-uploader-img input').click() // 触发input框选择文件
                    } else {
                    this.quill.format('image', false)
                    }
                },
                link: function(value) { // 添加链接
                    if (value) {
                    var href = prompt('请输入url')
                    this.quill.format('link', href)
                    } else {
                    this.quill.format('link', false)
                    }
                },
                video: function(value) { // 上传视频
                    if (value) {
                    document.querySelector('.avatar-uploader-video input').click() // 触发input框选择文件
                    } else {
                    this.quill.format('video', false)
                    }
                }
                }
            }
            },
        },
        formData: {
         organ_introduce:'',
        },
        fileUploadApi: '',
    };
  },

  components: {},

  computed: {
    
  },
  created() {
    this.getIntroByUser()
  },
  methods: {
    // 获取技术列表
    getIntroByUser(){
      	getIntroByUser().then(res=>{
            this.formData.organ_introduce = res.organ_introduce
        })
    },    
    addSpecial(){
        saveOrganIntroByUser({
            ...this.formData
        }).then(res =>{
            if(res.code == 1){
            this.$message({
                type: "success",
                message: "修改成功!",
            });

            this.getIntroByUser()
            }
        })
    },
    // 富文本图片上传前
    beforeUploadImg(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
        if (!isJPG) {
            this.$message.error('上传图片只能是 JPG，PNG, GIF 格式!')
        } else {
            // 显示loading动画
            this.quillUpdate = true
        }
        return isJPG
    },
    // 富文本视频上传前
    beforeUploadVideo(file) {
        const isVideo = file.type === 'video/mp4'
        if (!isVideo) {
            this.$message.error('上传视频只能是 mp4 格式!')
        } else {
            // 显示loading动画
            this.quillUpdate = true
        }
        return isVideo
    },
    // 上传成功
    uploadImgSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        const quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.code == '200' && res.data.url != null) {
            // 获取光标所在位置
            const length = quill.getSelection().index
            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', res.data.url)
            // 调整光标到最后
            quill.setSelection(length + 1)
        } else {
            this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdate = false
    },
    uploadVideoSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        const quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.code == '200' && res.data.url != null) {
            // 获取光标所在位置
            const length = quill.getSelection().index
            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'video', res.data.url)
            // 调整光标到最后
            quill.setSelection(length + 1)
        } else {
            this.$message.error('视频插入失败')
        }
        // loading动画消失
        this.quillUpdate = false
    },
    // 上传失败
    uploadImgError() {
        // loading动画消失
        this.quillUpdate = false
        this.$message.error('图片插入失败')
    },
    uploadVideoError() {
        // loading动画消失
        this.quillUpdate = false
        this.$message.error('视频插入失败')
    },
  }
}

</script>
<style lang='scss' scoped>
.wrapper {
  background-color: #fff;
  height: 100%;
  .header {
    padding-left:15px;
    height:50px;
    line-height:50px;
    border-bottom: 1px solid #ccc;
    font-weight:600;
  }
  .addinput{
    width:300px
  }
  .button-box{
      text-align: center;
  }
  .editor-box{
      height: 410px;
      .editor{
        width: 90%;
        height: 350px;
        margin: 20px auto;
      }
  }
  .addButton{
    margin:10px 2% 10px;
    font-size:14px;

    i{
      margin-right:3px;
    }
  }
  .block{
    padding-left:15px;
    padding-right:15px;
  }
  .main-box{
    background: #fff;
    padding-bottom: 10px;
  }
}
.avatar-uploader-img {
  height: 0;
}
.avatar-uploader-video {
  height: 0;
}
/deep/ .ql-snow .ql-tooltip[data-mode=link]::before {
  content: '请输入链接地址:';
}
/deep/ .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}
/deep/ .ql-snow .ql-tooltip[data-mode=video]::before {
    content: '请输入视频地址:';
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-label::before,
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
</style>