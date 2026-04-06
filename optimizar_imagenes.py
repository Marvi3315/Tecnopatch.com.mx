import os
from PIL import Image

def convert_to_webp():
    img_dir = 'img'
    if not os.path.exists(img_dir):
        print("No se encontró el directorio /img")
        return

    for filename in os.listdir(img_dir):
        if filename.endswith((".png", ".jpg", ".jpeg")):
            path = os.path.join(img_dir, filename)
            img = Image.open(path)
            webp_path = os.path.join(img_dir, os.path.splitext(filename)[0] + ".webp")
            img.save(webp_path, 'webp', quality=80)
            print(f"Convertido: {filename} -> {os.path.basename(webp_path)}")

if __name__ == "__main__":
    try:
        convert_to_webp()
        print("\n¡Optimización completada! Ahora puedes borrar los archivos .png o .jpg originales.")
    except ImportError:
        print("Error: Necesitas instalar Pillow. Ejecuta: pip install Pillow")
    except Exception as e:
        print(f"Error: {e}")
