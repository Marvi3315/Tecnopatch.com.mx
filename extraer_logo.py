import base64
import re
import os

def extract_logo():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex for the base64 in the footer
    match = re.search(r'class="logo-img-ft"[^>]*src="data:image/png;base64,([^"]+)"', content)
    if not match:
        # try opposite order
        match = re.search(r'src="data:image/png;base64,([^"]+)"[^>]*class="logo-img-ft"', content)
    
    if match:
        base64_data = match.group(1)
        img_data = base64.b64decode(base64_data)
        
        if not os.path.exists('img'):
            os.makedirs('img')
            
        with open('img/logo_source.png', 'wb') as f:
            f.write(img_data)
        print("Logo extraído exitosamente en img/logo_source.png")
    else:
        print("No se encontró el logo base64 en index.html")

if __name__ == "__main__":
    extract_logo()
