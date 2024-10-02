/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useEffect, useState } from 'react'
import { IconButton, Typography } from '@catena-x/portal-shared-components'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useTranslation } from 'react-i18next'
import { Stack, Link } from '@mui/material'
import { FOOTERLINK } from 'types/cfx/Constants'

export const Footer = ({ pages }: { pages: string[] }) => {
  const footerLinks: { [key: string]: string } = {
    imprint: `${FOOTERLINK.url}/imprint/`,
    privacy: `${FOOTERLINK.url}/privacy-policy/`,
    contact: `${FOOTERLINK.url}/contact/`,
  }

  const { t } = useTranslation()
  const items = pages.map((page) => ({
    to: footerLinks[page.toLocaleLowerCase()],
    title: t(`pages.${page}`),
  }))
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const toggleVisibility = () => {
    setShowScrollToTop(window.pageYOffset > 350)
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <footer style={{ marginTop: 10 }}>
      {showScrollToTop && (
        <IconButton
          color="secondary"
          onClick={scrollToTop}
          sx={{ position: 'absolute', right: '40px', top: '2px' }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}

      <div className="footer-content">
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={2}
          sx={{ p: 2 }}
        >
          <div>
            {items.map((item) => {
              return (
                <Link
                  href={item.to}
                  key={item.to}
                  sx={{
                    typography: 'label2',
                    fontWeight: 500,
                    p: 1,
                    textDecoration: 'underline',
                    color: 'secondary.main',
                  }}
                >
                  {item.title}
                </Link>
              )
            })}
          </div>
          <div>
            <Typography
              sx={{
                typography: 'label2',
                fontWeight: 500,
                color: 'secondary.main',
              }}
            >{`${t('content.footer.copyright')}`}</Typography>
          </div>
        </Stack>
      </div>
    </footer>
  )
}
