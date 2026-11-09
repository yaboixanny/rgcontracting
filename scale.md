# Website photo sizing

Convert new project photos to WebP before adding them to the website. Keep the original files untouched. The helper respects image orientation, limits the longest edge to 1,400 pixels by default, and reduces quality and dimensions as needed to target 150 KB per photo.

```sh
python3 scripts/scale_images.py /path/to/original.jpg dist/images/descriptive-name.webp
```

The script needs Python and Pillow (`python3 -m pip install Pillow`). Use `--max-edge` or `--max-kb` to change the defaults when a particular image needs different dimensions or quality. Choose a new output name: existing files are never overwritten. Check the result visually and use descriptive alternative text. For a hero or square card, set the crop and focal point in CSS so the underlying photo remains available for other layouts.

This is a manual preparation step for new photos, not an automatic upload or build process. Logos and graphics needing transparency may need a different workflow; this helper produces opaque photos.
