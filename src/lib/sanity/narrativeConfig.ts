/**
 * Narrative Config Resolver
 *
 * Maps a `narrativeStyle` value to a rendering configuration object.
 * Controls storytelling rhythm and visual presentation — NOT visual identity.
 *
 * All variants share the same typography system, color palette, motion language,
 * and cinematic editorial atmosphere. Only pacing and density change.
 */

export type NarrativeStyle =
  | 'minimal'
  | 'immersive'
  | 'visual-heavy'
  | 'process-heavy'
  | 'editorial'

export type ImageSize = 'contained' | 'full-bleed' | 'editorial'
export type PullquoteFrequency = 'none' | 'occasional' | 'frequent'
export type HeroPacing = 'calm' | 'cinematic' | 'atmospheric'
export type TextDensity = 'restrained' | 'balanced' | 'rich'

export type NarrativeConfig = {
  /** Tailwind gap class applied between major body sections */
  sectionSpacing: string
  /** How images are sized within the case study body */
  imageSize: ImageSize
  /** Whether to render the galleryImages block */
  galleryEnabled: boolean
  /** How frequently pull quotes (blockquotes) are visually emphasised */
  pullquoteFrequency: PullquoteFrequency
  /** Hero section entrance rhythm */
  heroPacing: HeroPacing
  /** Prose density — affects max-width and paragraph count guidance */
  textDensity: TextDensity
  /** Tailwind max-width class for prose body text */
  proseMaxWidth: string
}

const CONFIGS: Record<NarrativeStyle, NarrativeConfig> = {
  /**
   * Minimal — clean, restrained, maximum whitespace.
   * Fewer sections, no gallery, no pullquotes. Calmer pacing.
   */
  minimal: {
    sectionSpacing: 'gap-16 md:gap-24',
    imageSize: 'contained',
    galleryEnabled: false,
    pullquoteFrequency: 'none',
    heroPacing: 'calm',
    textDensity: 'restrained',
    proseMaxWidth: 'max-w-xl',
  },

  /**
   * Immersive — cinematic, atmospheric. Full-bleed images,
   * strong visual storytelling, generous spacing.
   */
  immersive: {
    sectionSpacing: 'gap-24 md:gap-40',
    imageSize: 'full-bleed',
    galleryEnabled: true,
    pullquoteFrequency: 'occasional',
    heroPacing: 'cinematic',
    textDensity: 'balanced',
    proseMaxWidth: 'max-w-2xl',
  },

  /**
   * Visual Heavy — image-led. Large cinematic imagery dominates,
   * text is short and supportive. No pullquotes.
   */
  'visual-heavy': {
    sectionSpacing: 'gap-20 md:gap-32',
    imageSize: 'full-bleed',
    galleryEnabled: true,
    pullquoteFrequency: 'none',
    heroPacing: 'atmospheric',
    textDensity: 'restrained',
    proseMaxWidth: 'max-w-xl',
  },

  /**
   * Process Heavy — decision-focused. Structured breakdowns,
   * process galleries, frequent pullquotes for key rationale.
   */
  'process-heavy': {
    sectionSpacing: 'gap-16 md:gap-24',
    imageSize: 'editorial',
    galleryEnabled: true,
    pullquoteFrequency: 'frequent',
    heroPacing: 'calm',
    textDensity: 'rich',
    proseMaxWidth: 'max-w-2xl',
  },

  /**
   * Editorial — magazine rhythm. Balanced storytelling with
   * pullquotes, offset imagery, cinematic hero.
   */
  editorial: {
    sectionSpacing: 'gap-20 md:gap-36',
    imageSize: 'editorial',
    galleryEnabled: true,
    pullquoteFrequency: 'frequent',
    heroPacing: 'cinematic',
    textDensity: 'balanced',
    proseMaxWidth: 'max-w-2xl',
  },
}

const DEFAULT_CONFIG: NarrativeConfig = CONFIGS.editorial

/**
 * Resolves a narrativeStyle value to its rendering configuration.
 * Falls back to `editorial` if the value is undefined or unrecognised.
 */
export function getNarrativeConfig(style?: string | null): NarrativeConfig {
  if (!style) return DEFAULT_CONFIG
  return CONFIGS[style as NarrativeStyle] ?? DEFAULT_CONFIG
}
