import { Express } from 'express';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const swaggerUi = require('swagger-ui-express');

// Load the OpenAPI spec from YAML file and dynamically set servers
const loadApiSpec = () => {
  // Determine the environment and set appropriate server URLs
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

  let apiSpec;
  try {
    const specFilePath = path.join(__dirname, '../../../api-specification.yaml');
    const specFile = fs.readFileSync(specFilePath, 'utf8');
    apiSpec = yaml.parse(specFile);
  } catch (error) {
    console.error('Error loading API specification:', error);
    // Fallback to basic configuration
    apiSpec = {
      openapi: '3.0.3',
      info: {
        title: 'Staymatic REST API',
        version: '1.0.0',
        description: 'AI-Enhanced Airbnb Clone API',
      },
    };
  }

  // Override servers based on environment
  if (isDevelopment) {
    apiSpec.servers = [
      {
        url: backendUrl,
        description: 'Development server',
      },
      {
        url: 'http://localhost:3001',
        description: 'Local development server',
      },
    ];
  } else {
    apiSpec.servers = [
      {
        url: backendUrl,
        description: 'Production server',
      },
    ];
  }

  return apiSpec;
};

export const setupSwagger = (app: Express): void => {
  const apiSpec = loadApiSpec();
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

  // Swagger UI options
  const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
    },
  };

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec, swaggerOptions));

  // Serve raw API spec as JSON
  app.get('/api-spec.json', (req, res) => {
    res.json(apiSpec);
  });

  // Serve raw API spec as YAML
  app.get('/api-spec.yaml', (req, res) => {
    res.setHeader('Content-Type', 'text/yaml');
    res.send(yaml.stringify(apiSpec));
  });

  console.warn(`📚 Swagger UI available at: ${backendUrl}/api-docs`);
  console.warn(`📋 API Spec JSON available at: ${backendUrl}/api-spec.json`);
  console.warn(`📋 API Spec YAML available at: ${backendUrl}/api-spec.yaml`);
};
