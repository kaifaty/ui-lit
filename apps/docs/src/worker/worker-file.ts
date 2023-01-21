import {analyzeText, transformAnalyzerResult} from 'web-component-analyzer'

import {MessageProtocol} from './types'

const format = 'json'

const generate = async (path: string) => {
  const response = await fetch(path)
  const result = await response.text()
  const {results, program} = analyzeText([
    {fileName: path, text: result},
  ])

  return transformAnalyzerResult(format, results, program)
}


const responseMessage = (data: Required<MessageProtocol>) => {
  postMessage(data)
}

const analyze = async (data: MessageProtocol) => {
  try{
    const response = await generate(data.filename)
    responseMessage({
      filename: data.filename,
      response,
    })
  }
  catch(_e){
    const e: Error = _e
    responseMessage({
      ...data,
      response: e.message
    })
  }
}

self.onmessage = (e: MessageEvent<MessageProtocol>) => {
  analyze(e.data)
}
