import { faker } from '@faker-js/faker'
import { fakerDE } from '@faker-js/faker' // German locale faker

export interface AppCardData {
  appTitle: string
  shortDescriptionEn: string
  shortDescriptionDe: string
  pricingInfo: string
}

export const generateAppCardData = (): AppCardData => {
  const prefix = 'Cypress App'
  const maxLength = 40
  const suffix = faker.word.noun().slice(0, maxLength - prefix.length - 1)
  const appTitle = `${prefix} ${suffix}`

  return {
    appTitle,
    shortDescriptionEn: faker.commerce.productDescription().slice(0, 255),
    shortDescriptionDe: fakerDE.helpers.arrayElement([
      'Diese App verbessert Ihre Geschäftsprozesse.',
      'Optimieren Sie Ihre Arbeitsabläufe mit dieser Lösung.',
      'Effizienzsteigerung leicht gemacht.',
      'Die ideale Lösung für moderne Unternehmen.',
      'Maximieren Sie Ihren Erfolg mit unserer App.',
    ]),
    pricingInfo: faker.helpers.arrayElement(['Free', 'Charged']),
  }
}

export function getRandomUseCases(useCases: string[]): string[] {
  return faker.helpers.arrayElements(
    useCases,
    faker.number.int({ min: 1, max: 3 })
  )
}

export function getRandomLanguages(appLanguages: string[] = []): string[] {
  if (!Array.isArray(appLanguages) || appLanguages.length === 0) {
    return ['en'] // default fallback
  }
  return faker.helpers.arrayElements(
    appLanguages,
    faker.number.int({ min: 1, max: 3 })
  )
}

export interface AppPageDetailsData {
  longDescriptionEn: string
  longDescriptionDe: string
}

export const generateAppPageDetailsData = (): AppPageDetailsData => {
  return {
    longDescriptionEn: faker.commerce.productDescription().slice(0, 100),
    longDescriptionDe: fakerDE.helpers.arrayElement([
      'Diese App bietet umfassende Einblicke in Ihre Geschäftsprozesse.',
      'Mit dieser App analysieren und optimieren Sie Ihre Abläufe effizient.',
      'Profitieren Sie von datengestützten Entscheidungen durch moderne Technologien.',
      'Verbessern Sie die Zusammenarbeit mit Partnern und Kunden nachhaltig.',
      'Eine App, die Innovation und Benutzerfreundlichkeit vereint.',
    ]),
  }
}
