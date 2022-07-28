import { useState, useCallback } from "react"

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const sendRequest = useCallback(async (requestConfig: any, applyData: any) => {

    const controller = new AbortController()
    const signal = controller.signal
    setIsLoading(true)

    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? requestConfig.body : null,
          signal: signal
        },
      )
      
      if(!response.ok) {
        throw new Error('Request Failed!')
      }

      const data = await response.json()
      setIsLoading(false)
      applyData(data)
    } 
    catch(err: any) {
      setError(err.message)
    }

    return () => {
      controller.abort();
    }
    
  },[])

  return {isLoading, error, sendRequest}

}