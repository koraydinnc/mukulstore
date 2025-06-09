#!/bin/bash

# Production Debug Script for VakıfBank Payment Issues
# This script helps diagnose and fix API endpoint issues

echo "🔍 VakıfBank Payment Debug Script"
echo "================================="

# 1. Check for any remaining references to incorrect endpoint
echo "1. Searching for incorrect API endpoint references..."
grep -r "/api/orders-5534/create" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next || echo "✅ No incorrect endpoint references found"

echo ""

# 2. Check for any hardcoded URLs that might point to old endpoint
echo "2. Searching for hardcoded production URLs..."
grep -r "mukulstore.com/api/orders-5534" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next || echo "✅ No hardcoded URLs found"

echo ""

# 3. Check if there are any external scripts or forms
echo "3. Checking for external scripts or forms..."
grep -r "action.*api.*orders" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next || echo "✅ No form actions found"

echo ""

# 4. Verify the current VakıfBank callback is using Prisma
echo "4. Verifying VakıfBank callback implementation..."
if grep -q "prisma.order.create" pages/api/user/payment/vakifbank-callback.jsx; then
    echo "✅ VakıfBank callback is using direct Prisma operations"
else
    echo "❌ VakıfBank callback might still be using HTTP calls"
fi

echo ""

# 5. Check for any cached build files
echo "5. Checking for cached build files..."
if [ -d ".next" ]; then
    echo "⚠️  .next directory exists - removing to force fresh build"
    rm -rf .next
    echo "✅ Build cache cleared"
else
    echo "✅ No build cache found"
fi

echo ""

# 6. Build the project
echo "6. Building project to ensure latest code..."
npm run build

echo ""
echo "🎯 RECOMMENDED ACTIONS:"
echo "======================"
echo "1. Deploy the latest code to production"
echo "2. Clear browser cache and CDN cache if using one"
echo "3. Test payment flow with debug script in browser console"
echo "4. Check production logs for any remaining API call errors"
echo ""
echo "📋 Browser Debug Script:"
echo "Copy and paste this in browser console on production site:"
echo ""
echo "(function() {"
echo "    const originalFetch = window.fetch;"
echo "    window.fetch = function(...args) {"
echo "        const url = args[0];"
echo "        if (typeof url === 'string' && url.includes('/api/orders-5534/create') && !url.includes('/admin/')) {"
echo "            console.error('❌ INCORRECT ENDPOINT:', url);"
echo "            alert('Incorrect endpoint detected: ' + url);"
echo "        }"
echo "        return originalFetch.apply(this, args);"
echo "    };"
echo "    console.log('🔍 API monitoring enabled');"
echo "})();"
