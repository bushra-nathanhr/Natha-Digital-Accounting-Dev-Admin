<template>
  <div v-if="!file">
    <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true"
      @dragleave="dragging = false">
      <div class="dropZone-info" @drag="onChange">
        <span class="dropZone-title">
          <h4 class="primary--text font-weight-bold pb-2">Upload Statement</h4>
          <span class="subtext--text">Drag And Drop / Click To Select</span>
        </span>
        <div class="dropZone-upload-limit-info">
          <div><b>SVG, PNG or JPEG</b> (100px by 100px)</div>
          <div>maximum file size: 5 MB</div>
        </div>
      </div>
      <input type="file" @change="onChange">
    </div>
  </div>
  <div v-else class="dropZone-uploaded">
    <div class="dropZone-uploaded-info">
      <h4 class="dropZone-title success--text"><v-icon small color="success" class="mr-2">fa-check</v-icon>Uploaded</h4>
      <div>fileName: {{ file.name }}</div>
      <div>fileZise(bytes): {{ file.size }}</div>
      <div>extension：{{ extension }}</div>
      <v-btn type="button" class="removeFile" elevation="0" @click="removeFile">Remove File</v-btn>
    </div>
  </div>
</template>

<script>
import  '@/assets/scss/utils/_filedropzone.scss'
export default {
  name:'FileDropzone',
  data() {
    return {
      file: '',
      dragging: false
    }
  },
  methods: {
    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      this.createFile(files[0]);
    },
    createFile(file) {
      // if (!file.type.match('png.*')) {
      //   alert('please select txt file');
      //   this.dragging = false;
      //   return;
      // }

      if (file.size > 5000000) {
        alert('please check file size no over 5 MB.')
        this.dragging = false;
        return;
      }

      this.file = file;
      console.log(this.file);
      this.dragging = false;
    },
    removeFile() {
      this.file = '';
    }
  },
  computed: {
    extension() {
      return (this.file) ? this.file.name.split('.').pop() : '';
    }
  }
}
</script>

<style scoped lang="scss">

</style>