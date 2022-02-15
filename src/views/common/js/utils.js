import { Message } from 'element-ui'

const openWarning = (text) => {
  Message({
    message: text,
    type: 'warning'
  })
}

const openSuccess = (text) => {
  Message({
    showClose: true,
    message: text,
    type: 'success'
  })
}

const openError = (text) => {
  Message({
    showClose: true,
    message: text,
    type: 'error'
  })
}

export {
  openWarning,
  openSuccess,
  openError
}
