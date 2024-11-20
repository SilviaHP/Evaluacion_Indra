import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'starwars-planets',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PLANET_TABLE: { Ref: 'PlanetTable' } , 
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:PutItem", "dynamodb:Scan", "dynamodb:Query"],
            Resource: "*",
          },
        ],
      },
    },
  },
  functions: {
    getData: {
      handler: 'src/handlers/getData.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'data',
            cors: true,
          },
        },

      ],
    },
    postData: {
      handler: 'src/handlers/postData.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'data',
            cors: true,
          },
        },

      ],
    },    
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      PlanetTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'Planet',
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },

          ],
          KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;