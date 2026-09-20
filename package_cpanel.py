import os
import shutil
import zipfile
import sys

base_dir = r"D:\Kerja Praktik\Laporan selama Kerja Praktik\BIG PROJECTS\projek 9(bonekaku)"
deploy_dir = os.path.join(base_dir, "DEPLOY_CPANEL")
os.makedirs(deploy_dir, exist_ok=True)

# 1. Zip Frontend
frontend_dist = os.path.join(base_dir, "frontend", "dist")
frontend_zip = os.path.join(deploy_dir, "1_FRONTEND_PUBLIC_HTML.zip")
print("Packing frontend dist...")
with zipfile.ZipFile(frontend_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(frontend_dist):
        for f in files:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, frontend_dist)
            zf.write(full_path, rel_path)
print(f"Frontend zip created: {os.path.getsize(frontend_zip) / (1024*1024):.2f} MB")

# 2. Copy Database SQL
sql_src = os.path.join(base_dir, "database", "bonekaku_complete.sql")
sql_dest = os.path.join(deploy_dir, "2_DATABASE_BONEKAKU_IMPORT_PHPMYADMIN.sql")
shutil.copy2(sql_src, sql_dest)
print(f"SQL file copied: {os.path.getsize(sql_dest) / 1024:.2f} KB")

# 3. Zip Backend
backend_dir = os.path.join(base_dir, "backend")
backend_zip = os.path.join(deploy_dir, "3_BACKEND_API.zip")
print("Packing backend (including vendor)...")

exclude_dirs = {".git", "node_modules", "tests"}
exclude_files = {".gitattributes"}

with zipfile.ZipFile(backend_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(backend_dir):
        # Modify dirs in-place to avoid excluded dirs
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for f in files:
            if f in exclude_files:
                continue
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, backend_dir)
            zf.write(full_path, rel_path)

print(f"Backend zip created: {os.path.getsize(backend_zip) / (1024*1024):.2f} MB")
print("Packaging complete!")
