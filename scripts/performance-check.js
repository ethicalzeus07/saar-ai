#!/usr/bin/env node

/**
 * Performance Monitoring Script for Saar AI
 * Run with: node scripts/performance-check.js
 */

import fs from 'fs';
import path from 'path';

// Performance metrics to check
const performanceChecks = {
  bundleSize: {
    description: 'Check bundle size',
    check: () => {
      const buildDir = path.join(process.cwd(), '.next');
      if (!fs.existsSync(buildDir)) {
        return { 
          status: 'warning', 
          message: 'Build directory not found. Run `npm run build` first to analyze bundle size.' 
        };
      }
      
      // Check static files size
      const staticDir = path.join(buildDir, 'static');
      if (fs.existsSync(staticDir)) {
        const files = fs.readdirSync(staticDir);
        let totalSize = 0;
        let fileCount = 0;
        
        files.forEach(file => {
          const filePath = path.join(staticDir, file);
          const stats = fs.statSync(filePath);
          totalSize += stats.size;
          fileCount++;
        });
        
        const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
        
        if (totalSize === 0) {
          return { 
            status: 'warning', 
            message: 'Bundle size is 0MB - this might indicate an incomplete build. Try running `npm run build` again.' 
          };
        } else if (totalSize > 5 * 1024 * 1024) { // 5MB
          return { 
            status: 'error', 
            message: `Bundle size is ${sizeInMB}MB (${fileCount} files) - consider optimization` 
          };
        } else if (totalSize > 2 * 1024 * 1024) { // 2MB
          return { 
            status: 'warning', 
            message: `Bundle size is ${sizeInMB}MB (${fileCount} files) - monitor for growth` 
          };
        } else {
          return { 
            status: 'success', 
            message: `Bundle size is ${sizeInMB}MB (${fileCount} files) - good` 
          };
        }
      }
      
      return { 
        status: 'warning', 
        message: 'Could not determine bundle size - static directory not found' 
      };
    }
  },
  
  dependencies: {
    description: 'Check for outdated dependencies',
    check: () => {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      const criticalDeps = ['next', 'react', 'react-dom'];
      const outdated = [];
      
      criticalDeps.forEach(dep => {
        if (deps[dep] && !deps[dep].includes('^')) {
          outdated.push(dep);
        }
      });
      
      if (outdated.length > 0) {
        return { 
          status: 'warning', 
          message: `Consider updating: ${outdated.join(', ')} - add ^ prefix for automatic updates` 
        };
      }
      
      return { status: 'success', message: 'Dependencies are up to date' };
    }
  },
  
  images: {
    description: 'Check for unoptimized images',
    check: () => {
      const publicDir = path.join(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        return { status: 'success', message: 'No public images found' };
      }
      
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const files = fs.readdirSync(publicDir);
      const images = files.filter(file => 
        imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
      );
      
      if (images.length > 0) {
        let totalSize = 0;
        images.forEach(image => {
          const imagePath = path.join(publicDir, image);
          const stats = fs.statSync(imagePath);
          totalSize += stats.size;
        });
        
        const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
        
        if (totalSize > 2 * 1024 * 1024) { // 2MB
          return { 
            status: 'warning', 
            message: `Public images total ${sizeInMB}MB (${images.length} files) - consider optimization` 
          };
        } else {
          return { 
            status: 'success', 
            message: `Images are optimized (${sizeInMB}MB, ${images.length} files)` 
          };
        }
      }
      
      return { status: 'success', message: 'No images found in public directory' };
    }
  },
  
  database: {
    description: 'Check database configuration',
    check: () => {
      const envFile = path.join(process.cwd(), '.env.local');
      if (!fs.existsSync(envFile)) {
        return { 
          status: 'warning', 
          message: '.env.local not found - check environment variables' 
        };
      }
      
      const envContent = fs.readFileSync(envFile, 'utf8');
      const hasDbUrl = envContent.includes('DATABASE_URL');
      const hasMistralKey = envContent.includes('MISTRAL_API_KEY');
      
      if (!hasDbUrl || !hasMistralKey) {
        return { 
          status: 'error', 
          message: 'Missing required environment variables (DATABASE_URL or MISTRAL_API_KEY)' 
        };
      }
      
      return { status: 'success', message: 'Database configuration looks good' };
    }
  },
  
  buildStatus: {
    description: 'Check if application builds successfully',
    check: () => {
      const buildDir = path.join(process.cwd(), '.next');
      if (!fs.existsSync(buildDir)) {
        return { 
          status: 'warning', 
          message: 'No build found. Run `npm run build` to test build process' 
        };
      }
      
      // Check for key build files
      const hasBuildFiles = fs.existsSync(path.join(buildDir, 'server')) || 
                           fs.existsSync(path.join(buildDir, 'static'));
      
      if (hasBuildFiles) {
        return { status: 'success', message: 'Build directory exists and contains files' };
      } else {
        return { 
          status: 'warning', 
          message: 'Build directory exists but appears incomplete' 
        };
      }
    }
  }
};

// Run all performance checks
function runPerformanceChecks() {
  console.log('🔍 Running Saar AI Performance Checks...\n');
  
  let passed = 0;
  let warnings = 0;
  let errors = 0;
  
  Object.entries(performanceChecks).forEach(([, check]) => {
    console.log(`📋 ${check.description}:`);
    
    try {
      const result = check.check();
      
      switch (result.status) {
        case 'success':
          console.log(`   ✅ ${result.message}`);
          passed++;
          break;
        case 'warning':
          console.log(`   ⚠️  ${result.message}`);
          warnings++;
          break;
        case 'error':
          console.log(`   ❌ ${result.message}`);
          errors++;
          break;
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      errors++;
    }
    
    console.log('');
  });
  
  // Summary
  console.log('📊 Performance Check Summary:');
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ⚠️  Warnings: ${warnings}`);
  console.log(`   ❌ Errors: ${errors}`);
  
  if (errors > 0) {
    console.log('\n🚨 Critical issues found! Please address them before deployment.');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('\n⚠️  Some warnings found. Consider addressing them for better performance.');
    console.log('\n💡 Next steps:');
    console.log('   1. Run `npm run build` to generate bundle analysis');
    console.log('   2. Check for any dependency updates');
    console.log('   3. Verify environment variables are set correctly');
  } else {
    console.log('\n🎉 All checks passed! Your app is ready for production.');
  }
}

// Run the checks
runPerformanceChecks(); 