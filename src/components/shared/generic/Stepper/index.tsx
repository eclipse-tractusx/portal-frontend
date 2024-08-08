import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import './stepper.scss'
import Link from '@mui/material/Link'
import { Typography } from '@mui/material'

function a11yProps(index: number) {
  return {
    id: 'simple-tab',
    'aria-controls': `tabpanel-${index}`,
  }
}

interface Step {
  headline: string
  step: number
}

interface StepperProps {
  showSteps: number
  activeStep: number
  tooltipText?: string
  tooltipLink?: string
  list: Step[]
}

export default function Stepper({
  activeStep,
  tooltipText,
  tooltipLink,
  list,
}: StepperProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs id="tabs-container" aria-label="basic tabs example">
          {list.map((step) => (
            <Box className="steppers" key={step.step}>
              <Box className="stepper-container">
                <Box
                  className={
                    activeStep === step.step
                      ? 'active-icon'
                      : activeStep > step.step
                        ? 'completed-icon'
                        : 'uncomplete-icon'
                  }
                >
                  {step.step}
                </Box>
                <Tab
                  className={
                    activeStep === step.step
                      ? 'active-tab tab-text'
                      : activeStep > step.step
                        ? 'completed-tab tab-text'
                        : 'non-active-tab tab-text'
                  }
                  label={step.headline}
                  {...a11yProps(step.step)}
                />
                {activeStep === step.step && tooltipText && tooltipLink && (
                  <Link
                    className="tool-tip-a"
                    href={tooltipLink}
                    target="_blank"
                  >
                    <Box className="tool-tip">
                      <ExpandLessIcon />
                      <Typography className="tool-tip-text" variant="inherit">
                        {tooltipText}
                      </Typography>
                    </Box>
                  </Link>
                )}
              </Box>
            </Box>
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}
