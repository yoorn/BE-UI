Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    closed: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onClick() {
      if (this.data.closed) {
        this.setData({
          show: false
        })
      }
    }
  }
})
