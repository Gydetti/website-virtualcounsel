import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Unsplash API Route for GMG Template
 * Interfaces with the unsplash-smart-mcp-server for image management
 *
 * This route provides endpoints for:
 * - Fetching images from Unsplash
 * - Managing image attribution
 * - Organizing images by category
 */

interface UnsplashImageRequest {
  category: string;
  query: string;
  count?: number;
  purpose?: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  downloadMode?: 'urls_only' | 'download';
}

interface AttributionRequest {
  format: 'json' | 'html' | 'react';
  projectPath?: string;
  outputPath?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, params } = body;

    switch (method) {
      case 'fetch_images': {
        const {
          category,
          query,
          count = 1,
          purpose,
          orientation = 'landscape',
        }: UnsplashImageRequest = params;

        // This would integrate with the MCP server
        // For demonstration, we return a structured response
        const mockResponse = {
          success: true,
          images: Array.from({ length: count }, (_, i) => ({
            id: `unsplash-${category}-${i + 1}`,
            downloadUrl: `https://images.unsplash.com/photo-${category}-${i + 1}`,
            webUrl: `https://unsplash.com/photos/${category}-${i + 1}`,
            altText: `Professional ${purpose || query} image ${i + 1}`,
            attribution: {
              photographer: 'Photographer Name',
              photographerUrl: 'https://unsplash.com/@photographer',
              unsplashUrl: `https://unsplash.com/photos/${category}-${i + 1}`,
              attributionText: 'Photo by Photographer Name on Unsplash',
            },
            suggestedFilename: `${category}-${i + 1}.jpg`,
            suggestedPath: `assets/images/raw/${category}/${category}-${i + 1}.jpg`,
          })),
          nextSteps: [
            'Download images to suggested paths',
            'Run npm run image-optimize',
            'Update data files with new image paths',
            'Commit changes to repository',
          ],
        };

        return NextResponse.json(mockResponse);
      }

      case 'get_attributions': {
        const { format = 'json', projectPath }: AttributionRequest = params;

        // Mock attribution data
        const attributions = [
          {
            imageId: 'hero-1',
            imagePath: '/images/hero/hero-1.webp',
            photographer: 'John Doe',
            photographerUrl: 'https://unsplash.com/@johndoe',
            photoUrl: 'https://unsplash.com/photos/abc123',
            attributionText: 'Photo by John Doe on Unsplash',
          },
          {
            imageId: 'team-1',
            imagePath: '/images/team/team-1.webp',
            photographer: 'Jane Smith',
            photographerUrl: 'https://unsplash.com/@janesmith',
            photoUrl: 'https://unsplash.com/photos/def456',
            attributionText: 'Photo by Jane Smith on Unsplash',
          },
        ];

        const filteredAttributions = projectPath
          ? attributions.filter(attr => attr.imagePath.includes(projectPath))
          : attributions;

        let responseData: {
          format: string;
          content?: string;
          attributions?: Array<{
            imageId: string;
            imagePath: string;
            photographer: string;
            photographerUrl: string;
            photoUrl: string;
            attributionText: string;
          }>;
        };
        switch (format) {
          case 'html':
            responseData = {
              format: 'html',
              content: `
                <div class="image-attributions">
                  <h3>Image Credits</h3>
                  ${filteredAttributions
                    .map(
                      attr => `
                    <p><a href="${attr.photoUrl}" target="_blank">${attr.attributionText}</a></p>
                  `
                    )
                    .join('')}
                </div>
              `,
            };
            break;

          case 'react':
            responseData = {
              format: 'react',
              content: `
import React from 'react';

const ImageAttributions = () => {
  const attributions = ${JSON.stringify(filteredAttributions, null, 2)};
  
  return (
    <div className="image-attributions">
      <h3>Image Credits</h3>
      {attributions.map((attr, index) => (
        <p key={index}>
          <a href={attr.photoUrl} target="_blank" rel="noopener noreferrer">
            {attr.attributionText}
          </a>
        </p>
      ))}
    </div>
  );
};

export default ImageAttributions;
              `,
            };
            break;

          default:
            responseData = {
              format: 'json',
              attributions: filteredAttributions,
            };
        }

        return NextResponse.json(responseData);
      }

      case 'get_categories': {
        // Return available image categories for the template
        const categories = [
          {
            name: 'hero',
            description: 'Hero section images for homepage and landing pages',
            recommendedSize: '1920x1080',
            recommendedOrientation: 'landscape',
          },
          {
            name: 'team',
            description: 'Team member photos and group photos',
            recommendedSize: '400x400',
            recommendedOrientation: 'square',
          },
          {
            name: 'services',
            description: 'Service illustrations and business imagery',
            recommendedSize: '800x600',
            recommendedOrientation: 'landscape',
          },
          {
            name: 'testimonials',
            description: 'Client photos for testimonials',
            recommendedSize: '200x200',
            recommendedOrientation: 'square',
          },
          {
            name: 'blog',
            description: 'Featured images for blog posts',
            recommendedSize: '1200x630',
            recommendedOrientation: 'landscape',
          },
          {
            name: 'about',
            description: 'About page imagery and company photos',
            recommendedSize: '800x600',
            recommendedOrientation: 'landscape',
          },
          {
            name: 'general',
            description: 'Background images and textures',
            recommendedSize: '1920x1080',
            recommendedOrientation: 'landscape',
          },
        ];

        return NextResponse.json({ categories });
      }

      default:
        return NextResponse.json(
          { success: false, error: `Unknown method: ${method}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Unsplash API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Health check and API documentation
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (endpoint === 'docs') {
    return NextResponse.json({
      title: 'Unsplash API for GMG Template',
      description: 'Interface for fetching and managing Unsplash images in the template system',
      endpoints: {
        'POST /api/unsplash': {
          description: 'Main API endpoint for image operations',
          methods: {
            fetch_images: {
              description: 'Fetch images from Unsplash for a specific category',
              params: {
                category: 'string (required) - Image category (hero, team, services, etc.)',
                query: 'string (required) - Search query for Unsplash',
                count: 'number (optional) - Number of images to fetch (default: 1)',
                purpose: 'string (optional) - Purpose description for better image selection',
                orientation:
                  'string (optional) - landscape, portrait, or square (default: landscape)',
              },
            },
            get_attributions: {
              description: 'Get attribution information for downloaded images',
              params: {
                format: 'string (optional) - json, html, or react (default: json)',
                projectPath: 'string (optional) - Filter attributions by path',
              },
            },
            get_categories: {
              description: 'Get available image categories and their specifications',
              params: {},
            },
          },
        },
      },
      integration: {
        mcpServer: 'unsplash-smart-mcp-server',
        workflow: [
          '1. AI assistant calls POST /api/unsplash with method=fetch_images',
          '2. API interfaces with MCP server to get image URLs',
          '3. Images are downloaded to assets/images/raw/[category]/',
          '4. npm run image-optimize processes the images',
          '5. Data files are updated with new image paths',
          '6. Changes are committed to repository',
        ],
      },
    });
  }

  return NextResponse.json({
    status: 'ok',
    message: 'Unsplash API for GMG Template',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /api/unsplash - Main API endpoint',
      'GET /api/unsplash?endpoint=docs - API documentation',
    ],
  });
}
