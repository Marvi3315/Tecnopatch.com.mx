from PIL import Image, ImageDraw, ImageFont
import os

def create_favicon():
    img_dir = 'img'
    logo_path = os.path.join(img_dir, 'logo_source.png')
    
    if not os.path.exists(logo_path):
        print(f"No se encontró el logo en {logo_path}")
        return

    # Load the logo
    logo = Image.open(logo_path).convert("RGBA")
    
    # Create the square canvas (512x512)
    size = 512
    # Option A: Solid background (like the theme)
    bg_color = (2, 5, 9, 255) # Dark blue from CSS --bg
    final_img = Image.new('RGBA', (size, size), bg_color)
    
    # Resize logo to fit inside with padding
    padding = 60
    max_w = size - (padding * 2)
    max_h = size - (padding * 2)
    
    w, h = logo.size
    ratio = min(max_w/w, max_h/h)
    new_size = (int(w * ratio), int(h * ratio))
    logo_resized = logo.resize(new_size, Image.Resampling.LANCZOS)
    
    # Center the logo on the canvas
    offset = ((size - new_size[0]) // 2, (size - new_size[1]) // 2)
    final_img.paste(logo_resized, offset, logo_resized)
    
    # Save paths
    favicon_png = os.path.join(img_dir, 'favicon.png')
    favicon_ico = os.path.join(img_dir, 'favicon.ico')
    apple_icon = os.path.join(img_dir, 'apple-touch-icon.png')
    
    final_img.save(favicon_png)
    # ICO supports multiple sizes
    final_img.save(favicon_ico, format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])
    final_img.save(apple_icon)
    
    print(f"Iconos basados en el logo generados en: {favicon_png}, {favicon_ico} y {apple_icon}")

if __name__ == "__main__":
    create_favicon()
