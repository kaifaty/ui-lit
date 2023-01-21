import {MessageProtocol} from './types'

let worker: Worker

const sendMessage = (data: MessageProtocol) => {
  worker.postMessage(data)
}

export const createWorker = () => {
  const url = new URL('./worker-file.ts', import.meta.url)
  if(worker){
    worker.terminate()
  }
  worker = new Worker(url, {type: 'module'})
  worker.onmessage = (e: MessageEvent<MessageProtocol>) => {
    const data = e.data
    console.log('received message', data)
  }
  sendMessage({'filename': '/button.component.ts'})
}

export const getCurrentWorker = () => worker