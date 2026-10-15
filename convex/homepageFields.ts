import { v } from 'convex/values';
export const contentValidator = v.object({
  welcomeTitle: v.string(), welcomeDescription: v.string(), supportTitle: v.string(), supportDescription: v.string(),
  bannerEyebrow: v.string(), bannerTitle: v.string(), thanksTitle: v.string(),
  heroEyebrow: v.string(), heroTitle: v.string(), heroDescription: v.string(),
  ministryTitle: v.string(), ministryDescription: v.string(), nextTitle: v.string(), nextDescription: v.string(),
  spotlightLabel: v.string(), spotlightMonth: v.string(), spotlightName: v.string(), spotlightDescription: v.string(), spotlightPhotoAlt: v.string(),
});
