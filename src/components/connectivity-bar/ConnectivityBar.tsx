import { useConnectivityContext } from '@/contexts'
import Cloud from '@mui/icons-material/Cloud'
import CloudOff from '@mui/icons-material/CloudOff'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { debounce } from '@mui/material/utils'
import { useEffect, useState } from 'react'

type StatusMessage = {
  text: string
  icon: React.ReactNode
}

const statusMessages: Record<'online' | 'offline', StatusMessage> = {
  online: {
    text: 'Back online',
    icon: <Cloud />,
  },
  offline: {
    text: 'No network connection',
    icon: <CloudOff />,
  },
}

export const ConnectivityBar = () => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const { isOnline } = useConnectivityContext()
  const statusMessage: StatusMessage = statusMessages[isOnline ? 'online' : 'offline']

  useEffect(() => {
    if (isOnline && expanded) {
      debounce(() => setExpanded(false), 4000)?.()
    }
    if (!isOnline && !expanded) {
      setExpanded(true)
    }
  }, [expanded, isOnline])

  return (
    <Collapse
      in={expanded}
      sx={{
        minHeight: 'auto !important',
      }}
    >
      <Box
        sx={(theme: Theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          p: 1,
          width: '100%',
          background: theme.palette.background.paper,
        })}
      >
        {statusMessage.icon}
        <Typography
          component="span"
          variant="body2"
          fontWeight={500}
          gutterBottom={false}
        >
          {statusMessage.text}
        </Typography>
      </Box>
    </Collapse>
  )
}
