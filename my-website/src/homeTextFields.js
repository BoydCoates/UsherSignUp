import { additionalHomeFields } from '../../shared/homeContent'
export const homeTextFields = [
  ...additionalHomeFields,
  ['heroEyebrow', 'Intro label', 200], ['heroTitle', 'Main headline', 200], ['heroDescription', 'Welcome message', 2000],
  ['ministryTitle', 'Ministry heading', 200], ['ministryDescription', 'About the ministry', 2000],
  ['welcomeTitle', 'Welcome role heading', 200], ['welcomeDescription', 'Welcome role description', 2000],
  ['supportTitle', 'Serving role heading', 200], ['supportDescription', 'Serving role description', 2000],
  ['nextTitle', 'Getting involved heading', 200], ['nextDescription', 'Getting involved description', 2000],
  ['spotlightLabel', 'Feature title', 200], ['spotlightMonth', 'Month / year', 200], ['spotlightName', 'Usher’s name', 200],
  ['spotlightDescription', 'Usher’s story and appreciation', 2000], ['spotlightPhotoAlt', 'Photo description for accessibility', 200],
  ['thanksTitle', 'Featured usher thank-you line', 200], ['bannerEyebrow', 'Closing banner label', 200], ['bannerTitle', 'Closing banner heading', 200],
]
export const homeFieldLabels = Object.fromEntries(homeTextFields.map(([key, label]) => [key, label]))
