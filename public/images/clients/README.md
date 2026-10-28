# Client images

Drop the client logos/photos in this folder. The testimonials section on the
home page already points at these filenames:

| Client        | Filename               |
| ------------- | ---------------------- |
| Raam Group    | `raam-group.png`       |
| SmartShakti   | `smartshakti.png`      |
| College Duniya| `college-duniya.png`   |

Notes:

- Square images work best (around 240 × 240 px is plenty).
- Prefer PNG with a transparent background for logos.
- If a file is missing, the card falls back to the client's initials, so the
  page never shows a broken image.
- Using a different filename or extension? Update the `image` field for that
  entry in `components/site/TestimonialsSection.tsx`.
- If you supply a client photo instead of a logo, change that entry's
  `fit: "contain"` to `fit: "cover"`.
