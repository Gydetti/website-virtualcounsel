// Placeholder for theme-related Zod schemas (colors, typography, spacing, etc.)
import { z } from "zod";
import { imageSchema } from "./common.schema";

export const placeholderThemeSchema = z.object({});

export const typographySchema = z.object({
  headingFont: z.string().min(1, "Heading font cannot be empty"),
  bodyFont: z.string().min(1, "Body font cannot be empty"),
  baseSize: z.string().default("16px"),
});

export const spacingScaleSchema = z.object({
  xs: z.string().min(1, "Spacing xs cannot be empty"),
  sm: z.string().min(1, "Spacing sm cannot be empty"),
  md: z.string().min(1, "Spacing md cannot be empty"),
  lg: z.string().min(1, "Spacing lg cannot be empty"),
  xl: z.string().min(1, "Spacing xl cannot be empty"),
});

export const borderSchema = z.object({
  radiusBase: z.string().min(1, "Border radius cannot be empty"),
  widthBase: z.string().min(1, "Border width cannot be empty"),
  colorBase: z.string().min(1, "Border color cannot be empty"),
});

export const shadowSchema = z.object({
  sm: z.string().min(1, "Shadow sm cannot be empty"),
  md: z.string().min(1, "Shadow md cannot be empty"),
  lg: z.string().min(1, "Shadow lg cannot be empty"),
});

export const layoutSchema = z.object({
  containerMaxWidth: z.string().min(1, "Container max width cannot be empty"),
  containerPadding: z.string().min(1, "Container padding cannot be empty"),
});

export const themeSchema = z.object({
  colors: z.object({
    primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
      message: "Invalid primary color hex",
    }),
    secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
      message: "Invalid secondary color hex",
    }),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
      message: "Invalid accent color hex",
    }),
    background: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid background color hex" })
      .optional(),
    header: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid header color hex" })
      .optional(),
    body: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid body color hex" })
      .optional(),
    lightGrey: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid light grey color hex" })
      .optional(),
  }),
  logo: imageSchema.extend({ subtitle: z.string().optional() }),
  favicon: z.string().min(1, "Favicon path cannot be empty"),
  typography: typographySchema,
  spacing: spacingScaleSchema,
  borders: borderSchema,
  shadows: shadowSchema,
  layout: layoutSchema,
});
