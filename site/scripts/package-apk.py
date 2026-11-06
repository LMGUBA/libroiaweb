from pathlib import Path
import hashlib, json
source = Path(__file__).resolve().parents[2] / 'libroai-1.0.0-release.apk'
target = Path(__file__).resolve().parents[1] / 'dist/assets/apk'
target.mkdir(parents=True, exist_ok=True)
parts = []
with source.open('rb') as f:
    while chunk := f.read(8 * 1024 * 1024):
        name = f'part-{len(parts):02d}.bin'
        (target / name).write_bytes(chunk)
        parts.append({'name': name, 'bytes': len(chunk), 'sha256': hashlib.sha256(chunk).hexdigest()})
manifest = {'filename': source.name, 'bytes': source.stat().st_size, 'sha256': hashlib.file_digest(source.open('rb'), 'sha256').hexdigest(), 'parts': parts}
(target / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Packaged {len(parts)} parts; original bytes unchanged.')
