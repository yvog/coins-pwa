import { useAuthContext } from '@/contexts'
import { fetcher, FetchError } from '@/lib/fetcher'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { FormEvent, useRef, useState } from 'react'

type Entity = {
  authorized: boolean
}

type AuthFormProps = {
  onSubmitSuccess?: () => void
}

export const AuthForm = ({ onSubmitSuccess }: AuthFormProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement | undefined>(undefined)
  const [errorMsg, setErrorMsg] = useState<string | undefined>()
  const { revalidateAuth } = useAuthContext()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData(formRef.current)
    const password = formData.get('password') as string

    if (!(password ?? '').trim()) {
      setErrorMsg('Please fill in a password')

      return
    }

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`
      const params = new URLSearchParams(apiUrl)

      params.set('password', password)

      const response: Entity = await fetcher(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: params,
      })

      if (response.authorized) {
        setErrorMsg(undefined)
        revalidateAuth()
        onSubmitSuccess?.()
      }
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error)
        setErrorMsg('Invalid password provided')
      } else {
        console.error('An unexpected error happened:', error)
        setErrorMsg('Unexpected error occured')
      }
    }
  }

  return (
    <>
      <Box
        ref={formRef}
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          gap: 1,
        }}
        onSubmit={onSubmit}
      >
        <TextField
          id="input-password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          color="secondary"
          sx={{
            width: '100%',
          }}
          InputLabelProps={{
            sx: (theme: Theme) => ({
              color: theme.palette.text.primary,
            }),
          }}
        />
        <Button type="submit" variant="text">
          Proceed
        </Button>
      </Box>
      <Box
        sx={{
          visibility: errorMsg ? 'visible' : 'hidden',
          height: 32,
        }}
      >
        <Alert
          severity="error"
          sx={{
            maxWidth: ' max-content',
            p: 0,
            m: 0,
            background: 'none',
          }}
        >
          {errorMsg}
        </Alert>
      </Box>
    </>
  )
}
