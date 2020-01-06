import Schema from '../libs/async-validator/index'

Component({
  properties: {
    loading: {
      type: Boolean,
      value: false
    },
    counter: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ''
    },
    persistentHint: {
      type: String,
      value: ''
    },
    type: {
      // 输入类型, text number idcard digit
      type: String,
      value: 'text'
    },
    label: {
      type: String,
      value: ''
    },
    maxlength: {
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      type: Number,
      value: 140
    },
    confirmType: {
      // 键盘右下角按钮的文字，仅在type='text'时生效, send search next go done
      type: String,
      value: 'done'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    password: {
      type: Boolean,
      value: false
    },
    name: {
      type: String
    },
    rules: {
      type: Object
    },
    error: {
      type: String
    }
  },

  data: {
    focusStatus: false,
    hasCursor: false,
  },

  methods: {
    onFocus() {
      this.setData({
        focusStatus: true,
        hasCursor: true
      })
    },

    onBlur(e) {
      const detail = e.detail
      if (detail.cursor > 0) {
        // TODO
      } else {
        this.setData({
          hasCursor: false
        })
      }
      this.setData({
        focusStatus: false
      })

      this.check()
    },

    onInputChange(e) {
      const value = e.detail.value
      this.setData({
        value
      })
    },

    check(value) {
      const key = this.data.name
      // if (!key) {
      //   throw new Error('name属性不能为空')
      // }

      const rules = this.data.rules
      const descriptor = {}

      if (rules && rules.type === 'phone') {
        descriptor[key] = {
          pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/,
          message: '手机号不正确'
        }
        if (rules.required) {
          descriptor[key].required = true
        }
      }

      if (rules && rules.type !== 'phone') {
        descriptor[key] = rules
      }

      if (Object.keys(descriptor).length > 0) {
        const validator = new Schema(descriptor)
        const data = {}
        data[key] = this.data.value

        validator.validate(data, (err, field) => {
          if (err) {
            this.setData({
              error: err[0].message
            })
          } else {
            this.setData({
              error: null
            })
          }
        })
      }
    }
  }
})