# 🖼️ Unsplash Integration Guide for GMG Template

## Overview

This guide explains how to integrate **high-quality Unsplash images** into your GMG template codebase as a **fallback and enhancement** solution when clients don't have enough images or need professional stock photos.

## 🎯 Why This Integration is Perfect for Theme Templates

### **For Clients:**
- **Instant Professional Images**: Access to millions of high-quality photos
- **No Copyright Worries**: Unsplash license handles commercial use
- **Cost-Effective**: Free alternative to premium stock photo services
- **Perfect for Mockups**: Ideal for demonstrating the template before final images

### **For AI Assistants:**
- **Context-Aware Selection**: AI can intelligently choose images based on page purpose
- **Automated Workflow**: Seamless integration with existing image optimization
- **Batch Processing**: Handle multiple image requests efficiently
- **Attribution Management**: Automatic compliance with Unsplash terms

## 🚀 Setup Instructions

### Step 1: Install Unsplash MCP Server

```bash
# Clone the MCP server
git clone https://github.com/drumnation/unsplash-smart-mcp-server.git
cd unsplash-smart-mcp-server
npm install

# Get your Unsplash API key from https://unsplash.com/developers
```

### Step 2: Configure Cursor MCP

Edit `~/.cursor/mcp.json` (create if it doesn't exist):

```json
{
  "servers": {
    "unsplash": {
      "command": "npx",
      "args": ["tsx", "src/server.ts"],
      "cwd": "/absolute/path/to/unsplash-smart-mcp-server",
      "env": {
        "UNSPLASH_ACCESS_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Step 3: Restart Cursor

Restart Cursor to load the MCP server configuration.

## 🔄 Image Workflow Integration

### **Current Workflow** (Client Images)
```
1. Client images → assets/images/raw/[category]/
2. npm run image-optimize
3. Images copied to public/images/[category]/
4. Update data files with image paths
5. Commit to repository
```

### **Enhanced Workflow** (With Unsplash)
```
1. AI fetches Unsplash images → assets/images/raw/[category]/
2. npm run image-optimize (same as before)
3. Images processed and optimized automatically
4. AI updates data files with new paths
5. Attribution tracked automatically
6. Commit to repository
```

## 🤖 AI Assistant Usage

### Natural Language Requests

Instead of manually searching for images, simply ask:

```
"Find professional hero images for a tech consultancy homepage"
"Get team photos for the about page - diverse professional headshots"
"Add service illustrations for business strategy consulting"
"Find testimonial photos - professional client headshots"
```

### AI-Powered Image Selection

The MCP server uses AI to:
- **Interpret vague requests** intelligently
- **Select contextually appropriate** images
- **Ensure consistent quality** and style
- **Match brand aesthetics** automatically

## 📁 Image Categories & Organization

### Supported Categories

| Category | Purpose | Recommended Size | Orientation |
|----------|---------|-----------------|-------------|
| `hero` | Homepage/landing page banners | 1920x1080 | Landscape |
| `team` | Team member photos | 400x400 | Square |
| `services` | Service illustrations | 800x600 | Landscape |
| `testimonials` | Client photos | 200x200 | Square |
| `blog` | Blog post featured images | 1200x630 | Landscape |
| `about` | Company/about page imagery | 800x600 | Landscape |
| `general` | Backgrounds and textures | 1920x1080 | Landscape |

### Automatic Organization

Images are automatically placed in:
```
assets/images/raw/[category]/[descriptive-filename].jpg
```

Then processed to:
```
public/images/[category]/[filename].webp
public/images/[category]/[filename].jpg
```

## 🛠️ Command Line Usage

### Single Category Request
```bash
npm run fetch-images -- --category hero --query "modern office collaboration" --count 2 --purpose "homepage hero section"
```

### Batch Processing
```bash
# Create a configuration file
cp scripts/unsplash-requests.json my-project-images.json
# Edit the file with your requirements
npm run fetch-images -- --config my-project-images.json
```

### Example Configuration (unsplash-requests.json)
```json
[
  {
    "category": "hero",
    "query": "professional business team collaboration",
    "purpose": "homepage hero section",
    "count": 2,
    "orientation": "landscape"
  },
  {
    "category": "team",
    "query": "diverse professional headshots",
    "purpose": "team member photos",
    "count": 6,
    "orientation": "square"
  }
]
```

## 📝 Attribution Management

### Automatic Attribution Tracking

Every downloaded image automatically includes:
- **Photographer information**
- **Unsplash photo URL**
- **Attribution text**
- **License details**

### Attribution API

```typescript
// Get attribution data
const response = await fetch('/api/unsplash', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'get_attributions',
    params: { format: 'json' }
  })
});

