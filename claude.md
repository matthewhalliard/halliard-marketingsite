# Claude Development Guidelines

## Framer Integration Rules

### Important: This site uses Framer exports
- The homepage and several other pages are exported from Framer design tool
- Framer exports consist of both HTML files and JavaScript bundles

### Structure
1. **HTML Files**: Located in `public/` (e.g., `home-framer.html`, `index.html`)
2. **JavaScript Bundles**: Located in `public/_framer/sites/`
3. **Loading**: Pages use the `FramerPage` component to load and render Framer HTML

### Critical Rules for Framer Pages

#### DO NOT:
- ❌ Directly edit HTML files in `public/` for content changes - they will cause hydration mismatches
- ❌ Modify text content in HTML without also updating corresponding Framer JS bundles
- ❌ Disable Framer hydration unless explicitly requested - it will break animations and interactions

#### DO:
- ✅ Make content changes in the Framer design tool and re-export
- ✅ If Framer access is unavailable, update BOTH HTML and corresponding JS bundles
- ✅ Check for React hydration errors (Error #418) which indicate HTML/JS mismatches
- ✅ Preserve the current FramerPage component structure to maintain functionality

### Common Issues

#### Hydration Mismatch Error (React Error #418)
**Cause**: HTML content doesn't match JavaScript bundle content
**Solution**: Ensure HTML files and Framer JS bundles have identical content
**Prevention**: Always update content through Framer re-export when possible

#### Content Reverts After Page Load
**Cause**: Framer JavaScript hydration overwrites HTML with JS bundle content
**Diagnosis**: Content appears briefly then changes = hydration override
**Fix**: Update the Framer JS bundle files to match HTML changes

### File Locations
- Homepage HTML: `public/home-framer.html` and `public/index.html`
- Framer JS: `public/_framer/sites/[site-id]/*.mjs`
- Main JS bundle with content: Usually the largest .mjs file in the Framer directory

### Development Workflow
1. For content changes: Prefer re-exporting from Framer
2. For emergency text updates: Update both HTML and JS bundles
3. For new features: Create native Next.js components rather than modifying Framer exports
4. Always test for hydration errors after any Framer-related changes