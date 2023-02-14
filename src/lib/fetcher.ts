type FetchErrorData = {
  status: number
  message: string
  body: unknown
}

export type FetchErrorObject = {
  message: string
  response: Response
  data: FetchErrorData
}

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init)
  const data = await response.json()

  if (response.ok) {
    return data
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data: {
      status: response.status,
      message: response.statusText,
      body: data,
    },
  })
}

export class FetchError extends Error {
  public readonly response: Response
  public readonly data: FetchErrorData

  constructor({ message, response, data }: FetchErrorObject) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.response = response
    this.data = data
  }
}