// Generate attribution page
const htmlResponse = await fetch('/api/unsplash', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'get_attributions',
    params: { format: 'html' }
  })
});
```

### Attribution Formats

1. **JSON**: Raw data for custom implementations
2. **HTML**: Ready-to-use HTML for footer/credits page
3. **React**: Drop-in React component

## 🎨 Integration with Data Files

### Automatic Path Updates

When images are fetched, the AI assistant can automatically update:

```typescript
// lib/data/homepage.ts
export const heroSection = {
  title: "Welcome to Our Company",
  image: {
    src: "/images/hero/professional-team-collaboration-1.webp",
    alt: "Professional team collaboration in modern office",
    width: 1920,
    height: 1080
  }
};

// lib/data/team.ts
export const teamMembers = [
  {
    name: "Team Member",
    role: "Position",
    photo: "/images/team/professional-headshot-1.webp",
    // ... other properties
  }
];
```

## 🚀 Advanced Features

### Context-Aware Selection

The MCP server understands:
- **Industry context** (tech, finance, healthcare, etc.)
- **Brand personality** (corporate, startup, creative, etc.)
- **Target audience** (B2B, B2C, professional, casual)
- **Visual style** (minimalist, energetic, traditional)

### Quality Filters

Automatic filtering for:
- **High resolution** images (minimum dimensions)
- **Professional quality** photography
- **Consistent style** across categories
- **Brand-appropriate** imagery

### Smart Replacements

When updating template defaults:
- **Preserves image dimensions** and aspect ratios
- **Maintains consistent naming** conventions
- **Updates attribution** automatically
- **Keeps backup** of original placeholders

## 🔧 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| MCP server not responding | Check Cursor configuration and restart |
| API key invalid | Verify Unsplash API key in environment |
| Images not downloading | Check network connectivity and permissions |
| Attribution missing | Ensure MCP server is tracking downloads |

### Debug Commands

```bash
# Test MCP connection
curl -X GET http://localhost:3000/api/unsplash

# Check API documentation
curl -X GET http://localhost:3000/api/unsplash?endpoint=docs

# Verify image optimization
npm run image-optimize -- --verbose
```

## 📋 Best Practices

### For Template Development

1. **Use descriptive queries** that match the brand/industry
2. **Maintain consistent style** across all image categories
3. **Test with different orientations** for responsive design
4. **Keep attribution files** updated and accessible
5. **Document image sources** in project README

### For Client Handoff

1. **Include attribution requirements** in project documentation
2. **Provide image replacement guides** for future updates
3. **Export attribution data** before final delivery
4. **Train clients** on the image optimization workflow

## 🚧 Future Enhancements

### Planned Features

- **Brand style learning**: AI learns client preferences over time
- **Automatic A/B testing**: Test different images for conversion
- **Custom collections**: Save curated image sets per industry
- **Batch replacement**: Update all placeholder images at once
- **Performance analytics**: Track image loading and engagement

### Integration Roadmap

1. **Phase 1**: Basic MCP integration (current)
2. **Phase 2**: Advanced AI selection algorithms
3. **Phase 3**: Brand consistency learning
4. **Phase 4**: Performance optimization
5. **Phase 5**: Multi-platform distribution

## 📚 Resources

### Links

- [Unsplash Smart MCP Server](https://github.com/drumnation/unsplash-smart-mcp-server)
- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Unsplash License](https://unsplash.com/license)
- [MCP Protocol](https://modelcontextprotocol.io/)

### Example Projects

- Template with Unsplash integration
- Attribution component examples
- Image optimization comparisons
- Performance benchmark results

---

**This integration transforms your theme template into a powerful, AI-enhanced system that can instantly populate with professional imagery while maintaining full attribution compliance and optimal performance.** 