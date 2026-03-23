import os
import json
import re
import argparse

# Argument parser for command-line parameters
parser = argparse.ArgumentParser(description="Update <img> tags in files based on style JSON.")
# parser.add_argument("repo_path", help="Path to the root of the repository")
parser.add_argument("style_json", help="Path to the style JSON file")
args = parser.parse_args()

# Load the style definitions from the JSON file
with open(args.style_json, 'r', encoding='utf-8') as f:
    style_data = json.load(f)


# Function to convert style dictionary to inline style string
def style_dict_to_string(style_dict):
    return ', '.join(f"{k}: '{v}'" for k, v in style_dict.items())

# Process each entry in the JSON
for key, entry in style_data.items():
    file_path = entry['filePath'].lstrip('/')
    if not os.path.isfile(file_path):
        print(f"File not found: {file_path}")
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Build new attributes
    id_attribute = entry['componentId']
    new_src = new_src = entry['image']['imagePath'] if 'image' in entry and 'imagePath' in entry['image'] else None
    new_alt = entry['image']['alternateText'] if 'image' in entry and 'alternateText' in entry['image'] else None
    new_style = style_dict_to_string(entry['style']) if 'style' in entry else None

    # Regex to find the first <img ...> tag
    img_tag_pattern = re.compile(rf"<img\s+[^>]*id=['\"]{id_attribute}['\"][^>]*>", re.DOTALL)

    match = img_tag_pattern.search(content)

    if match:
        old_img_tag = match.group(0)

        # Replace or insert attributes
        new_img_tag = old_img_tag

        # Replace or add src
        if new_src != None:
            if 'src=' in new_img_tag:
                new_img_tag = re.sub(r'src\s*=\s*["\'][^"\']*["\']', f'src="{new_src}"', new_img_tag)
            else:
                new_img_tag = new_img_tag.rstrip('>') + f' src="{new_src}">'

        # Replace or add alt
        if new_alt != None:
            if 'alt=' in new_img_tag:
                new_img_tag = re.sub(r'alt\s*=\s*["\'][^"\']*["\']', f'alt="{new_alt}"', new_img_tag)
            else:
                new_img_tag = new_img_tag.rstrip('>') + f' alt="{new_alt}">'

        # Replace or add style
        if new_style != None:
            if 'style=' in new_img_tag:
                new_img_tag = re.sub(r'style\s*=\s*{{[^}}]*}}', f'style={{{{{new_style}}}}}', new_img_tag)
            else:
                new_img_tag = new_img_tag.rstrip('/>') + f' style={{{{{new_style}}}}}/>'

        # Replace the old tag with the new one
        content = content.replace(old_img_tag, new_img_tag, 1)

        # Write the updated content back to the file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"Updated <img> tag {id_attribute} in {file_path}")
    else:
        print(f"No <img> tag {id_attribute} found in {file_path}")





print("✅ Image tags updated based on style.json.")

