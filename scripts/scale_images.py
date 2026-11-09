#!/usr/bin/env python3
"""Convert a supplied photo to an optimized WebP without changing the original."""
import argparse
from pathlib import Path
from PIL import Image, ImageOps

parser = argparse.ArgumentParser()
parser.add_argument('source', type=Path)
parser.add_argument('output', type=Path)
parser.add_argument('--max-edge', type=int, default=1400)
parser.add_argument('--max-kb', type=int, default=150)
args = parser.parse_args()
if args.output.suffix.lower() != '.webp':
    parser.error('output must have a .webp extension')
if args.source.resolve() == args.output.resolve():
    parser.error('source and output must be different')
if args.output.exists():
    parser.error('output already exists; choose a new filename')
if args.max_edge < 1 or args.max_kb < 1:
    parser.error('max-edge and max-kb must be positive')
image = ImageOps.exif_transpose(Image.open(args.source)).convert('RGB')
image.thumbnail((args.max_edge, args.max_edge), Image.Resampling.LANCZOS)
args.output.parent.mkdir(parents=True, exist_ok=True)
for _ in range(10):
    for quality in (80, 72, 64, 56, 48, 40, 32):
        image.save(args.output, 'WEBP', quality=quality, method=6)
        if args.output.stat().st_size <= args.max_kb * 1024:
            print(f'{args.output}: {image.width}x{image.height}, {args.output.stat().st_size} bytes, quality {quality}')
            raise SystemExit(0)
    image.thumbnail((max(1, round(image.width * .85)), max(1, round(image.height * .85))), Image.Resampling.LANCZOS)
args.output.unlink(missing_ok=True)
raise SystemExit('Could not meet size target; try a higher --max-kb value.')
