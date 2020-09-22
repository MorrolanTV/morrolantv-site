<template>
  <div class="edit-form">
    <div class="edit-images mb-3">
      <p>
        Choose one or more images to override the ones below. Use the following
        names, starting with a capital letter:
      </p>
      <ul class="mb-2">
        <li>
          - For armor and weapons, use the names below for attempts. Example:
          "Weapon.png"
        </li>
        <li>- The image with character info is called "Character.png"</li>
        <li>- The lifeskill image is called "Lifeskill.png"</li>
        <li>- The lifeskill gear image is called "LifeskillGear.png"</li>
      </ul>
      <div class="upload-forms">
        <div class="mb-2 mr-2">
          <p>{{ infoText }}</p>
          <div class="file has-name">
            <label class="file-label">
              <input
                id="files"
                ref="files"
                class="file-input"
                type="file"
                name="resume"
                multiple
                @change="handleFilesUpload()"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <fa :icon="['fas', 'upload']" />
                </span>
                <span class="file-label"> Choose files </span>
              </span>
            </label>
          </div>
        </div>
        <div>
          <button class="button is-primary" @click="submitFiles()">
            Upload
          </button>
        </div>
      </div>
      <div class="mb-4">
        <span v-for="file in files" :key="file.name">
          {{ file.name }}
        </span>
      </div>
    </div>
    <div class="edit-texts">
      <h4 class="title is-4 mb-1">Attempts</h4>
      <div class="entrylist">
        <div v-for="attempt of attempts" :key="attempt.name" class="editentry">
          <p>{{ attempt.name }}</p>
          <div class="field">
            <label>Stacks</label>
            <div class="control">
              <input
                v-model="attempt.stacks"
                type="text"
                class="input"
                :placeholder="attempt.stacks"
              />
            </div>
          </div>
          <div class="field">
            <label>Attempts</label>
            <div class="control">
              <input
                v-model="attempt.attempts"
                type="text"
                class="input"
                :placeholder="attempt.attempts"
              />
            </div>
          </div>
        </div>
      </div>
      <h4 class="title is-4 mb-1">Values</h4>
      <div class="entrylist">
        <div
          v-for="value of valueinfos"
          :key="value.name"
          class="editentry value"
        >
          <p>{{ value.name }}</p>
          <div class="field">
            <div class="control">
              <input
                v-model="value.value"
                type="text"
                class="input"
                :placeholder="value.value"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="is-flex justify-center">
        <button class="button is-primary" @click="submitText()">
          {{ saving ? 'Saving..' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      files: '',
      infoText: '',
      saving: false,
    }
  },
  computed: {
    attempts() {
      return this.info.filter((item) => !item.value)
    },
    valueinfos() {
      return this.info.filter((item) => item.value)
    },
  },
  methods: {
    handleFilesUpload() {
      this.files = this.$refs.files.files
    },
    async submitText() {
      this.saving = true
      try {
        await this.$axios.post('/gear/text', {
          collection: this.info,
          headers: {
            Authorization: this.$auth.getToken('auth0'),
          },
        })
        this.saving = false
      } catch {
        this.saving = false
        alert('Change failed!')
      }
    },
    async submitFiles() {
      const formData = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('files[' + i + ']', file)
      }
      try {
        await this.$axios.post('/gear/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.$auth.getToken('auth0'),
          },
        })
        this.infoText = 'Images were uploaded'
        this.files = ''
        setTimeout(() => (this.infoText = ''))
      } catch {
        this.infoText = 'Upload errorr'
        setTimeout(() => (this.infoText = ''))
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.upload-forms {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.edit-form {
  margin-top: 20px;
}
.file-cta {
  background: $grey-blue;
}
.file-label:hover .file-cta {
  background: $grey-dark;
}
.entrylist {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.editentry {
  margin-bottom: 20px;
  flex-basis: 33%;
  &.value {
    flex-basis: 25%;
  }
  p {
    font-weight: bold;
  }
}
</style>
