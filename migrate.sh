#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}   BUY-SALE PROJECT - AUTO MIGRATION SCRIPT    ${NC}"
echo -e "${GREEN}   Material-UI v4 → MUI v5                      ${NC}"
echo -e "${GREEN}================================================${NC}\n"

# Step 1: Backup
echo -e "${YELLOW}[1/6] Creating backup...${NC}"
git branch backup-before-migration-$(date +%Y%m%d-%H%M%S) 2>/dev/null || echo "Git not initialized, skipping backup"

# Step 2: Clean install
echo -e "\n${YELLOW}[2/6] Cleaning old dependencies...${NC}"
rm -rf node_modules package-lock.json yarn.lock

# Step 3: Update package.json imports in all files
echo -e "\n${YELLOW}[3/6] Updating import statements...${NC}"

# Find all .tsx and .ts files and update imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | while IFS= read -r -d '' file; do
    # Backup original file
    cp "$file" "$file.bak"
    
    # Replace @material-ui imports with @mui
    sed -i 's/@material-ui\/core/@mui\/material/g' "$file"
    sed -i 's/@material-ui\/icons/@mui\/icons-material/g' "$file"
    sed -i 's/@material-ui\/lab/@mui\/lab/g' "$file"
    sed -i 's/@material-ui\/styles/@mui\/styles/g' "$file"
    
    echo "  ✓ Updated: $file"
done

echo -e "${GREEN}  Import statements updated!${NC}"

# Step 4: Create .env file
echo -e "\n${YELLOW}[4/6] Creating .env file...${NC}"
cat > .env << 'EOL'
# Skip preflight check for faster builds
SKIP_PREFLIGHT_CHECK=true

# Disable source maps in production
GENERATE_SOURCEMAP=false

# OpenSSL legacy provider (for Node 17+)
NODE_OPTIONS=--openssl-legacy-provider

# Development port
PORT=3000
EOL
echo -e "${GREEN}  .env file created!${NC}"

# Step 5: Install dependencies
echo -e "\n${YELLOW}[5/6] Installing dependencies with legacy peer deps...${NC}"
echo -e "${YELLOW}     This might take a few minutes...${NC}\n"
npm install --legacy-peer-deps

# Step 6: Final instructions
echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}   MIGRATION COMPLETED! ✓                       ${NC}"
echo -e "${GREEN}================================================${NC}\n"

echo -e "${YELLOW}Next Steps:${NC}"
echo -e "  1. Run: ${GREEN}npm start${NC} to test the app"
echo -e "  2. If you see errors, check the following:\n"

echo -e "${YELLOW}Common Issues & Fixes:${NC}"
echo -e "  ${RED}Issue 1:${NC} 'makeStyles is not defined'"
echo -e "  ${GREEN}Fix:${NC} Replace makeStyles with sx prop or styled components\n"

echo -e "  ${RED}Issue 2:${NC} OpenSSL error"
echo -e "  ${GREEN}Fix:${NC} export NODE_OPTIONS=--openssl-legacy-provider\n"

echo -e "  ${RED}Issue 3:${NC} Component prop errors"
echo -e "  ${GREEN}Fix:${NC} Check MUI v5 migration guide for prop changes\n"

echo -e "${YELLOW}Backup files:${NC}"
echo -e "  All original .ts/.tsx files backed up as .bak"
echo -e "  Git branch: backup-before-migration-YYYYMMDD-HHMMSS\n"

echo -e "${GREEN}Happy coding! 🚀${NC}\n"chmod +x migrate.sh
./migrate.sh
npm start